// jobs/cronHandler.ts
import crypto from "crypto";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

type Channel = "WHATSAPP" | "SMS" | "EMAIL";

type Org = {
  id: string;
  timezone: string;
  quiet_hours_start: string; // "20:00:00"
  quiet_hours_end: string;   // "07:00:00"
  max_reminders_per_week: number;
};

type Rule = {
  id: string;
  org_id: string;
  is_enabled: boolean;
  trigger: "DAYS_AFTER_SENT" | "DAYS_BEFORE_DUE" | "DAYS_AFTER_DUE";
  offset_days: number;
  channel_primary: Channel;
  channel_fallback_1: Channel | null;
  channel_fallback_2: Channel | null;
  template_id: string;
  quiet_hours_start: string | null;
  quiet_hours_end: string | null;
  weekly_cap: number | null;
};

type Invoice = {
  id: string;
  org_id: string;
  customer_id: string;
  invoice_number: string;
  status: string;
  due_date: string | null; // YYYY-MM-DD
  sent_at: string | null;  // timestamptz
  balance: number;
  pay_link_url: string | null;
  portal_token: string;
};

type Customer = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  preferred_channel: Channel;
  opted_out: boolean;
  do_not_contact: boolean;
  consent: boolean;
};

type Template = {
  id: string;
  org_id: string;
  channel: Channel;
  name: string;
  subject: string | null;
  body: string;
};

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

function serviceClient(): SupabaseClient {
  // Server-only keys. DO NOT expose in browser.
  const url = mustEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceKey = mustEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

function ymdInZA(d: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);

  const y = parts.find((p) => p.type === "year")?.value ?? "0000";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const day = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${day}`;
}

function parseYmdUtc(ymd: string): number {
  const [y, m, d] = ymd.split("-").map(Number);
  return Date.UTC(y, (m ?? 1) - 1, d ?? 1);
}

function daysDiff(todayYmd: string, otherYmd: string): number {
  return Math.floor((parseYmdUtc(todayYmd) - parseYmdUtc(otherYmd)) / (1000 * 60 * 60 * 24));
}

function withinQuietHours(now: Date, startHHMMSS: string, endHHMMSS: string): boolean {
  // Quiet hours might wrap midnight (e.g., 20:00 -> 07:00)
  const toMin = (hhmmss: string) => {
    const [h, m] = hhmmss.split(":").map(Number);
    return (h ?? 0) * 60 + (m ?? 0);
  };

  const nowParts = new Intl.DateTimeFormat("en-ZA", {
    timeZone: "Africa/Johannesburg",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const hh = Number(nowParts.find((p) => p.type === "hour")?.value ?? "0");
  const mm = Number(nowParts.find((p) => p.type === "minute")?.value ?? "0");
  const nowMin = hh * 60 + mm;

  const s = toMin(startHHMMSS);
  const e = toMin(endHHMMSS);

  if (s === e) return false; // no quiet window
  if (s < e) return nowMin >= s && nowMin < e;       // same-day window
  return nowMin >= s || nowMin < e;                  // wraps midnight
}

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function messageKey(orgId: string, invoiceId: string, ruleId: string, slotYmd: string) {
  // deterministic per org+invoice+rule+day
  return sha256(`${orgId}:${invoiceId}:${ruleId}:${slotYmd}`);
}

function renderTemplate(body: string, vars: Record<string, string>) {
  let out = body;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{${k}}`, v);
  }
  return out;
}

async function countMessagesThisWeek(
  sb: SupabaseClient,
  orgId: string,
  invoiceId: string,
  weekStartIso: string
): Promise<number> {
  const res = await sb
    .from("message_log")
    .select("id", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("invoice_id", invoiceId)
    .gte("created_at", weekStartIso);

  if (res.error) throw res.error;
  return res.count ?? 0;
}

function weekStartIsoZA(now: Date): string {
  // Monday 00:00 ZA converted to ISO in UTC-ish form (good enough for counting)
  const za = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));
  const day = za.getDay(); // Sun=0..Sat=6
  const diffToMonday = (day + 6) % 7; // Mon->0, Tue->1...
  za.setDate(za.getDate() - diffToMonday);
  za.setHours(0, 0, 0, 0);
  return za.toISOString();
}

