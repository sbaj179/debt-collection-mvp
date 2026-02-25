"use client";

import { AppShell } from "@/components/AppShell";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type InvoiceRow = {
  id: string;
  invoice_number: string;
  due_date: string | null; // YYYY-MM-DD
  balance: number;
  status: string;
  customer: { name: string } | null;
};

type Bucket = {
  label: string;
  min: number;
  max: number | null;
  count: number;
  amount: number;
};

function getActiveOrgId(): string {
  const orgId = typeof window !== "undefined" ? localStorage.getItem("active_org_id") : null;
  if (!orgId) throw new Error("No active_org_id found. Sign in again.");
  return orgId;
}

function todayYmdZA(): string {
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

function parseYmdToUtcMidnight(ymd: string): Date {
  // Interpret YYYY-MM-DD as midnight UTC for diff math consistency
  // (We already got dates in ZA; this just avoids locale drift)
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

function daysBetweenYmd(a: string, b: string): number {
  // returns (a - b) in whole days
  const da = parseYmdToUtcMidnight(a).getTime();
  const db = parseYmdToUtcMidnight(b).getTime();
  return Math.floor((da - db) / (1000 * 60 * 60 * 24));
}

function moneyZAR(n: number): string {
  const v = Number.isFinite(n) ? n : 0;
  return `R ${v.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows
    .map((r) =>
      r
        .map((cell) => {
          const s = String(cell ?? "");
          const escaped = s.replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return createClient(url, key);
  }, []);

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [totalOutstanding, setTotalOutstanding] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  async function requireSession() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) router.push("/auth/signin");
  }

  function computeBuckets(rows: InvoiceRow[]) {
    const base: Bucket[] = [
      { label: "0–7 days", min: 0, max: 7, count: 0, amount: 0 },
      { label: "8–14 days", min: 8, max: 14, count: 0, amount: 0 },
      { label: "15–30 days", min: 15, max: 30, count: 0, amount: 0 },
      { label: "30+ days", min: 31, max: null, count: 0, amount: 0 },
    ];

    const today = todayYmdZA();

    for (const inv of rows) {
      if (!inv.due_date) continue;
      const overdueDays = Math.max(0, daysBetweenYmd(today, inv.due_date));

      const b = base.find((x) =>
        x.max === null ? overdueDays >= x.min : overdueDays >= x.min && overdueDays <= x.max
      );
      if (!b) continue;

      b.count += 1;
      b.amount += Number(inv.balance ?? 0);
    }

    return base;
  }

  function topOverdue(rows: InvoiceRow[]) {
    const today = todayYmdZA();
    return rows
      .filter((r) => r.due_date)
      .map((r) => ({
        ...r,
        overdueDays: Math.max(0, daysBetweenYmd(today, r.due_date as string)),
      }))
      .sort((a, b) => b.overdueDays - a.overdueDays)
      .slice(0, 10);
  }

  async function load() {
    setErr(null);
    setLoading(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();

      // Pull outstanding invoices only (tenant-scoped)
      const res = await supabase
        .from("invoices")
        .select(
          `
          id, invoice_number, due_date, balance, status,
          customer:customers ( name )
        `
        )
        .eq("org_id", orgId)
        .gt("balance", 0)
        .in("status", ["SENT", "OVERDUE", "PARTIALLY_PAID"])
        .order("due_date", { ascending: true })
        .limit(2000);

      if (res.error) throw res.error;

      // TS can be fussy with joined shapes; normalize safely
      const data = (res.data as unknown) as InvoiceRow[] | null;
      const rows = Array.isArray(data) ? data : [];

      setInvoices(rows);

      const totalAmt = rows.reduce((acc, r) => acc + Number(r.balance ?? 0), 0);
      setTotalOutstanding(totalAmt);
      setTotalCount(rows.length);

      const b = computeBuckets(rows);
      setBuckets(b);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const top10 = topOverdue(invoices);

  function exportBucketsCsv() {
    const rows: string[][] = [
      ["Bucket", "Count", "Amount (ZAR)"],
      ...buckets.map((b) => [b.label, String(b.count), String(b.amount.toFixed(2))]),
    ];
    downloadCsv(`aging-buckets-${todayYmdZA()}.csv`, rows);
  }

  function exportInvoicesCsv() {
    const today = todayYmdZA();
    const rows: string[][] = [
      ["Invoice", "Customer", "Status", "Due date", "Days overdue", "Balance (ZAR)"],
      ...invoices.map((i) => {
        const overdueDays = i.due_date ? Math.max(0, daysBetweenYmd(today, i.due_date)) : 0;
        return [
          i.invoice_number,
          i.customer?.name ?? "Unknown customer",
          i.status,
          i.due_date ?? "",
          String(overdueDays),
          String(Number(i.balance ?? 0).toFixed(2)),
        ];
      }),
    ];
    downloadCsv(`outstanding-invoices-${todayYmdZA()}.csv`, rows);
  }

  return (
    <AppShell title="Reports">
      <section className="panel">
        <h3>Aging buckets</h3>
        <p>0–7, 8–14, 15–30, 30+ days with CSV export-ready reporting endpoints.</p>

        {err ? <p className="notice">{err}</p> : null}
        {loading ? <p style={{ opacity: 0.75 }}>Loading…</p> : null}

        {!loading ? (
          <>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center", marginTop: "1rem" }}>
              <div style={{ opacity: 0.85 }}>
                <b>Outstanding:</b> {moneyZAR(totalOutstanding)} • <b>Invoices:</b> {totalCount}
              </div>

              <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button className="btn" type="button" onClick={exportBucketsCsv}>
                  Export buckets CSV
                </button>
                <button className="btn" type="button" onClick={exportInvoicesCsv}>
                  Export invoices CSV
                </button>
              </div>
            </div>

            <div className="panel" style={{ padding: "0.9rem", marginTop: "1rem", background: "rgba(0,0,0,0.18)" }}>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th align="left">Bucket</th>
                    <th align="right">Count</th>
                    <th align="right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {buckets.map((b) => (
                    <tr key={b.label}>
                      <td>{b.label}</td>
                      <td align="right">{b.count}</td>
                      <td align="right">{moneyZAR(b.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </section>

      <section className="panel" style={{ marginTop: "1rem" }}>
        <h3>Top overdue (top 10)</h3>
        <p style={{ opacity: 0.75 }}>The invoices most at risk. This is what you chase first.</p>

        {top10.length === 0 ? (
          <p style={{ opacity: 0.75 }}>No overdue invoices found.</p>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th align="left">Invoice</th>
                <th align="left">Customer</th>
                <th align="left">Due</th>
                <th align="right">Days overdue</th>
                <th align="right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((i: any) => (
                <tr key={i.id}>
                  <td>{i.invoice_number}</td>
                  <td>{i.customer?.name ?? "Unknown customer"}</td>
                  <td>{i.due_date ?? "-"}</td>
                  <td align="right">{i.overdueDays}</td>
                  <td align="right">{moneyZAR(i.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AppShell>
  );
}