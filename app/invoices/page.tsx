"use client";

import { AppShell } from "@/components/AppShell";
import { toUserError } from "@/lib/errors";
import {
  createInvoiceWithItems,
  listInvoicePageData,
  type CustomerLite,
  type InvoiceListRow,
} from "@/lib/invoices/service";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type ItemDraft = { description: string; quantity: string; unitPrice: string };

function parseNum(value: string): number {
  const num = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(num) ? num : 0;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function formatMoney(n: number): string {
  return `R ${n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-ZA", { year: "numeric", month: "short", day: "2-digit" });
}

export default function InvoicesPage() {
  const supabase = useMemo(getSupabaseBrowserClient, []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const [customers, setCustomers] = useState<CustomerLite[]>([]);
  const [recent, setRecent] = useState<InvoiceListRow[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);

  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [vatEnabled, setVatEnabled] = useState(false);
  const [vatRate, setVatRate] = useState("15");
  const [items, setItems] = useState<ItemDraft[]>([{ description: "", quantity: "1", unitPrice: "0" }]);

  const currency = "ZAR";

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter((c) =>
      [c.name, c.phone ?? "", c.email ?? ""].some((value) => value.toLowerCase().includes(query))
    );
  }, [customers, search]);

  const selectedCustomer = useMemo(
    () => customers.find((customer) => customer.id === customerId) ?? null,
    [customers, customerId]
  );

  const cleanItems = useMemo(() => {
    return items
      .map((item) => {
        const description = item.description.trim();
        const quantity = parseNum(item.quantity);
        const unitPrice = round2(parseNum(item.unitPrice));
        return {
          description,
          quantity,
          unitPrice,
          amount: round2(quantity * unitPrice),
          valid: Boolean(description) && quantity > 0 && unitPrice >= 0,
        };
      })
      .filter((item) => item.valid);
  }, [items]);

  const totals = useMemo(() => {
    const subtotal = round2(cleanItems.reduce((sum, item) => sum + item.amount, 0));
    const vat = vatEnabled ? round2(subtotal * (Math.max(0, parseNum(vatRate)) / 100)) : 0;
    const total = round2(subtotal + vat);
    return { subtotal, vat, total };
  }, [cleanItems, vatEnabled, vatRate]);

  const formErrors = useMemo(() => {
    const errs: string[] = [];
    if (!customerId) errs.push("Customer is required.");
    if (!dueDate) errs.push("Due date is required.");
    if (cleanItems.length === 0) errs.push("At least one valid line item is required.");
    if (vatEnabled && parseNum(vatRate) < 0) errs.push("VAT rate cannot be negative.");
    return errs;
  }, [cleanItems.length, customerId, dueDate, vatEnabled, vatRate]);

  const canSaveDraft = formErrors.length === 0;
  const canSaveSend = canSaveDraft && Boolean(selectedCustomer?.phone);

  const metrics = useMemo(
    () => ({
      customers: customers.length,
      drafts: recent.filter((r) => r.status.toUpperCase() === "DRAFT").length,
      sentActive: recent.filter((r) => ["SENT", "PARTIALLY_PAID", "OVERDUE"].includes(r.status.toUpperCase())).length,
      outstanding: round2(recent.reduce((sum, r) => sum + Number(r.balance ?? 0), 0)),
      disputes: recent.reduce((sum, r) => sum + Number(r.disputeCount ?? 0), 0),
    }),
    [customers.length, recent]
  );

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const pageData = await listInvoicePageData(supabase);
      setCustomers(pageData.customers);
      setRecent(pageData.recentInvoices);
    } catch (err) {
      setError(toUserError(err, "Failed to load invoices."));
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  function resetBuilder() {
    setSearch("");
    setCustomerId("");
    setDueDate("");
    setVatEnabled(false);
    setVatRate("15");
    setItems([{ description: "", quantity: "1", unitPrice: "0" }]);
  }

  async function save(mode: "DRAFT" | "SENT") {
    setError(null);
    setInfo(null);

    if (mode === "DRAFT" && !canSaveDraft) {
      setError(formErrors[0] ?? "Please complete required fields.");
      return;
    }
    if (mode === "SENT" && !canSaveSend) {
      setError(selectedCustomer?.phone ? "Please complete required fields." : "Customer phone is required for SMS send.");
      return;
    }

    setSaving(true);
    try {
      const result = await createInvoiceWithItems(supabase, {
        customerId,
        dueDate,
        mode,
        currency,
        subtotal: totals.subtotal,
        vat: totals.vat,
        total: totals.total,
        items: cleanItems.map((i) => ({
          description: i.description,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          amount: i.amount,
        })),
      });

      if (mode === "SENT" && result.smsResult && !result.smsResult.queued) {
        setInfo(`Invoice ${result.invoiceNumber} saved and marked sent, but SMS was not queued: ${result.smsResult.reason}`);
      } else {
        setInfo(mode === "SENT" ? `Invoice sent: ${result.invoiceNumber}` : `Draft saved: ${result.invoiceNumber}`);
      }

      resetBuilder();
      setShowBuilder(false);
      await load();
    } catch (err) {
      setError(toUserError(err, "Failed to save invoice."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell title="Invoices">
      <section className="panel">
        <div className={styles.wrapper}>
          <div className={styles.headerRow}>
            <div>
              <h3 style={{ margin: 0 }}>Invoices</h3>
              <p style={{ opacity: 0.8, margin: "0.35rem 0 0" }}>Tenant-safe invoice creation with strict validation and org-scoped reads.</p>
            </div>
            <div className={styles.actions}>
              <button className="btn" onClick={load} disabled={loading || saving}>{loading ? "Refreshing..." : "Refresh"}</button>
              <button className="btn primary" onClick={() => setShowBuilder((v) => !v)} disabled={saving}>{showBuilder ? "Close" : "Create invoice"}</button>
            </div>
          </div>

          {error ? <div className={styles.card} style={{ borderColor: "rgba(239,68,68,0.4)" }}>{error}</div> : null}
          {info ? <div className={styles.card} style={{ borderColor: "rgba(59,130,246,0.4)" }}>{info}</div> : null}

          <div className={styles.metrics}>
            <div className={styles.card}><small>Clients</small><h3 style={{ margin: "0.2rem 0 0" }}>{metrics.customers}</h3></div>
            <div className={styles.card}><small>Drafts</small><h3 style={{ margin: "0.2rem 0 0" }}>{metrics.drafts}</h3></div>
            <div className={styles.card}><small>Sent / active</small><h3 style={{ margin: "0.2rem 0 0" }}>{metrics.sentActive}</h3></div>
            <div className={styles.card}><small>Outstanding</small><h3 style={{ margin: "0.2rem 0 0" }}>{formatMoney(metrics.outstanding)}</h3></div>
            <div className={styles.card}><small>Disputes</small><h3 style={{ margin: "0.2rem 0 0" }}>{metrics.disputes}</h3></div>
          </div>

          {showBuilder ? (
            <div className={styles.builderGrid}>
              <div className={styles.card}>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Search customers</label>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name / phone / email" />
                  </div>

                  <div className={styles.field}>
                    <label>Customer * ({filteredCustomers.length} shown / {customers.length} total)</label>
                    <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                      <option value="">Select customer...</option>
                      {filteredCustomers.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.name}{customer.phone ? ` • ${customer.phone}` : ""}</option>
                      ))}
                    </select>
                    {!customerId ? <span className={styles.fieldError}>Customer is required.</span> : null}
                  </div>

                  <div className={styles.searchList}>
                    {filteredCustomers.slice(0, 20).map((customer) => (
                      <button key={customer.id} type="button" className={styles.searchItem} onClick={() => setCustomerId(customer.id)}>
                        <b>{customer.name}</b><br />
                        <small>{customer.phone || customer.email || "No contact details"}</small>
                      </button>
                    ))}
                  </div>

                  <div className={styles.inlineGrid}>
                    <div className={styles.field}>
                      <label>Due date *</label>
                      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>Currency</label>
                      <input value={currency} readOnly />
                    </div>
                    <div className={styles.field}>
                      <label>VAT rate (%)</label>
                      <input value={vatRate} onChange={(e) => setVatRate(e.target.value)} disabled={!vatEnabled} />
                    </div>
                  </div>

                  <label><input type="checkbox" checked={vatEnabled} onChange={(e) => setVatEnabled(e.target.checked)} /> Include VAT</label>

                  <div className={styles.fieldGrid}>
                    {items.map((item, index) => (
                      <div key={index} className={styles.itemRow}>
                        <div className={styles.field}><label>Description *</label><input value={item.description} onChange={(e) => setItems((prev) => prev.map((row, i) => (i === index ? { ...row, description: e.target.value } : row)))} /></div>
                        <div className={styles.field}><label>Qty *</label><input value={item.quantity} onChange={(e) => setItems((prev) => prev.map((row, i) => (i === index ? { ...row, quantity: e.target.value } : row)))} /></div>
                        <div className={styles.field}><label>Unit price *</label><input value={item.unitPrice} onChange={(e) => setItems((prev) => prev.map((row, i) => (i === index ? { ...row, unitPrice: e.target.value } : row)))} /></div>
                        <button type="button" className="btn" onClick={() => setItems((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== index))}>Remove</button>
                      </div>
                    ))}
                    <button type="button" className="btn" onClick={() => setItems((prev) => [...prev, { description: "", quantity: "1", unitPrice: "0" }])}>+ Add line</button>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <h4 style={{ marginTop: 0 }}>Summary & actions</h4>
                {selectedCustomer ? (
                  <div className={styles.card}>
                    <b>{selectedCustomer.name}</b>
                    <div style={{ fontSize: 13, opacity: 0.8 }}>{selectedCustomer.phone || "No phone"}</div>
                    <div style={{ fontSize: 13, opacity: 0.8 }}>{selectedCustomer.email || "No email"}</div>
                  </div>
                ) : <div className={styles.card}>No customer selected.</div>}

                <div className={styles.card}>
                  <div className={styles.totalsRow}><span>Subtotal</span><b>{formatMoney(totals.subtotal)}</b></div>
                  <div className={styles.totalsRow}><span>VAT</span><b>{formatMoney(totals.vat)}</b></div>
                  <div className={styles.totalsRow}><span>Total</span><b>{formatMoney(totals.total)}</b></div>
                </div>

                {formErrors.length > 0 ? (
                  <div className={styles.card} style={{ borderColor: "rgba(245,158,11,0.4)" }}>
                    <b>Validation</b>
                    <ul>{formErrors.map((msg) => <li key={msg}>{msg}</li>)}</ul>
                  </div>
                ) : null}

                <div className={styles.actions}>
                  <button className="btn" onClick={() => void save("DRAFT")} disabled={saving || !canSaveDraft}>Save draft</button>
                  <button className="btn primary" onClick={() => void save("SENT")} disabled={saving || !canSaveSend}>Save & send</button>
                </div>
              </div>
            </div>
          ) : null}

          <div className={styles.card}>
            <h4 style={{ marginTop: 0 }}>Recent invoices</h4>
            <table className={styles.recentTable}>
              <thead><tr><th>Invoice</th><th>Status</th><th>Due</th><th>Total</th><th>Balance</th><th>Disputes</th></tr></thead>
              <tbody>
                {recent.map((row) => (
                  <tr key={row.id}>
                    <td>{row.invoice_number}</td><td>{row.status}</td><td>{formatDate(row.due_date)}</td>
                    <td>{formatMoney(Number(row.total ?? 0))}</td><td>{formatMoney(Number(row.balance ?? 0))}</td><td>{row.disputeCount}</td>
                  </tr>
                ))}
                {recent.length === 0 ? <tr><td colSpan={6}>No invoices yet.</td></tr> : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
