import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSession } from "@/lib/auth/requireSession";
import { toDeveloperError } from "@/lib/errors";
import { getActiveOrgId } from "@/lib/org/getActiveOrgId";

export type Channel = "WHATSAPP" | "SMS" | "EMAIL";

export type CustomerLite = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  preferred_channel: Channel | null;
};

export type InvoiceListRow = {
  id: string;
  invoice_number: string;
  status: string;
  due_date: string | null;
  total: number | null;
  balance: number | null;
  created_at: string;
  disputeCount: number;
};

export type CreateInvoiceItemInput = {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export type CreateInvoiceInput = {
  customerId: string;
  dueDate: string;
  mode: "DRAFT" | "SENT";
  currency: string;
  subtotal: number;
  vat: number;
  total: number;
  items: CreateInvoiceItemInput[];
};

function nowIso(): string {
  return new Date().toISOString();
}

function todayYmd(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function makeInvoiceNumberPlaceholder(seedId: string): string {
  const d = new Date();
  const timestamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}${String(d.getSeconds()).padStart(2, "0")}`;
  return `INV-${timestamp}-${seedId.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto === "undefined" || !("subtle" in crypto) || !crypto.subtle) return input;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest)).map((n) => n.toString(16).padStart(2, "0")).join("");
}

async function queueSmsAttempt(params: {
  supabase: SupabaseClient;
  orgId: string;
  invoiceId: string;
  customerId: string;
  invoiceNumber: string;
  actorUserId: string;
}): Promise<{ queued: boolean; reason?: string }> {
  const { supabase, orgId, invoiceId, customerId, invoiceNumber, actorUserId } = params;

  const customer = await supabase
    .from("customers")
    .select("phone,opted_out,do_not_contact,consent")
    .eq("org_id", orgId)
    .eq("id", customerId)
    .single();

  if (customer.error) throw customer.error;

  const c = customer.data as { phone: string | null; opted_out?: boolean; do_not_contact?: boolean; consent?: boolean };
  if (!c.phone) return { queued: false, reason: "Selected customer has no phone number." };
  if (c.opted_out || c.do_not_contact || c.consent === false) {
    return { queued: false, reason: "Selected customer cannot be contacted by SMS." };
  }

  const smsTemplate = await supabase
    .from("message_templates")
    .select("id")
    .eq("org_id", orgId)
    .eq("channel", "SMS")
    .eq("name", "Invoice Sent")
    .limit(1)
    .maybeSingle();

  if (smsTemplate.error) throw smsTemplate.error;

  let templateId = (smsTemplate.data as { id?: string } | null)?.id;
  if (!templateId) {
    const whatsappTemplate = await supabase
      .from("message_templates")
      .select("id")
      .eq("org_id", orgId)
      .eq("channel", "WHATSAPP")
      .eq("name", "Invoice Sent")
      .limit(1)
      .maybeSingle();

    if (whatsappTemplate.error) throw whatsappTemplate.error;
    templateId = (whatsappTemplate.data as { id?: string } | null)?.id;
  }

  if (!templateId) return { queued: false, reason: "No 'Invoice Sent' template found." };

  const messageKey = await sha256Hex(`${orgId}:${invoiceId}:INVOICE_SENT`);

  const messageLogInsert = await supabase.from("message_log").insert({
    org_id: orgId,
    customer_id: customerId,
    invoice_id: invoiceId,
    rule_id: null,
    template_id: templateId,
    channel: "SMS",
    status: "QUEUED",
    message_key: messageKey,
    scheduled_for: nowIso(),
  });

  if (messageLogInsert.error && messageLogInsert.error.code !== "23505") {
    throw messageLogInsert.error;
  }

  await supabase.from("events").insert({
    org_id: orgId,
    actor_user_id: actorUserId,
    event_type: "invoice_sms_queued",
    entity_type: "invoice",
    entity_id: invoiceId,
    meta: { invoice_number: invoiceNumber, channel: "SMS" },
  });

  return { queued: true };
}

