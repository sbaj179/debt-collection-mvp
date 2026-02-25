import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

function renderTemplate(body: string, vars: Record<string, string>) {
  let out = body;
  for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, v ?? "");
  return out;
}

async function sendSmsMock(to: string, text: string) {
  // no network, no cost
  return `MOCK:${to}:${Date.now()}`;
}

async function sendSmsTwilio(to: string, text: string) {
  const sid = mustEnv("TWILIO_ACCOUNT_SID");
  const token = mustEnv("TWILIO_AUTH_TOKEN");
  const from = mustEnv("TWILIO_FROM");

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const form = new URLSearchParams();
  form.set("To", to);
  form.set("From", from);
  form.set("Body", text);

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || `Twilio error ${res.status}`);

  return json?.sid as string | undefined;
}

export async function POST(req: NextRequest) {
  // protect the endpoint
  const secret = req.headers.get("x-cron-secret");
  if (!secret || secret !== mustEnv("CRON_SECRET")) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const provider = (process.env.SMS_PROVIDER ?? "MOCK").toUpperCase();
  const publicAppUrl = process.env.PUBLIC_APP_URL ?? "";

  // service role (server only)
  const url = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceKey = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
  const sb = createClient(url, serviceKey, { auth: { persistSession: false } });

  // Pull queued SMS jobs
  const q = await sb
    .from("message_log")
    .select("id,org_id,customer_id,invoice_id,template_id,channel,status,message_key,scheduled_for")
    .eq("status", "QUEUED")
    .eq("channel", "SMS")
    .lte("scheduled_for", new Date().toISOString())
    .order("scheduled_for", { ascending: true })
    .limit(50);

  if (q.error) {
    return NextResponse.json({ ok: false, error: q.error.message }, { status: 500 });
  }

  const jobs = q.data ?? [];
  let sent = 0;
  let failed = 0;

  for (const job of jobs) {
    try {
      // Load required data (invoice/customer/template/org)
      const invRes = await sb
        .from("invoices")
        .select("id,invoice_number,due_date,balance,pay_link_url,portal_token,org_id")
        .eq("id", job.invoice_id)
        .single();
      if (invRes.error) throw invRes.error;

      const custRes = await sb
        .from("customers")
        .select("id,name,phone,opted_out,do_not_contact,consent")
        .eq("id", job.customer_id)
        .single();
      if (custRes.error) throw custRes.error;

      const tplRes = await sb
        .from("message_templates")
        .select("id,body")
        .eq("id", job.template_id)
        .single();
      if (tplRes.error) throw tplRes.error;

      const orgRes = await sb
        .from("organizations")
        .select("id,name")
        .eq("id", job.org_id)
        .single();
      if (orgRes.error) throw orgRes.error;

      const inv = invRes.data;
      const cust = custRes.data;
      const tpl = tplRes.data;
      const org = orgRes.data;

      // Gatekeeping
      if (!cust.phone) throw new Error("Customer has no phone number.");
      if (cust.opted_out || cust.do_not_contact || cust.consent === false) {
        throw new Error("Customer not contactable (opted out / do-not-contact / no consent).");
      }

      // Render SMS text
      const vars = {
        customer_name: cust.name ?? "",
        invoice_number: inv.invoice_number ?? "",
        amount: Number(inv.balance ?? 0).toFixed(2),
        due_date: inv.due_date ?? "",
        pay_link: inv.pay_link_url ?? "",
        portal_link: `${publicAppUrl}/portal/${inv.portal_token}`,
        business_name: org.name ?? "",
      };

      const text = renderTemplate(tpl.body, vars);

      // Send SMS (MOCK now, TWILIO later)
      const providerId =
        provider === "TWILIO"
          ? await sendSmsTwilio(cust.phone, text)
          : await sendSmsMock(cust.phone, text);

      // Update log
      const upd = await sb
        .from("message_log")
        .update({
          status: "SENT",
          provider_message_id: providerId ?? null,
          provider_error: null,
          sent_at: new Date().toISOString(),
        })
        .eq("id", job.id);

      if (upd.error) throw upd.error;

      // Event for activity feed (include a short preview in MOCK mode)
      await sb.from("events").insert({
        org_id: job.org_id,
        actor_user_id: null,
        event_type: provider === "TWILIO" ? "sms_sent" : "sms_sent_mock",
        entity_type: "invoice",
        entity_id: job.invoice_id,
        meta: {
          invoice_number: inv.invoice_number,
          channel: "SMS",
          provider,
          to: cust.phone,
          preview: provider === "MOCK" ? text.slice(0, 180) : null,
        },
      });

      sent += 1;
    } catch (e: any) {
      failed += 1;

      await sb
        .from("message_log")
        .update({
          status: "FAILED",
          provider_error: String(e?.message ?? e),
        })
        .eq("id", job.id);

      await sb.from("events").insert({
        org_id: job.org_id,
        actor_user_id: null,
        event_type: "sms_failed",
        entity_type: "invoice",
        entity_id: job.invoice_id,
        meta: { error: String(e?.message ?? e), channel: "SMS", provider },
      });
    }
  }

  return NextResponse.json({ ok: true, provider, checked: jobs.length, sent, failed });
}