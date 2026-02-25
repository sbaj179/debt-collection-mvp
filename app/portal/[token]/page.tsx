"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

interface PortalProps {
  params: { token: string };
}

type PublicInvoice = {
  invoice_id: string;
  org_id: string;
  customer_id: string;
  invoice_number: string;
  status: string;
  issue_date: string;
  due_date: string | null;
  currency: string;
  subtotal: number;
  vat: number;
  total: number;
  balance: number;
  pay_link_url: string | null;
  business_name: string;
  brand_logo_url: string | null;
  support_email: string | null;
  support_phone: string | null;
};

type PublicItem = {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  sort_order: number;
};

function moneyZAR(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return `R ${v.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function PortalPage({ params }: PortalProps) {
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return createClient(url, key);
  }, []);

  const token = params.token;

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [invoice, setInvoice] = useState<PublicInvoice | null>(null);
  const [items, setItems] = useState<PublicItem[]>([]);

  const [disputeMsg, setDisputeMsg] = useState("");
  const [disputeBusy, setDisputeBusy] = useState(false);
  const [disputeDone, setDisputeDone] = useState(false);

  async function load() {
    setErr(null);
    setLoading(true);

    try {
      // 1) Invoice header (via SECURITY DEFINER RPC)
      const invRes = await supabase
        .rpc("public_get_invoice_by_token", { p_token: token })
        .returns<PublicInvoice[]>();

      if (invRes.error) throw invRes.error;
const invData = invRes.data as unknown;

const inv =
  Array.isArray(invData) ? ((invData[0] as PublicInvoice) ?? null)
  : (invData as PublicInvoice | null);

if (!inv) {
  setInvoice(null);
  setItems([]);
  setErr("Invalid or expired invoice link.");
  return;
}
      setInvoice(inv);

      // 2) Line items (via SECURITY DEFINER RPC)
      const itemRes = await supabase
        .rpc("public_get_invoice_items_by_token", { p_token: token })
        .returns<PublicItem[]>();

      if (itemRes.error) throw itemRes.error;

      const itemData = itemRes.data as unknown;

const safeItems = Array.isArray(itemData) ? (itemData as PublicItem[]) : [];
setItems(safeItems);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load invoice.");
    } finally {
      setLoading(false);
    }
  }

  async function submitDispute() {
    setErr(null);
    setDisputeDone(false);
    setDisputeBusy(true);

    try {
      const msg = disputeMsg.trim();
      if (msg.length < 10) throw new Error("Please describe the issue (at least 10 characters).");

      const res = await supabase.rpc("public_open_dispute", { p_token: token, p_message: msg });
      if (res.error) throw res.error;

      setDisputeDone(true);
      setDisputeMsg("");
      // Optional: reload invoice to reflect DISPUTED/PAUSED status if your function updates it
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to submit dispute.");
    } finally {
      setDisputeBusy(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1rem" }}>
      <section className="panel" style={{ width: "min(720px, 100%)" }}>
        <h1>Invoice portal</h1>
        <p>Token: {params.token.slice(0, 8)}••••</p>
        <p>Branding, line items, amount due, pay link, POP upload, PDF, and dispute action live here.</p>

        {loading ? <p style={{ opacity: 0.75 }}>Loading…</p> : null}
        {err ? <p className="notice">{err}</p> : null}

        {!loading && invoice ? (
          <div style={{ marginTop: "1rem", display: "grid", gap: "0.9rem" }}>
            {/* Header block (keep the look simple, inside same panel) */}
            <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <div>
                  <b>{invoice.business_name}</b>
                  <div style={{ opacity: 0.8, fontSize: 13 }}>
                    Invoice: {invoice.invoice_number} • Status: {invoice.status}
                    {invoice.due_date ? ` • Due: ${invoice.due_date}` : ""}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ opacity: 0.8, fontSize: 13 }}>Amount due</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{moneyZAR(invoice.balance)}</div>
                </div>
              </div>

              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {invoice.pay_link_url ? (
                  <a className="btn primary" href={invoice.pay_link_url} target="_blank" rel="noreferrer">
                    Pay now
                  </a>
                ) : (
                  <span style={{ opacity: 0.75, fontSize: 13 }}>
                    Pay link not configured. Use EFT and upload POP (coming next).
                  </span>
                )}

                <span style={{ opacity: 0.75, fontSize: 13 }}>
                  Support: {invoice.support_email ?? "—"} {invoice.support_phone ? ` • ${invoice.support_phone}` : ""}
                </span>
              </div>
            </div>

            {/* Line items */}
            <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
              <h3 style={{ marginTop: 0 }}>Line items</h3>

              {items.length === 0 ? (
                <p style={{ opacity: 0.75 }}>No items found.</p>
              ) : (
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th align="left">Description</th>
                      <th align="right">Qty</th>
                      <th align="right">Unit</th>
                      <th align="right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.description}</td>
                        <td align="right">{it.quantity}</td>
                        <td align="right">{moneyZAR(it.unit_price)}</td>
                        <td align="right">{moneyZAR(it.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div style={{ marginTop: "0.8rem", display: "grid", gap: 6, maxWidth: 320, marginLeft: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.8 }}>Subtotal</span>
                  <span>{moneyZAR(invoice.subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ opacity: 0.8 }}>VAT</span>
                  <span>{moneyZAR(invoice.vat)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                  <span>Total</span>
                  <span>{moneyZAR(invoice.total)}</span>
                </div>
              </div>
            </div>

            {/* Dispute action */}
            <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
              <h3 style={{ marginTop: 0 }}>Dispute / question</h3>
              <p style={{ opacity: 0.75, marginTop: 6 }}>
                If something is wrong with this invoice, send a message. This will pause reminders.
              </p>

              <label className="field">
                <span>Message</span>
                <input
                  value={disputeMsg}
                  onChange={(e) => setDisputeMsg(e.target.value)}
                  placeholder="e.g., I already paid / amount incorrect / service not delivered..."
                />
              </label>

              <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button className="btn primary" onClick={submitDispute} disabled={disputeBusy}>
                  {disputeBusy ? "Sending…" : "Submit dispute"}
                </button>

                {disputeDone ? <span style={{ opacity: 0.85 }}>✅ Sent.</span> : null}
              </div>
            </div>

            {/* POP upload: placeholder for now (safe) */}
            <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
              <h3 style={{ marginTop: 0 }}>Proof of payment (POP)</h3>
              <p style={{ opacity: 0.75, marginTop: 6 }}>
                Next step: POP upload will create a PENDING payment and appear in your verification queue.
              </p>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}