export async function listInvoicePageData(supabase: SupabaseClient) {
  await requireSession(supabase);
  const orgId = await getActiveOrgId(supabase);

  const [customersResult, invoicesResult] = await Promise.all([
    supabase
      .from("customers")
      .select("id,name,phone,email,preferred_channel")
      .eq("org_id", orgId)
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("invoices")
      .select("id,invoice_number,status,due_date,total,balance,created_at")
      .eq("org_id", orgId)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  if (customersResult.error) throw customersResult.error;
  if (invoicesResult.error) throw invoicesResult.error;

  const customers = ((customersResult.data ?? []) as any[]).map(
    (row): CustomerLite => ({
      id: String(row.id),
      name: String(row.name ?? ""),
      phone: row.phone ?? null,
      email: row.email ?? null,
      preferred_channel: (row.preferred_channel ?? null) as Channel | null,
    })
  );

  let recentInvoices = ((invoicesResult.data ?? []) as any[]).map(
    (row): InvoiceListRow => ({
      id: String(row.id),
      invoice_number: String(row.invoice_number ?? ""),
      status: String(row.status ?? "DRAFT"),
      due_date: (row.due_date ?? null) as string | null,
      total: row.total == null ? null : Number(row.total),
      balance: row.balance == null ? null : Number(row.balance),
      created_at: String(row.created_at ?? nowIso()),
      disputeCount: 0,
    })
  );

  if (recentInvoices.length > 0) {
    const disputes = await supabase
      .from("invoice_disputes")
      .select("invoice_id")
      .in("invoice_id", recentInvoices.map((invoice) => invoice.id));

    if (!disputes.error && disputes.data) {
      const counts = new Map<string, number>();
      for (const row of disputes.data as Array<{ invoice_id: string }>) {
        const key = String(row.invoice_id);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }

      recentInvoices = recentInvoices.map((invoice) => ({
        ...invoice,
        disputeCount: counts.get(invoice.id) ?? 0,
      }));
    }
  }

  return { customers, recentInvoices, orgId };
}

export async function createInvoiceWithItems(supabase: SupabaseClient, payload: CreateInvoiceInput) {
  const session = await requireSession(supabase);
  const orgId = await getActiveOrgId(supabase);

  const invoiceId = crypto.randomUUID();
  const placeholderInvoiceNumber = makeInvoiceNumberPlaceholder(invoiceId);

  const invoiceInsert = await supabase.from("invoices").insert({
    id: invoiceId,
    org_id: orgId,
    customer_id: payload.customerId,
    invoice_number: placeholderInvoiceNumber,
    status: payload.mode,
    issue_date: todayYmd(),
    due_date: payload.dueDate,
    sent_at: payload.mode === "SENT" ? nowIso() : null,
    currency: payload.currency,
    subtotal: payload.subtotal,
    vat: payload.vat,
    total: payload.total,
    balance: payload.total,
    created_by: session.user.id,
  });

  if (invoiceInsert.error) throw invoiceInsert.error;

  const itemInsert = await supabase.from("invoice_items").insert(
    payload.items.map((item, index) => ({
      invoice_id: invoiceId,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      amount: item.amount,
      sort_order: index,
    }))
  );

  if (itemInsert.error) {
    await supabase.from("invoices").delete().eq("org_id", orgId).eq("id", invoiceId);
    throw itemInsert.error;
  }

  const finalInvoiceRead = await supabase
    .from("invoices")
    .select("invoice_number")
    .eq("org_id", orgId)
    .eq("id", invoiceId)
    .maybeSingle();

  if (finalInvoiceRead.error) throw finalInvoiceRead.error;

  const finalInvoiceNumber =
    (finalInvoiceRead.data as { invoice_number?: string } | null)?.invoice_number ??
    placeholderInvoiceNumber;

  await supabase.from("events").insert({
    org_id: orgId,
    actor_user_id: session.user.id,
    event_type: payload.mode === "SENT" ? "invoice_sent" : "invoice_draft_created",
    entity_type: "invoice",
    entity_id: invoiceId,
    meta: {
      invoice_number: finalInvoiceNumber,
      customer_id: payload.customerId,
      subtotal: payload.subtotal,
      vat: payload.vat,
      total: payload.total,
      source: "invoices_page_service_refactor",
    },
  });

  let smsResult: { queued: boolean; reason?: string } | null = null;
  if (payload.mode === "SENT") {
    try {
      smsResult = await queueSmsAttempt({
        supabase,
        orgId,
        invoiceId,
        customerId: payload.customerId,
        invoiceNumber: finalInvoiceNumber,
        actorUserId: session.user.id,
      });
    } catch (error) {
      smsResult = { queued: false, reason: toDeveloperError(error).message };
    }
  }

  return {
    invoiceId,
    invoiceNumber: String(finalInvoiceNumber),
    smsResult,
  };
}
