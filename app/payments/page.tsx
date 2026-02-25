"use client";

import { AppShell } from "@/components/AppShell";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PaymentMethod = "PAYLINK" | "EFT" | "CASH" | "OTHER";
type PaymentStatus = "PENDING" | "CONFIRMED" | "REJECTED" | "REFUNDED";
type Channel = "WHATSAPP" | "SMS" | "EMAIL";

type QueueRow = {
  id: string;
  org_id: string;
  invoice_id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  reference: string | null;
  created_at: string;
  paid_at: string | null;

  invoice: {
    id: string;
    invoice_number: string;
    customer: {
      id: string;
      name: string;
      phone: string | null;
      email: string | null;
      preferred_channel?: Channel;
    } | null;
  } | null;

  proof_uploads: Array<{
    id: string;
    storage_bucket: string;
    storage_path: string;
    file_mime: string | null;
    file_size_bytes: number | null;
    uploaded_at: string;
  }> | null;
};

type ConfirmedRow = {
  id: string;
  amount: number;
  paid_at: string | null;
  created_at: string;
  method: PaymentMethod;

  invoice: {
    invoice_number: string;
    customer: { id: string; name: string } | null;
  } | null;
};

function formatZAR(value: number) {
  const n = Number.isFinite(value) ? value : 0;
  return `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

function formatDateZA(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-ZA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function getActiveOrgId(): string {
  const orgId = typeof window !== "undefined" ? localStorage.getItem("active_org_id") : null;
  if (!orgId) throw new Error("No active_org_id found. Sign in again.");
  return orgId;
}

export default function PaymentsPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return createClient(url, key);
  }, []);

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [queue, setQueue] = useState<QueueRow[]>([]);
  const [confirmed, setConfirmed] = useState<ConfirmedRow[]>([]);

  const [selected, setSelected] = useState<QueueRow | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [decisionNote, setDecisionNote] = useState("");
  const [actionBusy, setActionBusy] = useState(false);

  async function requireSession() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) router.push("/auth/signin");
  }

  async function loadAll() {
    setErr(null);
    setLoading(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();

      // 1) Pending queue (POP verification)
      const qRes = await supabase
        .from("payments")
        .select(
          `
          id, org_id, invoice_id, amount, method, status, reference, created_at, paid_at,
          invoice:invoices (
            id, invoice_number,
            customer:customers ( id, name, phone, email )
          ),
          proof_uploads ( id, storage_bucket, storage_path, file_mime, file_size_bytes, uploaded_at )
        `
        )
        .eq("org_id", orgId)
        .eq("status", "PENDING")
        .order("created_at", { ascending: false })
        .limit(50)
        .returns<QueueRow[]>();

      if (qRes.error) throw qRes.error;

      // Normalize: newest POP first (if present)
      const normalizedQueue = (qRes.data ?? []).map((p) => {
        const uploads = (p.proof_uploads ?? []).slice().sort((a, b) =>
          a.uploaded_at < b.uploaded_at ? 1 : -1
        );
        return { ...p, proof_uploads: uploads };
      });

      setQueue(normalizedQueue);

      // 2) Recent confirmed payments (for totals)
      const cRes = await supabase
        .from("payments")
        .select(
          `
          id, amount, paid_at, created_at, method,
          invoice:invoices (
            invoice_number,
            customer:customers ( id, name )
          )
        `
        )
        .eq("org_id", orgId)
        .eq("status", "CONFIRMED")
        .order("paid_at", { ascending: false })
        .limit(200)
        .returns<ConfirmedRow[]>();

      if (cRes.error) throw cRes.error;

      setConfirmed(cRes.data ?? []);

      // Keep selection if still present
      if (selected) {
        const still = normalizedQueue.find((x) => x.id === selected.id) ?? null;
        setSelected(still);
        setPreviewUrl(null);
        setDecisionNote("");
      }
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load payments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function openLatestPop(payment: QueueRow) {
    setErr(null);
    setPreviewUrl(null);

    try {
      const orgId = getActiveOrgId();
      if (payment.org_id !== orgId) throw new Error("Org mismatch.");

      const latest = payment.proof_uploads?.[0];
      if (!latest) throw new Error("No proof upload found for this payment.");

      const { data, error } = await supabase.storage
        .from(latest.storage_bucket)
        .createSignedUrl(latest.storage_path, 60 * 10);

      if (error) throw error;
      setPreviewUrl(data.signedUrl);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to open POP.");
    }
  }

  async function confirmPayment(payment: QueueRow) {
    setErr(null);
    setActionBusy(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();
      if (payment.org_id !== orgId) throw new Error("Org mismatch.");

      const uRes = await supabase
        .from("payments")
        .update({ status: "CONFIRMED", paid_at: new Date().toISOString() })
        .eq("org_id", orgId)
        .eq("id", payment.id);

      if (uRes.error) throw uRes.error;

      await supabase.from("events").insert({
        org_id: orgId,
        event_type: "payment_confirmed",
        entity_type: "payment",
        entity_id: payment.id,
        meta: {
          invoice_id: payment.invoice_id,
          invoice_number: payment.invoice?.invoice_number ?? null,
          customer_name: payment.invoice?.customer?.name ?? null,
          amount: payment.amount,
          method: payment.method,
          note: decisionNote.trim() || null,
        },
      });

      await loadAll();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to confirm payment.");
    } finally {
      setActionBusy(false);
    }
  }

  async function rejectPayment(payment: QueueRow) {
    setErr(null);
    setActionBusy(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();
      if (payment.org_id !== orgId) throw new Error("Org mismatch.");

      const reason = decisionNote.trim();
      if (!reason) throw new Error("Add a rejection reason (short).");

      const uRes = await supabase
        .from("payments")
        .update({ status: "REJECTED" })
        .eq("org_id", orgId)
        .eq("id", payment.id);

      if (uRes.error) throw uRes.error;

      await supabase.from("events").insert({
        org_id: orgId,
        event_type: "payment_rejected",
        entity_type: "payment",
        entity_id: payment.id,
        meta: {
          invoice_id: payment.invoice_id,
          invoice_number: payment.invoice?.invoice_number ?? null,
          customer_name: payment.invoice?.customer?.name ?? null,
          amount: payment.amount,
          method: payment.method,
          reason,
        },
      });

      // Later enhancement: enqueue a "POP Rejected" message in message_log here.

      await loadAll();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to reject payment.");
    } finally {
      setActionBusy(false);
    }
  }

  // Totals by customer from CONFIRMED payments (tenant scoped already)
  const totalsByCustomer = (() => {
    const map = new Map<string, { name: string; total: number; count: number }>();

    for (const p of confirmed) {
      const c = p.invoice?.customer;
      if (!c?.id) continue;

      const cur = map.get(c.id) ?? { name: c.name, total: 0, count: 0 };
      cur.total += Number(p.amount ?? 0);
      cur.count += 1;
      map.set(c.id, cur);
    }

    return Array.from(map.values()).sort((a, b) => b.total - a.total).slice(0, 12);
  })();

  return (
    <AppShell title="Payments + POP Verification">
      <section className="panel">
        <h3>Pending verification queue</h3>
        <p>Review POP image/PDF, confirm/reject with reason, and auto-message on rejection.</p>

        {err ? <p className="notice">{err}</p> : null}
        {loading ? <p style={{ opacity: 0.75 }}>Loading…</p> : null}

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1rem", marginTop: "1rem" }}>
          {/* LEFT: Queue */}
          <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
            <h4 style={{ marginTop: 0 }}>Queue</h4>

            {queue.length === 0 ? (
              <p style={{ opacity: 0.75 }}>No pending POPs right now.</p>
            ) : (
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th align="left">Invoice</th>
                    <th align="left">Customer</th>
                    <th align="right">Amount</th>
                    <th align="left">Uploaded</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((p) => {
                    const invNo = p.invoice?.invoice_number ?? "—";
                    const cust = p.invoice?.customer?.name ?? "Unknown customer";
                    const uploadedAt = p.proof_uploads?.[0]?.uploaded_at ?? p.created_at;

                    return (
                      <tr
                        key={p.id}
                        style={{ cursor: "pointer", opacity: selected?.id === p.id ? 1 : 0.92 }}
                        onClick={() => {
                          setSelected(p);
                          setPreviewUrl(null);
                          setDecisionNote("");
                        }}
                      >
                        <td>{invNo}</td>
                        <td>{cust}</td>
                        <td align="right">{formatZAR(p.amount)}</td>
                        <td>
                          {formatDateZA(uploadedAt)} {formatTimeZA(uploadedAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* RIGHT: Review */}
          <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
            <h4 style={{ marginTop: 0 }}>Review</h4>

            {!selected ? (
              <p style={{ opacity: 0.75 }}>Select a payment from the queue to review the POP.</p>
            ) : (
              <>
                <div style={{ display: "grid", gap: 6, fontSize: 13, opacity: 0.9 }}>
                  <div>
                    <b>Invoice:</b> {selected.invoice?.invoice_number ?? "—"}
                  </div>
                  <div>
                    <b>Customer:</b> {selected.invoice?.customer?.name ?? "—"}
                  </div>
                  <div>
                    <b>Amount:</b> {formatZAR(selected.amount)}
                  </div>
                  <div>
                    <b>Method:</b> {selected.method}
                  </div>
                  <div>
                    <b>Reference:</b> {selected.reference ?? "—"}
                  </div>
                </div>

                <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button className="btn" type="button" onClick={() => openLatestPop(selected)}>
                    Open POP
                  </button>

                  <button className="btn primary" type="button" onClick={() => confirmPayment(selected)} disabled={actionBusy}>
                    {actionBusy ? "Working…" : "Confirm"}
                  </button>

                  <button className="btn" type="button" onClick={() => rejectPayment(selected)} disabled={actionBusy}>
                    {actionBusy ? "Working…" : "Reject"}
                  </button>
                </div>

                <div style={{ marginTop: "0.8rem" }}>
                  <label className="field">
                    <span>Note / rejection reason</span>
                    <input
                      value={decisionNote}
                      onChange={(e) => setDecisionNote(e.target.value)}
                      placeholder="e.g., amount mismatch / unclear image / wrong reference"
                    />
                  </label>
                </div>

                <div style={{ marginTop: "0.8rem" }}>
                  {previewUrl ? (
                    <div className="panel" style={{ padding: "0.75rem", background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                        <b>POP Preview</b>
                        <a href={previewUrl} target="_blank" rel="noreferrer" style={{ opacity: 0.85 }}>
                          Open in new tab
                        </a>
                      </div>
                      <p style={{ opacity: 0.75, fontSize: 13, marginTop: 6 }}>
                        If your browser can display it inline, it will. Otherwise use “Open in new tab”.
                      </p>
                      <iframe
                        src={previewUrl}
                        style={{
                          width: "100%",
                          height: 360,
                          border: "1px solid rgba(255,255,255,0.10)",
                          borderRadius: 12,
                        }}
                        title="POP Preview"
                      />
                    </div>
                  ) : (
                    <p style={{ opacity: 0.75, fontSize: 13 }}>No POP preview loaded.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="panel" style={{ marginTop: "1rem" }}>
        <h3>Amount received (by customer)</h3>
        <p style={{ opacity: 0.75 }}>
          Calculated from CONFIRMED payments inside your tenant (org_id). We can add date filters and exports later.
        </p>

        {totalsByCustomer.length === 0 ? (
          <p style={{ opacity: 0.75 }}>No confirmed payments yet.</p>
        ) : (
          <table style={{ width: "100%", marginTop: "0.75rem" }}>
            <thead>
              <tr>
                <th align="left">Customer</th>
                <th align="right">Total received</th>
                <th align="right">Payments</th>
              </tr>
            </thead>
            <tbody>
              {totalsByCustomer.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.name}</td>
                  <td align="right">{formatZAR(c.total)}</td>
                  <td align="right">{c.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AppShell>
  );
}