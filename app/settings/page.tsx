"use client";

import { AppShell } from "@/components/AppShell";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Org = {
  id: string;
  name: string;
  timezone: string;
  brand_logo_url: string | null;
  brand_primary_color: string | null;
  support_email: string | null;
  support_phone: string | null;

  payment_mode: string; // 'PAYLINK' | 'MANUAL_EFT' (stored as text)
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
  bank_branch_code: string | null;
  bank_reference_prefix: string | null;

  receipt_footer: string | null;

  quiet_hours_start: string; // 'HH:MM:SS' or 'HH:MM'
  quiet_hours_end: string;
  max_reminders_per_week: number;
};

type Membership = { role: "ADMIN" | "ADMIN_STAFF" };

function getActiveOrgId(): string {
  const orgId = typeof window !== "undefined" ? localStorage.getItem("active_org_id") : null;
  if (!orgId) throw new Error("No active_org_id found. Sign in again.");
  return orgId;
}

export default function SettingsPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return createClient(url, key);
  }, []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const [org, setOrg] = useState<Org | null>(null);
  const [canEdit, setCanEdit] = useState(false);

  // Form state (keep it explicit and boring = reliable)
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("Africa/Johannesburg");
  const [brandLogoUrl, setBrandLogoUrl] = useState("");
  const [brandColor, setBrandColor] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportPhone, setSupportPhone] = useState("");

  const [paymentMode, setPaymentMode] = useState<"PAYLINK" | "MANUAL_EFT">("MANUAL_EFT");
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankBranchCode, setBankBranchCode] = useState("");
  const [bankRefPrefix, setBankRefPrefix] = useState("INV");

  const [receiptFooter, setReceiptFooter] = useState("");

  const [quietStart, setQuietStart] = useState("20:00");
  const [quietEnd, setQuietEnd] = useState("07:00");
  const [maxPerWeek, setMaxPerWeek] = useState("5");

  async function requireSession() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) router.push("/auth/signin");
  }

  function hydrateForm(o: Org) {
    setName(o.name ?? "");
    setTimezone(o.timezone ?? "Africa/Johannesburg");
    setBrandLogoUrl(o.brand_logo_url ?? "");
    setBrandColor(o.brand_primary_color ?? "");
    setSupportEmail(o.support_email ?? "");
    setSupportPhone(o.support_phone ?? "");

    setPaymentMode((o.payment_mode === "PAYLINK" ? "PAYLINK" : "MANUAL_EFT") as any);
    setBankName(o.bank_name ?? "");
    setBankAccountName(o.bank_account_name ?? "");
    setBankAccountNumber(o.bank_account_number ?? "");
    setBankBranchCode(o.bank_branch_code ?? "");
    setBankRefPrefix(o.bank_reference_prefix ?? "INV");

    setReceiptFooter(o.receipt_footer ?? "");

    // Supabase may return "20:00:00" → normalize to "20:00"
    setQuietStart((o.quiet_hours_start ?? "20:00").slice(0, 5));
    setQuietEnd((o.quiet_hours_end ?? "07:00").slice(0, 5));
    setMaxPerWeek(String(o.max_reminders_per_week ?? 5));
  }

  async function load() {
    setErr(null);
    setOk(null);
    setLoading(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();

      // Determine role → only ADMIN can edit org settings
      const mRes = await supabase
        .from("org_memberships")
        .select("role")
        .eq("org_id", orgId)
        .limit(1)
        .single();

      if (mRes.error) throw mRes.error;

      const role = (mRes.data as Membership).role;
      setCanEdit(role === "ADMIN");

      const oRes = await supabase
        .from("organizations")
        .select(
          "id,name,timezone,brand_logo_url,brand_primary_color,support_email,support_phone,payment_mode,bank_name,bank_account_name,bank_account_number,bank_branch_code,bank_reference_prefix,receipt_footer,quiet_hours_start,quiet_hours_end,max_reminders_per_week"
        )
        .eq("id", orgId)
        .single();

      if (oRes.error) throw oRes.error;

      const o = oRes.data as unknown as Org;
      setOrg(o);
      hydrateForm(o);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    setErr(null);
    setOk(null);
    setSaving(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();

      if (!canEdit) throw new Error("Only an ADMIN can change organization settings.");
      if (!name.trim()) throw new Error("Organization name is required.");

      const maxN = Number(maxPerWeek);
      if (!Number.isFinite(maxN) || maxN < 0 || maxN > 50) {
        throw new Error("Max reminders per week must be between 0 and 50.");
      }

      const payload: Partial<Org> = {
        name: name.trim(),
        timezone: timezone.trim() || "Africa/Johannesburg",
        brand_logo_url: brandLogoUrl.trim() || null,
        brand_primary_color: brandColor.trim() || null,
        support_email: supportEmail.trim() || null,
        support_phone: supportPhone.trim() || null,

        payment_mode: paymentMode,
        bank_reference_prefix: bankRefPrefix.trim() || "INV",
        receipt_footer: receiptFooter.trim() || null,

        quiet_hours_start: quietStart.length === 5 ? `${quietStart}:00` : quietStart,
        quiet_hours_end: quietEnd.length === 5 ? `${quietEnd}:00` : quietEnd,
        max_reminders_per_week: maxN,
      };

      // Only store bank details if MANUAL_EFT
      if (paymentMode === "MANUAL_EFT") {
        payload.bank_name = bankName.trim() || null;
        payload.bank_account_name = bankAccountName.trim() || null;
        payload.bank_account_number = bankAccountNumber.trim() || null;
        payload.bank_branch_code = bankBranchCode.trim() || null;
      } else {
        // PAYLINK mode: bank fields optional (clear them if you want strictness)
        payload.bank_name = null;
        payload.bank_account_name = null;
        payload.bank_account_number = null;
        payload.bank_branch_code = null;
      }

      const res = await supabase.from("organizations").update(payload).eq("id", orgId);
      if (res.error) throw res.error;

      setOk("Saved ✅");
      await load(); // reload to keep form synced
    } catch (e: any) {
      setErr(e?.message ?? "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  async function reseedDefaults() {
    setErr(null);
    setOk(null);
    setSaving(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();
      if (!canEdit) throw new Error("Only an ADMIN can reseed defaults.");

      const res = await supabase.rpc("seed_org_defaults", { p_org_id: orgId });
      if (res.error) throw res.error;

      setOk("Default templates + rules reseeded ✅");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to reseed defaults.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell title="Settings">
      <section className="panel">
        <h3>Organization settings</h3>
        <p>These settings are tenant-wide (org-level). They affect the portal, invoicing rules, and reminder automations.</p>

        {loading ? <p style={{ opacity: 0.75 }}>Loading…</p> : null}
        {err ? <p className="notice">{err}</p> : null}
        {ok ? <p className="notice">{ok}</p> : null}

        {!loading && org ? (
          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            {/* Branding */}
            <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
              <h4 style={{ marginTop: 0 }}>Branding + Support</h4>

              <div className="form" style={{ gap: "0.75rem" }}>
                <label className="field">
                  <span>Organization name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} disabled={!canEdit} />
                </label>

                <label className="field">
                  <span>Timezone</span>
                  <input value={timezone} onChange={(e) => setTimezone(e.target.value)} disabled={!canEdit} />
                </label>

                <label className="field">
                  <span>Logo URL (optional)</span>
                  <input value={brandLogoUrl} onChange={(e) => setBrandLogoUrl(e.target.value)} disabled={!canEdit} />
                </label>

                <label className="field">
                  <span>Primary color (optional)</span>
                  <input value={brandColor} onChange={(e) => setBrandColor(e.target.value)} placeholder="#ff4fa3" disabled={!canEdit} />
                </label>

                <label className="field">
                  <span>Support email</span>
                  <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} disabled={!canEdit} />
                </label>

                <label className="field">
                  <span>Support phone</span>
                  <input value={supportPhone} onChange={(e) => setSupportPhone(e.target.value)} disabled={!canEdit} />
                </label>

                <p style={{ opacity: 0.75, marginTop: 0 }}>
                  Used on the invoice portal so customers know who they are paying and how to contact you.
                </p>
              </div>
            </div>

            {/* Payments */}
            <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
              <h4 style={{ marginTop: 0 }}>Payments</h4>

              <div className="form" style={{ gap: "0.75rem" }}>
                <label className="field">
                  <span>Payment mode</span>
                  <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value as any)} disabled={!canEdit}>
                    <option value="MANUAL_EFT">Manual EFT + POP</option>
                    <option value="PAYLINK">Pay Link (provider)</option>
                  </select>
                </label>

                {paymentMode === "MANUAL_EFT" ? (
                  <>
                    <label className="field"><span>Bank name</span><input value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={!canEdit} /></label>
                    <label className="field"><span>Account name</span><input value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} disabled={!canEdit} /></label>
                    <label className="field"><span>Account number</span><input value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} disabled={!canEdit} /></label>
                    <label className="field"><span>Branch code</span><input value={bankBranchCode} onChange={(e) => setBankBranchCode(e.target.value)} disabled={!canEdit} /></label>
                    <p style={{ opacity: 0.75, marginTop: 0 }}>
                      When MANUAL EFT is enabled, the portal will show EFT instructions and allow POP uploads.
                    </p>
                  </>
                ) : (
                  <p style={{ opacity: 0.75 }}>
                    PAYLINK mode assumes you’ll generate `invoices.pay_link_url` when sending invoices (via provider integration / webhook).
                    We do NOT store provider secret keys here (security).
                  </p>
                )}

                <label className="field">
                  <span>Reference prefix</span>
                  <input value={bankRefPrefix} onChange={(e) => setBankRefPrefix(e.target.value)} disabled={!canEdit} />
                </label>

                <label className="field">
                  <span>Receipt footer</span>
                  <input value={receiptFooter} onChange={(e) => setReceiptFooter(e.target.value)} disabled={!canEdit} />
                </label>
              </div>
            </div>

            {/* Reminders */}
            <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
              <h4 style={{ marginTop: 0 }}>Reminder policy</h4>

              <div className="form" style={{ gap: "0.75rem" }}>
                <label className="field">
                  <span>Quiet hours start</span>
                  <input type="time" value={quietStart} onChange={(e) => setQuietStart(e.target.value)} disabled={!canEdit} />
                </label>

                <label className="field">
                  <span>Quiet hours end</span>
                  <input type="time" value={quietEnd} onChange={(e) => setQuietEnd(e.target.value)} disabled={!canEdit} />
                </label>

                <label className="field">
                  <span>Max reminders per week (per invoice)</span>
                  <input value={maxPerWeek} onChange={(e) => setMaxPerWeek(e.target.value)} disabled={!canEdit} />
                </label>

                <p style={{ opacity: 0.75, marginTop: 0 }}>
                  These are enforced by the reminder engine (cron). They prevent night messaging and spam.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button className="btn primary" onClick={save} disabled={!canEdit || saving}>
                {saving ? "Saving…" : "Save settings"}
              </button>

              <button className="btn" onClick={reseedDefaults} disabled={!canEdit || saving}>
                {saving ? "Working…" : "Reseed default templates + rules"}
              </button>

              {!canEdit ? (
                <span style={{ opacity: 0.75, fontSize: 13 }}>
                  You’re logged in as STAFF. Only ADMIN can change org settings.
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
    </AppShell>
  );
}