function ruleFiresToday(rule: Rule, inv: Invoice, todayYmd: string): boolean {
  if (!rule.is_enabled) return false;

  if (rule.trigger === "DAYS_AFTER_SENT") {
    if (!inv.sent_at) return false;
    const sentYmd = ymdInZA(new Date(inv.sent_at));
    return daysDiff(todayYmd, sentYmd) === rule.offset_days;
  }

  if (rule.trigger === "DAYS_BEFORE_DUE") {
    if (!inv.due_date) return false;
    // fires when due_date - today == offset
    return daysDiff(inv.due_date, todayYmd) === rule.offset_days;
  }

  if (rule.trigger === "DAYS_AFTER_DUE") {
    if (!inv.due_date) return false;
    return daysDiff(todayYmd, inv.due_date) === rule.offset_days;
  }

  return false;
}

function pickChannels(rule: Rule): Channel[] {
  const list: Channel[] = [rule.channel_primary];
  if (rule.channel_fallback_1) list.push(rule.channel_fallback_1);
  if (rule.channel_fallback_2) list.push(rule.channel_fallback_2);
  // de-dupe
  return Array.from(new Set(list));
}

function channelReachable(c: Customer, ch: Channel): boolean {
  if (c.do_not_contact || c.opted_out || !c.consent) return false;
  if (ch === "WHATSAPP" || ch === "SMS") return Boolean(c.phone);
  if (ch === "EMAIL") return Boolean(c.email);
  return false;
}

async function getTemplateForChannel(
  sb: SupabaseClient,
  orgId: string,
  templateId: string,
  desiredChannel: Channel
): Promise<Template | null> {
  // Rule stores a template_id (likely WhatsApp). We also keep same-named templates per channel.
  // Strategy:
  // 1) fetch base template by templateId to get its name
  // 2) fetch template by (org_id, channel=desiredChannel, name=base.name)
  const base = await sb.from("message_templates").select("id,org_id,channel,name,subject,body").eq("org_id", orgId).eq("id", templateId).single();
  if (base.error) throw base.error;
  const baseT = base.data as Template;

  const alt = await sb
    .from("message_templates")
    .select("id,org_id,channel,name,subject,body")
    .eq("org_id", orgId)
    .eq("channel", desiredChannel)
    .eq("name", baseT.name)
    .limit(1)
    .maybeSingle();

  if (alt.error) throw alt.error;
  return (alt.data as Template) ?? baseT;
}

