"use client";

import { AppShell } from "@/components/AppShell";
import { StatsGrid } from "@/components/StatsGrid";
import { createClient } from "@supabase/supabase-js";
import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DueRow = [invoice: string, customer: string, amount: string];

type DbInvoice = {
  id: string;
  invoice_number: string;
  balance: number;
  total: number;
  customer_id: string;
};

type DbCustomer = {
  id: string;
  name: string;
};

type DbEvent = {
  id: string;
  event_type: string;
  entity_type: string | null;
  entity_id: string | null;
  meta: any; // jsonb
  created_at: string;
};

function formatZAR(value: number) {
  // Keep your existing “R 9,450” style
  const n = Number.isFinite(value) ? value : 0;
  return `R ${Math.round(n).toLocaleString("en-ZA")}`;
}

function formatTimeZA(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-ZA", {
    timeZone: "Africa/Johannesburg",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

function todayDateZA(): string {
  // Returns YYYY-MM-DD in Africa/Johannesburg
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const y = parts.find((p) => p.type === "year")?.value ?? "0000";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

export default function DashboardPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return createClient(url, key);
  }, []);

  const [dueToday, setDueToday] = useState<DueRow[]>([]);
  const [feed, setFeed] = useState<string[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setErr(null);

      // 1) Require auth session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.push("/auth/signin");
        return;
      }

      // 2) Require active org (multi-tenant)
      const orgId = localStorage.getItem("active_org_id");
      if (!orgId) {
        setErr("No active organization found. Please sign in again.");
        return;
      }

      const today = todayDateZA();

      // ==========================
      // Due today (top 10)
      // ==========================
      // Choose invoices that actually still need payment.
      const { data: invs, error: invErr } = await supabase
        .from("invoices")
        .select("id, invoice_number, balance, total, customer_id")
        .eq("org_id", orgId)
        .eq("due_date", today)
        .in("status", ["SENT", "OVERDUE", "PARTIALLY_PAID"])
        .gt("balance", 0)
        .order("balance", { ascending: false })
        .limit(10);

      if (invErr) {
        setErr(invErr.message);
        return;
      }

      const invoices = (invs ?? []) as DbInvoice[];
      const customerIds = Array.from(new Set(invoices.map((i) => i.customer_id)));

      let customerMap = new Map<string, string>();
      if (customerIds.length > 0) {
        const { data: custs, error: custErr } = await supabase
          .from("customers")
          .select("id, name")
          .eq("org_id", orgId)
          .in("id", customerIds);

        if (custErr) {
          setErr(custErr.message);
          return;
        }

        ((custs ?? []) as DbCustomer[]).forEach((c) => customerMap.set(c.id, c.name));
      }

      const dueRows: DueRow[] = invoices.map((i) => [
        i.invoice_number,
        customerMap.get(i.customer_id) ?? "Unknown customer",
        formatZAR(i.balance ?? i.total),
      ]);

      setDueToday(dueRows);

      // ==========================
      // Activity feed (latest 10)
      // ==========================
      const { data: events, error: evErr } = await supabase
        .from("events")
        .select("id, event_type, entity_type, entity_id, meta, created_at")
        .eq("org_id", orgId)
        .order("created_at", { ascending: false })
        .limit(10);

      if (evErr) {
        setErr(evErr.message);
        return;
      }

      const evs = (events ?? []) as DbEvent[];

      // Collect invoice IDs referenced by events so we can display invoice numbers
      const invoiceIds: string[] = [];
      for (const e of evs) {
        if (e.entity_type === "invoice" && e.entity_id) invoiceIds.push(e.entity_id);
        if (e.meta?.invoice_id) invoiceIds.push(e.meta.invoice_id);
      }

      const uniqueInvoiceIds = Array.from(new Set(invoiceIds)).filter(Boolean);

      let invoiceNoMap = new Map<string, string>();
      if (uniqueInvoiceIds.length > 0) {
        const { data: invRefs, error: invRefErr } = await supabase
          .from("invoices")
          .select("id, invoice_number")
          .eq("org_id", orgId)
          .in("id", uniqueInvoiceIds);

        if (!invRefErr && invRefs) {
          for (const r of invRefs as any[]) {
            invoiceNoMap.set(r.id, r.invoice_number);
          }
        }
      }

      const lines = evs.map((e) => {
        const time = formatTimeZA(e.created_at);

        const rawInvoiceId = (e.entity_type === "invoice" ? e.entity_id : null) ?? e.meta?.invoice_id ?? null;
        const invNo = rawInvoiceId ? invoiceNoMap.get(rawInvoiceId) : null;

        const ref = invNo ? invNo : rawInvoiceId ? String(rawInvoiceId).slice(0, 8) : "—";

        const channel =
          e.meta?.channel ? ` via ${String(e.meta.channel).toUpperCase()}` :
          e.meta?.provider ? ` via ${String(e.meta.provider)}` :
          "";

        const amount =
          typeof e.meta?.amount === "number" ? ` · ${formatZAR(e.meta.amount)}` : "";

        const note =
          e.meta?.status ? ` · ${String(e.meta.status)}` :
          e.meta?.note ? ` · ${String(e.meta.note)}` :
          "";

        return `${e.event_type} · ${ref}${channel}${amount}${note} · ${time}`;
      });

      setFeed(lines);
    };

    run().catch((e) => setErr(e?.message ?? "Dashboard failed to load."));
  }, [router, supabase]);

  return (
    <AppShell title="Dashboard">
      <StatsGrid />

      {err ? (
        <section className="panel" style={{ marginTop: "1rem" }}>
          <h3>Dashboard error</h3>
          <p style={{ opacity: 0.85 }}>{err}</p>
        </section>
      ) : null}

      <section className="panel" style={{ marginTop: "1rem" }}>
        <h3>Due today (top 10)</h3>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th align="left">Invoice</th>
              <th align="left">Customer</th>
              <th align="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {dueToday.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ opacity: 0.75, paddingTop: 8 }}>
                  No invoices due today.
                </td>
              </tr>
            ) : (
              dueToday.map(([invoice, customer, amount]) => (
                <tr key={invoice}>
                  <td>{invoice}</td>
                  <td>{customer}</td>
                  <td align="right">{amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="panel" style={{ marginTop: "1rem" }}>
        <h3>Activity feed</h3>
        <ul>
          {feed.length === 0 ? (
            <li style={{ opacity: 0.75 }}>No recent activity.</li>
          ) : (
            feed.map((line, idx) => <li key={idx}>{line}</li>)
          )}
        </ul>
      </section>
    </AppShell>
  );
}