"use client";

import { AppShell } from "@/components/AppShell";
import { createClient } from "@supabase/supabase-js";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

type Channel = "WHATSAPP" | "SMS" | "EMAIL";

type InvoiceStatus =
  | "DRAFT"
  | "SENT"
  | "PAID"
  | "OVERDUE"
  | "PARTIALLY_PAID"
  | "DISPUTED"
  | string;

type CustomerLite = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  preferred_channel: Channel | null;
};

type InvoiceRow = {
  id: string;
  invoice_number: string;
  status: InvoiceStatus;
  due_date: string | null;
  total: number | null;
  balance: number | null;
  created_at: string;
  disputeCount: number;
};

type ItemDraft = {
  description: string;
  quantity: string;
  unitPrice: string;
};

type CleanItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

type DraftAnalysis = {
  cleanItems: CleanItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  formErrors: string[];
  lineErrors: string[];
  allErrors: string[];
  canSaveDraft: boolean;
  canSaveSend: boolean;
  sendBlockedReasons: string[];
};

function parseNum(v: string): number {
  const n = Number(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function money(n: number): string {
  const val = Number.isFinite(n) ? n : 0;
  return `R ${val.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function ymdToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDate(isoLike: string | null | undefined): string {
  if (!isoLike) return "—";
  const d = new Date(isoLike);
  if (Number.isNaN(d.getTime())) return String(isoLike);
  return d.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function daysFromToday(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const today = new Date();
  const due = new Date(dateStr);
  if (Number.isNaN(due.getTime())) return null;

  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const d0 = new Date(due.getFullYear(), due.getMonth(), due.getDate()).getTime();

  return Math.round((d0 - t0) / (1000 * 60 * 60 * 24));
}

function makeUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function makeInvoiceNumber(seedId: string): string {
  // Fallback/local number to satisfy NOT NULL if trigger logic is conditional.
  // DB trigger may override this value.
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const suffix = seedId.replace(/-/g, "").slice(0, 6).toUpperCase();
  return `INV-${yyyy}${mm}${dd}-${hh}${mi}${ss}-${suffix}`;
}

async function sha256Hex(input: string): Promise<string> {
  try {
    if (
      typeof crypto === "undefined" ||
      !("subtle" in crypto) ||
      !crypto.subtle
    ) {
      return input;
    }
    const enc = new TextEncoder();
    const buf = await crypto.subtle.digest("SHA-256", enc.encode(input));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return input;
  }
}

function eMsg(e: any, fallback = "Something went wrong"): string {
  return e?.message || e?.error_description || e?.details || e?.hint || fallback;
}

function friendlyInvoiceItemsInsertError(err: any): string {
  const raw = eMsg(err, "Invoice items insert failed.");
  const m = raw.toLowerCase();

  // This is the common trap with your current trigger setup:
  // invoice_items insert fires trigger -> trigger updates invoices -> invoices UPDATE blocked by RLS
  if (
    m.includes("row-level security") &&
    m.includes("invoices")
  ) {
    return "Invoice items insert failed because the invoice_items trigger recalculates the parent invoice totals, but your current RLS likely blocks UPDATE on invoices for this user/org. Check invoices UPDATE policy (trigger side-effect).";
  }

  return raw;
}

function analyzeDraft(opts: {
  items: ItemDraft[];
  customerId: string;
  dueDate: string;
  vatEnabled: boolean;
  vatRate: string;
  selectedCustomer: CustomerLite | null;
}): DraftAnalysis {
  const { items, customerId, dueDate, vatEnabled, vatRate, selectedCustomer } = opts;

  const lineErrors: string[] = [];
  const cleanItems: CleanItem[] = [];

  items.forEach((it, idx) => {
    const description = it.description.trim();
    const quantity = parseNum(it.quantity);
    const unitPrice = round2(parseNum(it.unitPrice));
    const amount = round2(quantity * unitPrice);
    const lineNum = idx + 1;

    // Treat a row as untouched only if literally blank.
    const rowUntouched =
      !description &&
      String(it.quantity ?? "").trim() === "" &&
      String(it.unitPrice ?? "").trim() === "";

    if (rowUntouched) return;

    if (!description) lineErrors.push(`Item ${lineNum}: description is required.`);
    if (!(quantity > 0)) lineErrors.push(`Item ${lineNum}: quantity must be greater than 0.`);
    if (unitPrice < 0) lineErrors.push(`Item ${lineNum}: unit price cannot be negative.`);

    if (description && quantity > 0 && unitPrice >= 0) {
      cleanItems.push({ description, quantity, unitPrice, amount });
    }
  });

  const formErrors: string[] = [];
  if (!customerId) formErrors.push("Customer is required.");
  if (!dueDate) formErrors.push("Due date is required.");

  const vatRateNum = parseNum(vatRate);
  if (vatEnabled && !(vatRateNum >= 0)) {
    formErrors.push("VAT rate must be 0 or greater.");
  }

  if (cleanItems.length === 0) {
    formErrors.push("At least one valid line item is required.");
  }

  const subtotal = round2(cleanItems.reduce((acc, it) => acc + it.amount, 0));
  const vatAmount = vatEnabled ? round2(subtotal * (Math.max(0, vatRateNum) / 100)) : 0;
  const total = round2(subtotal + vatAmount);

  const canSaveDraft =
    formErrors.length === 0 &&
    lineErrors.length === 0 &&
    Number.isFinite(total) &&
    total >= 0;

  // Save & send assumes SMS queue path (requires phone)
  const canSaveSend = canSaveDraft && !!selectedCustomer?.phone;

  const sendBlockedReasons = [...formErrors, ...lineErrors];
  if (canSaveDraft && !selectedCustomer?.phone) {
    sendBlockedReasons.push("Selected customer needs a phone number to send via SMS.");
  }

  return {
    cleanItems,
    subtotal,
    vatAmount,
    total,
    formErrors,
    lineErrors,
    allErrors: [...formErrors, ...lineErrors],
    canSaveDraft,
    canSaveSend,
    sendBlockedReasons,
  };
}

function pageCard(extra?: CSSProperties): CSSProperties {
  return {
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%), rgba(8,10,14,0.72)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.24)",
    backdropFilter: "blur(10px)",
    ...extra,
  };
}

function sectionCard(extra?: CSSProperties): CSSProperties {
  return {
    padding: "1rem",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    ...extra,
  };
}

function fieldWrapStyle(hasError = false): CSSProperties {
  return {
    display: "grid",
    gap: 6,
    padding: "0.65rem",
    borderRadius: 12,
    border: hasError
      ? "1px solid rgba(239,68,68,0.45)"
      : "1px solid rgba(255,255,255,0.08)",
    background: hasError ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.02)",
  };
}

function statusBadgeStyle(status: string): CSSProperties {
  const s = String(status || "").toUpperCase();

  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "0.28rem 0.65rem",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.95)",
    whiteSpace: "nowrap",
    letterSpacing: "0.02em",
  };

  if (s === "PAID") {
    return {
      ...base,
      background: "rgba(34,197,94,0.16)",
      border: "1px solid rgba(34,197,94,0.38)",
    };
  }
  if (s === "OVERDUE") {
    return {
      ...base,
      background: "rgba(239,68,68,0.15)",
      border: "1px solid rgba(239,68,68,0.38)",
    };
  }
  if (s === "SENT" || s === "PARTIALLY_PAID") {
    return {
      ...base,
      background: "rgba(245,158,11,0.16)",
      border: "1px solid rgba(245,158,11,0.38)",
    };
  }
  if (s === "DRAFT") {
    return {
      ...base,
      background: "rgba(148,163,184,0.14)",
      border: "1px solid rgba(148,163,184,0.32)",
    };
  }
  if (s === "DISPUTED") {
    return {
      ...base,
      background: "rgba(244,63,94,0.16)",
      border: "1px solid rgba(244,63,94,0.34)",
    };
  }

  return base;
}

export default function InvoicesPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }
    return createClient(url, key);
  }, []);

  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [saving, setSaving] = useState(false);

  const [customers, setCustomers] = useState<CustomerLite[]>([]);
  const [recent, setRecent] = useState<InvoiceRow[]>([]);

  const [showBuilder, setShowBuilder] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [vatEnabled, setVatEnabled] = useState(false);
  const [vatRate, setVatRate] = useState("15");
  const [items, setItems] = useState<ItemDraft[]>([
    { description: "", quantity: "1", unitPrice: "0" },
  ]);

  const currency = "ZAR";

  const requireSession = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (!data.session) {
      router.push("/auth/signin");
      throw new Error("No active session.");
    }
    return data.session;
  }, [router, supabase]);

  const resolveActiveOrgIdStrict = useCallback(async (): Promise<string> => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("active_org_id") : null;

    const memRes = await supabase.from("org_memberships").select("org_id").limit(200);
    if (memRes.error) throw memRes.error;

    const memberships = (memRes.data ?? []) as Array<{ org_id: string }>;
    if (memberships.length === 0) {
      throw new Error("No organization membership found for this user.");
    }

    const validSet = new Set(memberships.map((m) => String(m.org_id)));
    const resolved = stored && validSet.has(stored) ? stored : String(memberships[0].org_id);

    if (typeof window !== "undefined") {
      localStorage.setItem("active_org_id", resolved);
    }

    return resolved;
  }, [supabase]);

  const filteredCustomers = useMemo(() => {
    const s = customerSearch.trim().toLowerCase();
    if (!s) return customers;
    return customers.filter((c) => {
      return (
        c.name.toLowerCase().includes(s) ||
        (c.phone ?? "").toLowerCase().includes(s) ||
        (c.email ?? "").toLowerCase().includes(s)
      );
    });
  }, [customerSearch, customers]);

  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === customerId) ?? null,
    [customers, customerId]
  );

  const draftAnalysis = useMemo(
    () =>
      analyzeDraft({
        items,
        customerId,
        dueDate,
        vatEnabled,
        vatRate,
        selectedCustomer,
      }),
    [items, customerId, dueDate, vatEnabled, vatRate, selectedCustomer]
  );

  const metrics = useMemo(() => {
    return {
      customers: customers.length,
      drafts: recent.filter((r) => String(r.status).toUpperCase() === "DRAFT").length,
      sentActive: recent.filter((r) =>
        ["SENT", "PARTIALLY_PAID", "OVERDUE"].includes(String(r.status).toUpperCase())
      ).length,
      outstandingValue: recent.reduce((acc, r) => acc + Number(r.balance ?? 0), 0),
      disputes: recent.reduce((acc, r) => acc + Number(r.disputeCount ?? 0), 0),
    };
  }, [customers.length, recent]);

  const load = useCallback(async () => {
    setErr(null);
    setInfo(null);
    setLoadingPage(true);

    try {
      await requireSession();
      const orgId = await resolveActiveOrgIdStrict();

      const [cRes, iRes] = await Promise.all([
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

      if (cRes.error) throw cRes.error;
      if (iRes.error) throw iRes.error;

      const safeCustomers: CustomerLite[] = ((cRes.data ?? []) as any[]).map((r) => ({
        id: String(r.id),
        name: String(r.name ?? ""),
        phone: r.phone ?? null,
        email: r.email ?? null,
        preferred_channel: (r.preferred_channel ?? null) as Channel | null,
      }));

      let safeInvoices: InvoiceRow[] = ((iRes.data ?? []) as any[]).map((r) => ({
        id: String(r.id),
        invoice_number: String(r.invoice_number ?? ""),
        status: String(r.status ?? "DRAFT"),
        due_date: (r.due_date ?? null) as string | null,
        total: r.total == null ? null : Number(r.total),
        balance: r.balance == null ? null : Number(r.balance),
        created_at: String(r.created_at ?? nowIso()),
        disputeCount: 0,
      }));

      // Optional enrichment only. Never block page.
      try {
        if (safeInvoices.length > 0) {
          const dRes = await supabase
            .from("invoice_disputes")
            .select("invoice_id")
            .in(
              "invoice_id",
              safeInvoices.map((i) => i.id)
            );

          if (!dRes.error && dRes.data) {
            const counts = new Map<string, number>();
            for (const row of dRes.data as any[]) {
              const id = String(row.invoice_id);
              counts.set(id, (counts.get(id) ?? 0) + 1);
            }
            safeInvoices = safeInvoices.map((inv) => ({
              ...inv,
              disputeCount: counts.get(inv.id) ?? 0,
            }));
          }
        }
      } catch {
        // ignore optional dispute enrichment
      }

      setCustomers(safeCustomers);
      setRecent(safeInvoices);
    } catch (e: any) {
      setErr(eMsg(e, "Failed to load invoices page."));
    } finally {
      setLoadingPage(false);
    }
  }, [requireSession, resolveActiveOrgIdStrict, supabase]);

  useEffect(() => {
    load();
  }, [load]);

  function openBuilder() {
    setErr(null);
    setInfo(null);
    setShowBuilder(true);
    if (!dueDate) setDueDate(ymdToday());
  }

  function closeBuilder() {
    setShowBuilder(false);
  }

  function resetBuilder() {
    setCustomerSearch("");
    setCustomerId("");
    setDueDate("");
    setVatEnabled(false);
    setVatRate("15");
    setItems([{ description: "", quantity: "1", unitPrice: "0" }]);
    setShowBuilder(false);
    setErr(null);
  }

  function addItemRow() {
    setItems((prev) => [...prev, { description: "", quantity: "1", unitPrice: "0" }]);
  }

  function removeItemRow(idx: number) {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length > 0 ? next : [{ description: "", quantity: "1", unitPrice: "0" }];
    });
  }

  function updateItem(idx: number, patch: Partial<ItemDraft>) {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }

  async function queueInvoiceSentSms(opts: {
    orgId: string;
    invoiceId: string;
    customerId: string;
    invoiceNumber: string;
    actorUserId?: string | null;
  }) {
    const { orgId, invoiceId, customerId, invoiceNumber, actorUserId = null } = opts;

    const custRes = await supabase
      .from("customers")
      .select("phone,opted_out,do_not_contact,consent")
      .eq("org_id", orgId)
      .eq("id", customerId)
      .single();

    if (custRes.error) throw custRes.error;

    const c = custRes.data as any;
    if (!c?.phone) throw new Error("Customer has no phone number (required for SMS).");
    if (c.opted_out || c.do_not_contact || c.consent === false) {
      throw new Error("Customer is not contactable (opted-out / do-not-contact / no consent).");
    }

    const smsTplRes = await supabase
      .from("message_templates")
      .select("id")
      .eq("org_id", orgId)
      .eq("channel", "SMS")
      .eq("name", "Invoice Sent")
      .limit(1)
      .maybeSingle();

    if (smsTplRes.error) throw smsTplRes.error;

    let templateId = (smsTplRes.data as any)?.id as string | undefined;

    if (!templateId) {
      const waTplRes = await supabase
        .from("message_templates")
        .select("id")
        .eq("org_id", orgId)
        .eq("channel", "WHATSAPP")
        .eq("name", "Invoice Sent")
        .limit(1)
        .maybeSingle();

      if (waTplRes.error) throw waTplRes.error;
      templateId = (waTplRes.data as any)?.id as string | undefined;
    }

    if (!templateId) {
      throw new Error("No 'Invoice Sent' template found. Run seed_org_defaults().");
    }

    const messageKey = await sha256Hex(`${orgId}:${invoiceId}:INVOICE_SENT`);

    const ins = await supabase.from("message_log").insert({
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

    if (ins.error && (ins.error as any).code !== "23505") throw ins.error;

    // Optional event - ignore failures
    try {
      await supabase.from("events").insert({
        org_id: orgId,
        actor_user_id: actorUserId,
        event_type: "invoice_sms_queued",
        entity_type: "invoice",
        entity_id: invoiceId,
        meta: { invoice_number: invoiceNumber, channel: "SMS" },
      });
    } catch {
      // ignore
    }
  }

  // IMPORTANT: invoice_items schema does NOT include org_id
  async function insertInvoiceItemsSafe(params: {
    invoiceId: string;
    items: CleanItem[];
  }) {
    const { invoiceId, items } = params;

    const rows = items.map((it, idx) => ({
      invoice_id: invoiceId,
      description: it.description,
      quantity: it.quantity,
      unit_price: it.unitPrice,
      amount: it.amount,
      sort_order: idx,
    }));

    const res = await supabase.from("invoice_items").insert(rows);
    if (res.error) throw res.error;
  }

  async function saveInvoice(mode: "DRAFT" | "SENT") {
    setErr(null);
    setInfo(null);

    if (mode === "DRAFT" && !draftAnalysis.canSaveDraft) {
      setErr(draftAnalysis.allErrors[0] ?? "Please complete the required fields.");
      return;
    }

    if (mode === "SENT" && !draftAnalysis.canSaveSend) {
      setErr(
        draftAnalysis.sendBlockedReasons[0] ??
          "Please complete required fields before sending."
      );
      return;
    }

    setSaving(true);

    try {
      const session = await requireSession();
      const orgId = await resolveActiveOrgIdStrict();

      const invoiceId = makeUuid();
      const localInvoiceNumber = makeInvoiceNumber(invoiceId);

      // Keep explicit values aligned with your schema.
      const invoicePayload: Record<string, any> = {
        id: invoiceId,
        org_id: orgId,
        customer_id: customerId,
        invoice_number: localInvoiceNumber, // NOT NULL; DB trigger may override
        status: mode,
        issue_date: ymdToday(),
        due_date: dueDate || null,
        sent_at: mode === "SENT" ? nowIso() : null,
        currency,
        subtotal: draftAnalysis.subtotal,
        vat: draftAnalysis.vatAmount,
        total: draftAnalysis.total,
        balance: draftAnalysis.total,
        created_by: session.user.id,
      };

      const invInsert = await supabase.from("invoices").insert(invoicePayload);
      if (invInsert.error) {
        throw new Error(`Invoice insert failed: ${invInsert.error.message}`);
      }

      // Insert children (invoice_items) - no org_id column in your schema
      try {
        await insertInvoiceItemsSafe({
          invoiceId,
          items: draftAnalysis.cleanItems,
        });
      } catch (itemErr: any) {
        // Best-effort rollback to avoid orphan parent rows
        await supabase.from("invoices").delete().eq("org_id", orgId).eq("id", invoiceId);

        throw new Error(`Invoice items insert failed: ${friendlyInvoiceItemsInsertError(itemErr)}`);
      }

      // Read final invoice_number (trigger may have replaced it)
      let finalInvoiceNumber = localInvoiceNumber;
      try {
        const invRead = await supabase
          .from("invoices")
          .select("invoice_number")
          .eq("org_id", orgId)
          .eq("id", invoiceId)
          .maybeSingle();

        if (!invRead.error && (invRead.data as any)?.invoice_number) {
          finalInvoiceNumber = String((invRead.data as any).invoice_number);
        }
      } catch {
        // non-fatal
      }

      // Optional event
      try {
        await supabase.from("events").insert({
          org_id: orgId,
          actor_user_id: session.user.id,
          event_type: mode === "SENT" ? "invoice_sent" : "invoice_draft_created",
          entity_type: "invoice",
          entity_id: invoiceId,
          meta: {
            invoice_number: finalInvoiceNumber,
            customer_id: customerId,
            subtotal: draftAnalysis.subtotal,
            vat: draftAnalysis.vatAmount,
            total: draftAnalysis.total,
            source: "invoices_page_rewrite_v3",
          },
        });
      } catch (eventErr) {
        console.warn("[InvoicesPage] event insert failed", eventErr);
      }

      if (mode === "SENT") {
        try {
          await queueInvoiceSentSms({
            orgId,
            invoiceId,
            customerId,
            invoiceNumber: finalInvoiceNumber,
            actorUserId: session.user.id,
          });
          setInfo(`Invoice sent successfully: ${finalInvoiceNumber} (SMS queued).`);
        } catch (smsErr: any) {
          setInfo(`Invoice ${finalInvoiceNumber} saved, but SMS queue failed: ${eMsg(smsErr)}`);
        }
      } else {
        setInfo(`Draft saved successfully: ${finalInvoiceNumber}`);
      }

      await load();
      resetBuilder();
    } catch (e: any) {
      console.error("[InvoicesPage.saveInvoice] FAILED", e);
      setErr(eMsg(e, "Failed to save invoice."));
    } finally {
      setSaving(false);
    }
  }

  function onBuilderSubmit(e: FormEvent) {
    // Prevent accidental Enter-key submit from bypassing explicit buttons.
    e.preventDefault();
  }

  return (
    <AppShell title="Invoices">
      <section
        className="panel"
        style={pageCard({
          padding: "1rem",
          borderRadius: 22,
          overflow: "hidden",
        })}
      >
        {/* Header */}
        <div
          style={sectionCard({
            background:
              "radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 45%), radial-gradient(circle at top left, rgba(168,85,247,0.12), transparent 45%), rgba(255,255,255,0.02)",
          })}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ minWidth: 260 }}>
              <h3 style={{ margin: 0, fontSize: 22, lineHeight: 1.1 }}>Invoices</h3>
              <p style={{ margin: "0.45rem 0 0", opacity: 0.82, maxWidth: 760 }}>
                Create and send invoices with tenant-safe writes to <code>invoices</code> and{" "}
                <code>invoice_items</code>. This page does <b>not</b> create{" "}
                <code>invoice_disputes</code> during invoice creation.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
              <button className="btn" onClick={load} disabled={loadingPage || saving}>
                {loadingPage ? "Refreshing..." : "Refresh"}
              </button>

              {!showBuilder ? (
                <button className="btn primary" onClick={openBuilder} disabled={loadingPage}>
                  Create invoice
                </button>
              ) : (
                <button className="btn" onClick={closeBuilder} disabled={saving}>
                  Close builder
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notices */}
        {err ? (
          <div
            style={sectionCard({
              marginTop: "0.9rem",
              border: "1px solid rgba(239,68,68,0.34)",
              background: "rgba(239,68,68,0.08)",
            })}
          >
            {err}
          </div>
        ) : null}

        {info ? (
          <div
            style={sectionCard({
              marginTop: "0.9rem",
              border: "1px solid rgba(59,130,246,0.28)",
              background: "rgba(59,130,246,0.07)",
            })}
          >
            {info}
          </div>
        ) : null}

        {/* Metrics */}
        <div
          style={{
            marginTop: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "0.75rem",
          }}
        >
          <div style={sectionCard()}>
            <div style={{ fontSize: 12, opacity: 0.74 }}>Clients</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{metrics.customers}</div>
          </div>

          <div style={sectionCard()}>
            <div style={{ fontSize: 12, opacity: 0.74 }}>Draft invoices</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{metrics.drafts}</div>
          </div>

          <div style={sectionCard()}>
            <div style={{ fontSize: 12, opacity: 0.74 }}>Sent / active</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{metrics.sentActive}</div>
          </div>

          <div style={sectionCard()}>
            <div style={{ fontSize: 12, opacity: 0.74 }}>Outstanding (recent)</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>
              {money(metrics.outstandingValue)}
            </div>
          </div>

          <div style={sectionCard()}>
            <div style={{ fontSize: 12, opacity: 0.74 }}>Disputes (recent)</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{metrics.disputes}</div>
          </div>
        </div>

        {/* Builder */}
        {showBuilder && (
          <form onSubmit={onBuilderSubmit} style={{ marginTop: "1rem", display: "grid", gap: "0.9rem" }}>
            {draftAnalysis.allErrors.length > 0 ? (
              <div
                style={sectionCard({
                  border: "1px solid rgba(245,158,11,0.34)",
                  background: "rgba(245,158,11,0.07)",
                })}
              >
                <div style={{ fontWeight: 700, marginBottom: 8 }}>
                  Complete required fields before saving
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1rem",
                    opacity: 0.92,
                    display: "grid",
                    gap: 4,
                  }}
                >
                  {draftAnalysis.allErrors.slice(0, 8).map((msg, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div
              data-builder-grid="true"
              style={{
                display: "grid",
                gap: "0.9rem",
                gridTemplateColumns: "minmax(0, 1.55fr) minmax(0, 1fr)",
                alignItems: "start",
              }}
            >
              {/* Left column */}
              <div style={{ display: "grid", gap: "0.9rem", minWidth: 0 }}>
                {/* Invoice setup */}
                <div style={sectionCard()}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0 }}>Invoice setup</h4>
                      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>
                        Select a client, due date, and VAT settings
                      </div>
                    </div>
                    <span style={{ opacity: 0.6, fontSize: 12 }}>Step 1</span>
                  </div>

                  <div style={{ marginTop: "0.85rem", display: "grid", gap: "0.75rem" }}>
                    <div style={fieldWrapStyle(false)}>
                      <label style={{ fontSize: 12, opacity: 0.78 }}>Search clients</label>
                      <input
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        placeholder="Search by name / phone / email..."
                        style={{ width: "100%" }}
                      />
                    </div>

                    <div style={fieldWrapStyle(!customerId)}>
                      <label style={{ fontSize: 12, opacity: 0.78 }}>
                        Client * ({filteredCustomers.length} shown / {customers.length} total)
                      </label>
                      <select
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        style={{ width: "100%" }}
                      >
                        <option value="">Select client...</option>
                        {filteredCustomers.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                            {c.phone ? ` • ${c.phone}` : ""}
                            {c.email ? ` • ${c.email}` : ""}
                          </option>
                        ))}
                      </select>
                      {!customerId ? (
                        <div style={{ fontSize: 12, color: "rgba(248,113,113,0.95)" }}>Required</div>
                      ) : null}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                        gap: "0.7rem",
                      }}
                    >
                      <div style={fieldWrapStyle(!dueDate)}>
                        <label style={{ fontSize: 12, opacity: 0.78 }}>Due date *</label>
                        <input
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          style={{ width: "100%" }}
                        />
                        {!dueDate ? (
                          <div style={{ fontSize: 12, color: "rgba(248,113,113,0.95)" }}>Required</div>
                        ) : null}
                      </div>

                      <div style={fieldWrapStyle(false)}>
                        <label style={{ fontSize: 12, opacity: 0.78 }}>Currency</label>
                        <input value={currency} readOnly style={{ width: "100%" }} />
                        <div style={{ fontSize: 12, opacity: 0.62 }}>Fixed for now</div>
                      </div>

                      <div style={fieldWrapStyle(vatEnabled && parseNum(vatRate) < 0)}>
                        <label style={{ fontSize: 12, opacity: 0.78 }}>VAT rate (%)</label>
                        <input
                          value={vatRate}
                          onChange={(e) => setVatRate(e.target.value)}
                          disabled={!vatEnabled}
                          placeholder="15"
                          style={{ width: "100%" }}
                        />
                        <div style={{ fontSize: 12, opacity: vatEnabled ? 0.7 : 0.45 }}>
                          {vatEnabled ? "Applied to subtotal" : "Disabled"}
                        </div>
                      </div>
                    </div>

                    <div
                      style={sectionCard({
                        padding: "0.8rem",
                        background: "rgba(255,255,255,0.02)",
                      })}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>VAT</div>
                          <div style={{ opacity: 0.72, fontSize: 12 }}>Enable VAT on this invoice</div>
                        </div>

                        <label
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={vatEnabled}
                            onChange={(e) => setVatEnabled(e.target.checked)}
                          />
                          <span>{vatEnabled ? "Enabled" : "Disabled"}</span>
                        </label>
                      </div>
                    </div>

                    {selectedCustomer ? (
                      <div
                        style={sectionCard({
                          padding: "0.85rem",
                          background:
                            "radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 60%), rgba(255,255,255,0.02)",
                        })}
                      >
                        <div style={{ fontWeight: 700, marginBottom: 4 }}>Selected client</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{selectedCustomer.name}</div>
                        <div style={{ opacity: 0.72, fontSize: 12, marginTop: 2 }}>
                          {selectedCustomer.phone || "No phone"} • {selectedCustomer.email || "No email"}
                        </div>
                        <div style={{ opacity: 0.72, fontSize: 12, marginTop: 2 }}>
                          Preferred channel: {selectedCustomer.preferred_channel || "Not set"}
                        </div>
                        {!selectedCustomer.phone ? (
                          <div
                            style={{
                              marginTop: 6,
                              fontSize: 12,
                              color: "rgba(251,191,36,0.95)",
                            }}
                          >
                            Save draft is allowed. “Save & send” is disabled until this client has a phone number.
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Line items */}
                <div style={sectionCard()}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0 }}>Line items</h4>
                      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>
                        Add services / products and pricing
                      </div>
                    </div>

                    <button className="btn" type="button" onClick={addItemRow}>
                      + Add item
                    </button>
                  </div>

                  <div style={{ marginTop: "0.9rem", display: "grid", gap: "0.75rem" }}>
                    {items.map((it, idx) => {
                      const qty = parseNum(it.quantity);
                      const price = round2(parseNum(it.unitPrice));
                      const lineTotal = round2(qty * price);

                      const descMissing = it.description.trim().length === 0;
                      const qtyInvalid = !(qty > 0);
                      const priceInvalid = price < 0;

                      const hasUserInput =
                        it.description.trim().length > 0 ||
                        String(it.quantity).trim() !== "" ||
                        String(it.unitPrice).trim() !== "";

                      const showErrors = hasUserInput || items.length === 1;
                      const hasErrors = showErrors && (descMissing || qtyInvalid || priceInvalid);

                      return (
                        <div
                          key={idx}
                          style={sectionCard({
                            padding: "0.9rem",
                            borderRadius: 14,
                            border: hasErrors
                              ? "1px solid rgba(239,68,68,0.28)"
                              : "1px solid rgba(255,255,255,0.08)",
                            background: hasErrors
                              ? "rgba(239,68,68,0.04)"
                              : "rgba(255,255,255,0.02)",
                          })}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "0.75rem",
                              marginBottom: "0.7rem",
                              flexWrap: "wrap",
                            }}
                          >
                            <div style={{ fontWeight: 700 }}>Item #{idx + 1}</div>

                            {items.length > 1 ? (
                              <button
                                className="btn"
                                type="button"
                                onClick={() => removeItemRow(idx)}
                              >
                                Remove
                              </button>
                            ) : (
                              <span style={{ opacity: 0.6, fontSize: 12 }}>
                                At least one item required
                              </span>
                            )}
                          </div>

                          <div style={{ display: "grid", gap: "0.65rem" }}>
                            <div style={fieldWrapStyle(showErrors && descMissing)}>
                              <label style={{ fontSize: 12, opacity: 0.78 }}>Description *</label>
                              <input
                                value={it.description}
                                onChange={(e) => updateItem(idx, { description: e.target.value })}
                                placeholder="e.g., Monthly cleaning — Feb 2026"
                                style={{ width: "100%" }}
                              />
                              {showErrors && descMissing ? (
                                <div style={{ fontSize: 12, color: "rgba(248,113,113,0.95)" }}>
                                  Required
                                </div>
                              ) : null}
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                gap: "0.6rem",
                              }}
                            >
                              <div style={fieldWrapStyle(showErrors && qtyInvalid)}>
                                <label style={{ fontSize: 12, opacity: 0.78 }}>Qty *</label>
                                <input
                                  value={it.quantity}
                                  onChange={(e) => updateItem(idx, { quantity: e.target.value })}
                                  placeholder="1"
                                  style={{ width: "100%" }}
                                />
                                {showErrors && qtyInvalid ? (
                                  <div style={{ fontSize: 12, color: "rgba(248,113,113,0.95)" }}>
                                    Must be &gt; 0
                                  </div>
                                ) : null}
                              </div>

                              <div style={fieldWrapStyle(showErrors && priceInvalid)}>
                                <label style={{ fontSize: 12, opacity: 0.78 }}>Unit price *</label>
                                <input
                                  value={it.unitPrice}
                                  onChange={(e) => updateItem(idx, { unitPrice: e.target.value })}
                                  placeholder="0"
                                  style={{ width: "100%" }}
                                />
                                {showErrors && priceInvalid ? (
                                  <div style={{ fontSize: 12, color: "rgba(248,113,113,0.95)" }}>
                                    Cannot be negative
                                  </div>
                                ) : null}
                              </div>

                              <div style={fieldWrapStyle(false)}>
                                <label style={{ fontSize: 12, opacity: 0.78 }}>Line total</label>
                                <input value={money(lineTotal)} readOnly style={{ width: "100%" }} />
                                <div style={{ fontSize: 12, opacity: 0.62 }}>Auto-calculated</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: "0.75rem", fontSize: 12, opacity: 0.68 }}>
                    This page writes to <b>invoices</b> + <b>invoice_items</b>. It does <b>not</b>{" "}
                    create <b>invoice_disputes</b> during invoice creation.
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div style={{ display: "grid", gap: "0.9rem", minWidth: 0 }}>
                <div
                  data-summary-card="true"
                  style={sectionCard({
                    position: "static",
                    top: 12,
                    background:
                      "radial-gradient(circle at top right, rgba(16,185,129,0.10), transparent 55%), rgba(255,255,255,0.025)",
                  })}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0 }}>Totals & actions</h4>
                      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>
                        Review then save or send
                      </div>
                    </div>
                    <span style={{ opacity: 0.6, fontSize: 12 }}>Step 2</span>
                  </div>

                  <div style={{ marginTop: "0.85rem", display: "grid", gap: "0.7rem" }}>
                    <div style={sectionCard({ padding: "0.85rem" })}>
                      <div style={{ display: "grid", gap: "0.55rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                          <span style={{ opacity: 0.82 }}>Subtotal</span>
                          <b>{money(draftAnalysis.subtotal)}</b>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                          <span style={{ opacity: 0.82 }}>
                            VAT {vatEnabled ? `(${Math.max(0, parseNum(vatRate))}%)` : ""}
                          </span>
                          <b>{money(draftAnalysis.vatAmount)}</b>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 12,
                            marginTop: 4,
                            paddingTop: 8,
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            fontSize: 16,
                          }}
                        >
                          <span style={{ fontWeight: 800 }}>Total</span>
                          <span style={{ fontWeight: 800 }}>{money(draftAnalysis.total)}</span>
                        </div>
                      </div>
                    </div>

                    <div style={sectionCard({ padding: "0.85rem" })}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>Validation status</div>

                      <div style={{ display: "grid", gap: 6, fontSize: 12 }}>
                        <div>
                          Draft save:{" "}
                          <b
                            style={{
                              color: draftAnalysis.canSaveDraft
                                ? "rgba(74,222,128,0.95)"
                                : "rgba(248,113,113,0.95)",
                            }}
                          >
                            {draftAnalysis.canSaveDraft ? "Ready" : "Blocked"}
                          </b>
                        </div>

                        <div>
                          Send (SMS):{" "}
                          <b
                            style={{
                              color: draftAnalysis.canSaveSend
                                ? "rgba(74,222,128,0.95)"
                                : "rgba(248,113,113,0.95)",
                            }}
                          >
                            {draftAnalysis.canSaveSend ? "Ready" : "Blocked"}
                          </b>
                        </div>

                        {!draftAnalysis.canSaveSend && draftAnalysis.sendBlockedReasons.length > 0 ? (
                          <div style={{ marginTop: 2, opacity: 0.78 }}>
                            {draftAnalysis.sendBlockedReasons[0]}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div style={{ display: "grid", gap: "0.65rem", marginTop: 2 }}>
                      <button
                        className="btn primary"
                        type="button"
                        onClick={() => saveInvoice("SENT")}
                        disabled={saving || !draftAnalysis.canSaveSend}
                        title={
                          !draftAnalysis.canSaveSend
                            ? draftAnalysis.sendBlockedReasons[0] ?? "Complete required fields"
                            : ""
                        }
                      >
                        {saving ? "Processing..." : "Save & send (SMS queued)"}
                      </button>

                      <button
                        className="btn"
                        type="button"
                        onClick={() => saveInvoice("DRAFT")}
                        disabled={saving || !draftAnalysis.canSaveDraft}
                        title={
                          !draftAnalysis.canSaveDraft
                            ? draftAnalysis.allErrors[0] ?? "Complete required fields"
                            : ""
                        }
                      >
                        {saving ? "Saving..." : "Save draft"}
                      </button>

                      <button className="btn" type="button" onClick={resetBuilder} disabled={saving}>
                        Cancel
                      </button>
                    </div>

                    <div
                      style={sectionCard({
                        padding: "0.85rem",
                        background: "rgba(255,255,255,0.02)",
                      })}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 13 }}>
                        DB write path
                      </div>
                      <div style={{ opacity: 0.76, fontSize: 12, lineHeight: 1.45 }}>
                        <code>invoices</code> → <code>invoice_items</code> → optional <code>events</code> /{" "}
                        <code>message_log</code>. If item insert fails with an RLS error mentioning{" "}
                        <code>invoices</code>, the trigger that recalculates totals is likely blocked by
                        missing <code>UPDATE</code> policy on <code>invoices</code>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Recent invoices */}
        <div style={{ marginTop: "1rem" }}>
          <div
            style={sectionCard({
              padding: "0.9rem 1rem",
              marginBottom: "0.8rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
            })}
          >
            <div>
              <h4 style={{ margin: 0 }}>Recent invoices</h4>
              <div style={{ opacity: 0.72, fontSize: 12, marginTop: 4 }}>
                Latest invoices for the active organization
              </div>
            </div>

            <div style={{ opacity: 0.75, fontSize: 12 }}>
              Showing {recent.length} invoice{recent.length === 1 ? "" : "s"}
            </div>
          </div>

          {loadingPage ? (
            <div style={sectionCard({ padding: "1rem" })}>Loading invoices...</div>
          ) : recent.length === 0 ? (
            <div style={sectionCard({ padding: "1rem" })}>
              <div style={{ fontWeight: 700 }}>No invoices yet</div>
              <div style={{ opacity: 0.75, marginTop: 4, fontSize: 13 }}>
                Create your first invoice to test tenant-safe inserts and line item writes.
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "0.8rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              {recent.map((i) => {
                const diff = daysFromToday(i.due_date);
                const dueMeta =
                  diff === null
                    ? "No due date"
                    : diff === 0
                    ? "Due today"
                    : diff > 0
                    ? `Due in ${diff} day${diff === 1 ? "" : "s"}`
                    : `${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} overdue`;

                return (
                  <div
                    key={i.id}
                    style={sectionCard({
                      padding: "0.95rem",
                      background:
                        "radial-gradient(circle at top right, rgba(99,102,241,0.08), transparent 60%), rgba(255,255,255,0.02)",
                    })}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 15 }}>
                          {i.invoice_number || "Invoice"}
                        </div>
                        <div style={{ opacity: 0.68, fontSize: 12, marginTop: 2 }}>
                          Created {formatDate(i.created_at)}
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "0.45rem",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {(i.disputeCount ?? 0) > 0 ? (
                          <span style={statusBadgeStyle("DISPUTED")}>
                            {i.disputeCount} dispute{i.disputeCount === 1 ? "" : "s"}
                          </span>
                        ) : null}
                        <span style={statusBadgeStyle(i.status)}>{i.status}</span>
                      </div>
                    </div>

                    <div
                      style={sectionCard({
                        marginTop: "0.75rem",
                        padding: "0.8rem",
                        borderRadius: 14,
                      })}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                          gap: "0.55rem",
                        }}
                      >
                        <div>
                          <div style={{ opacity: 0.68, fontSize: 12 }}>Total</div>
                          <div style={{ fontWeight: 800 }}>{money(Number(i.total ?? 0))}</div>
                        </div>
                        <div>
                          <div style={{ opacity: 0.68, fontSize: 12 }}>Balance</div>
                          <div style={{ fontWeight: 800 }}>{money(Number(i.balance ?? 0))}</div>
                        </div>
                        <div>
                          <div style={{ opacity: 0.68, fontSize: 12 }}>Due date</div>
                          <div style={{ fontWeight: 700 }}>{formatDate(i.due_date)}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ opacity: 0.72, fontSize: 12, marginTop: "0.65rem" }}>
                      {dueMeta}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginTop: "0.7rem",
                      }}
                    >
                      <button className="btn" type="button" disabled>
                        View
                      </button>
                      <button className="btn" type="button" disabled>
                        Edit
                      </button>
                      <button className="btn" type="button" disabled>
                        Resend
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        [data-builder-grid="true"] {
          min-width: 0;
        }

        [data-builder-grid="true"] > * {
          min-width: 0;
        }

        @media (min-width: 981px) {
          [data-summary-card="true"] {
            position: sticky !important;
            top: 12px;
          }
        }

        @media (max-width: 980px) {
          [data-builder-grid="true"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .panel {
            padding: 0.8rem !important;
          }
        }
      `}</style>
    </AppShell>
  );
}