export async function runReminderSweep() {
  const sb = serviceClient();
  const now = new Date();
  const today = ymdInZA(now);
  const weekStartIso = weekStartIsoZA(now);

  const metrics = {
    checkedInvoices: 0,
    eligibleInvoices: 0,
    enqueued: 0,
    skippedIdempotent: 0,
    skippedQuietHours: 0,
    skippedCap: 0,
    skippedNoChannel: 0,
    orgs: 0,
  };

  // Load orgs (tenants)
  const orgRes = await sb
    .from("organizations")
    .select("id,timezone,quiet_hours_start,quiet_hours_end,max_reminders_per_week")
    .order("created_at", { ascending: true });

  if (orgRes.error) throw orgRes.error;
  const orgs = (orgRes.data ?? []) as Org[];
  metrics.orgs = orgs.length;

  for (const org of orgs) {
    // enforce org-level quiet hours (unless rule overrides)
    const orgQuietStart = (org.quiet_hours_start ?? "20:00:00");
    const orgQuietEnd = (org.quiet_hours_end ?? "07:00:00");
    const orgCap = org.max_reminders_per_week ?? 5;

    // rules for org
    const rulesRes = await sb
      .from("reminder_rules")
      .select("id,org_id,is_enabled,trigger,offset_days,channel_primary,channel_fallback_1,channel_fallback_2,template_id,quiet_hours_start,quiet_hours_end,weekly_cap")
      .eq("org_id", org.id)
      .eq("is_enabled", true);

    if (rulesRes.error) throw rulesRes.error;
    const rules = (rulesRes.data ?? []) as Rule[];
    if (rules.length === 0) continue;

    // eligible invoices for org
    const invRes = await sb
      .from("invoices")
      .select("id,org_id,customer_id,invoice_number,status,due_date,sent_at,balance,pay_link_url,portal_token,paused")
      .eq("org_id", org.id)
      .gt("balance", 0)
      .in("status", ["SENT", "OVERDUE", "PARTIALLY_PAID"])
      .order("due_date", { ascending: true })
      .limit(2000);

    if (invRes.error) throw invRes.error;
    const invs = (invRes.data ?? []) as any[];

    // pull disputes to pause reminders
    const invIds = invs.map((i) => i.id);
    const disputeSet = new Set<string>();
    if (invIds.length) {
      const dRes = await sb
        .from("invoice_disputes")
        .select("invoice_id,status")
        .eq("org_id", org.id)
        .in("invoice_id", invIds)
        .eq("status", "OPEN");

      if (dRes.error) throw dRes.error;
      for (const d of dRes.data ?? []) disputeSet.add(d.invoice_id);
    }

    // customers (only those referenced)
    const customerIds = Array.from(new Set(invs.map((i) => i.customer_id)));
    const custMap = new Map<string, Customer>();
    if (customerIds.length) {
      const cRes = await sb
        .from("customers")
        .select("id,name,phone,email,preferred_channel,consent,opted_out,do_not_contact")
        .eq("org_id", org.id)
        .in("id", customerIds);

      if (cRes.error) throw cRes.error;
      for (const c of cRes.data ?? []) custMap.set(c.id, c as Customer);
    }

    for (const raw of invs) {
      metrics.checkedInvoices += 1;

      // normalize invoice to our type
      const inv: Invoice = {
        id: raw.id,
        org_id: raw.org_id,
        customer_id: raw.customer_id,
        invoice_number: raw.invoice_number,
        status: raw.status,
        due_date: raw.due_date,
        sent_at: raw.sent_at,
        balance: Number(raw.balance ?? 0),
        pay_link_url: raw.pay_link_url ?? null,
        portal_token: raw.portal_token,
      };

      if (raw.paused) continue;
      if (disputeSet.has(inv.id)) continue;

      const customer = custMap.get(inv.customer_id);
      if (!customer) continue;

      // apply all rules that fire today (usually 0 or 1)
      const firingRules = rules.filter((r) => ruleFiresToday(r, inv, today));
      if (firingRules.length === 0) continue;

      metrics.eligibleInvoices += 1;

      for (const rule of firingRules) {
        // quiet hours (rule overrides org settings if provided)
        const qs = (rule.quiet_hours_start ?? orgQuietStart);
        const qe = (rule.quiet_hours_end ?? orgQuietEnd);
        if (withinQuietHours(now, qs, qe)) {
          metrics.skippedQuietHours += 1;
          continue;
        }

        // weekly cap per invoice
        const cap = rule.weekly_cap ?? orgCap;
        const used = await countMessagesThisWeek(sb, org.id, inv.id, weekStartIso);
        if (used >= cap) {
          metrics.skippedCap += 1;
          continue;
        }

        // pick channel (first reachable wins)
        const channels = pickChannels(rule);
        const chosen = channels.find((ch) => channelReachable(customer, ch));
        if (!chosen) {
          metrics.skippedNoChannel += 1;
          continue;
        }

        // build deterministic key per day (so reruns don’t duplicate)
        const key = messageKey(org.id, inv.id, rule.id, today);

        // build rendered text from template
        const tpl = await getTemplateForChannel(sb, org.id, rule.template_id, chosen);
        if (!tpl) continue;

        const vars = {
          customer_name: customer.name,
          invoice_number: inv.invoice_number,
          amount: inv.balance.toFixed(2),
          due_date: inv.due_date ?? "",
          pay_link: inv.pay_link_url ?? "",
          portal_link: `${process.env.PUBLIC_APP_URL ?? ""}/portal/${inv.portal_token}`,
          business_name: "", // optional: load org name if you want, or add to Org select
        };

        const body = renderTemplate(tpl.body, vars);

        // enqueue in message_log with unique message_key
        const ins = await sb.from("message_log").insert({
          org_id: org.id,
          customer_id: customer.id,
          invoice_id: inv.id,
          rule_id: rule.id,
          template_id: tpl.id,
          channel: chosen,
          status: "QUEUED",
          message_key: key,
          scheduled_for: new Date().toISOString(),
          provider_error: null,
          provider_message_id: null,
        });

        if (ins.error) {
          // if unique violation -> already enqueued (idempotency)
          if ((ins.error as any).code === "23505") {
            metrics.skippedIdempotent += 1;
            continue;
          }
          throw ins.error;
        }

        metrics.enqueued += 1;

        // event for activity feed
        await sb.from("events").insert({
          org_id: org.id,
          actor_user_id: null,
          event_type: "reminder_queued",
          entity_type: "invoice",
          entity_id: inv.id,
          meta: { invoice_number: inv.invoice_number, channel: chosen, rule_id: rule.id },
        });
      }
    }
  }

  return metrics;
}