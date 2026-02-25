"use client";

import { AppShell } from "@/components/AppShell";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Channel = "WHATSAPP" | "SMS" | "EMAIL";

type TemplateRow = {
  id: string;
  org_id: string;
  channel: Channel;
  name: string;
  subject: string | null;
  body: string;
  is_system: boolean;
  updated_at: string;
};

type Membership = { role: "ADMIN" | "ADMIN_STAFF" };

const VARIABLES =
  "{customer_name}, {invoice_number}, {amount}, {due_date}, {pay_link}, {portal_link}, {business_name}";

function getActiveOrgId(): string {
  const orgId = typeof window !== "undefined" ? localStorage.getItem("active_org_id") : null;
  if (!orgId) throw new Error("No active_org_id found. Sign in again.");
  return orgId;
}

export default function TemplatesPage() {
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

  const [canEdit, setCanEdit] = useState(false);

  const [channel, setChannel] = useState<Channel>("WHATSAPP");
  const [templates, setTemplates] = useState<TemplateRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = templates.find((t) => t.id === selectedId) ?? null;

  // editable draft fields
  const [draftSubject, setDraftSubject] = useState("");
  const [draftBody, setDraftBody] = useState("");

  async function requireSession() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) router.push("/auth/signin");
  }

  function loadDraftFromSelected(t: TemplateRow | null) {
    if (!t) {
      setDraftSubject("");
      setDraftBody("");
      return;
    }
    setDraftSubject(t.subject ?? "");
    setDraftBody(t.body ?? "");
  }

  async function load() {
    setErr(null);
    setOk(null);
    setLoading(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();

      // role → editing templates should be ADMIN only (recommended)
      const mRes = await supabase
        .from("org_memberships")
        .select("role")
        .eq("org_id", orgId)
        .limit(1)
        .single();

      if (mRes.error) throw mRes.error;
      const role = (mRes.data as Membership).role;
      setCanEdit(role === "ADMIN");

      // fetch templates for channel
      const tRes = await supabase
        .from("message_templates")
        .select("id,org_id,channel,name,subject,body,is_system,updated_at")
        .eq("org_id", orgId)
        .eq("channel", channel)
        .order("is_system", { ascending: false })
        .order("name", { ascending: true });

      if (tRes.error) throw tRes.error;

      const rows = (tRes.data as unknown) as TemplateRow[] | null;
      const list = Array.isArray(rows) ? rows : [];

      setTemplates(list);

      // Select first template if none selected or if selection vanished
      const exists = selectedId ? list.some((x) => x.id === selectedId) : false;
      const nextId = exists ? selectedId : list[0]?.id ?? null;
      setSelectedId(nextId);
      loadDraftFromSelected(nextId ? list.find((x) => x.id === nextId) ?? null : null);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load templates.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  async function save() {
    setErr(null);
    setOk(null);
    setSaving(true);

    try {
      await requireSession();
      const orgId = getActiveOrgId();

      if (!canEdit) throw new Error("Only an ADMIN can edit templates.");
      if (!selected) throw new Error("Select a template first.");
      if (!draftBody.trim()) throw new Error("Template body cannot be empty.");

      const payload: Partial<TemplateRow> = {
        body: draftBody,
        subject: channel === "EMAIL" ? (draftSubject.trim() || null) : null,
      };

      const res = await supabase
        .from("message_templates")
        .update(payload)
        .eq("org_id", orgId)
        .eq("id", selected.id);

      if (res.error) throw res.error;

      setOk("Saved ✅");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to save template.");
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

      setOk("Defaults reseeded ✅");
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Failed to reseed defaults.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell title="Templates">
      <section className="panel">
        <h3>Tone tiers: Friendly → Firm → Final</h3>
        <p>Variables: {VARIABLES}</p>

        {loading ? <p style={{ opacity: 0.75 }}>Loading…</p> : null}
        {err ? <p className="notice">{err}</p> : null}
        {ok ? <p className="notice">{ok}</p> : null}

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem", alignItems: "center" }}>
          <label className="field" style={{ minWidth: 220 }}>
            <span>Channel</span>
            <select value={channel} onChange={(e) => setChannel(e.target.value as Channel)}>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="SMS">SMS</option>
              <option value="EMAIL">Email</option>
            </select>
          </label>

          <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn" type="button" onClick={reseedDefaults} disabled={!canEdit || saving}>
              {saving ? "Working…" : "Reseed defaults"}
            </button>

            <button className="btn primary" type="button" onClick={save} disabled={!canEdit || saving || !selected}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "1rem", marginTop: "1rem" }}>
          {/* List */}
          <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
            <h4 style={{ marginTop: 0 }}>Templates</h4>

            {templates.length === 0 ? (
              <p style={{ opacity: 0.75 }}>No templates found for this channel.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                {templates.map((t) => (
                  <li
                    key={t.id}
                    className="panel"
                    style={{
                      padding: "0.7rem",
                      background: selectedId === t.id ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedId(t.id);
                      loadDraftFromSelected(t);
                      setOk(null);
                      setErr(null);
                    }}
                  >
                    <b>{t.name}</b>
                    <div style={{ opacity: 0.75, fontSize: 12 }}>
                      {t.is_system ? "SYSTEM" : "CUSTOM"} • Updated {new Date(t.updated_at).toLocaleString("en-ZA")}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Editor */}
          <div className="panel" style={{ padding: "0.9rem", background: "rgba(0,0,0,0.18)" }}>
            <h4 style={{ marginTop: 0 }}>Editor</h4>

            {!selected ? (
              <p style={{ opacity: 0.75 }}>Select a template to edit.</p>
            ) : (
              <>
                <div style={{ opacity: 0.8, fontSize: 13, marginBottom: "0.75rem" }}>
                  <b>{selected.name}</b> • {channel}
                  {selected.is_system ? " • system default" : ""}
                </div>

                {channel === "EMAIL" ? (
                  <label className="field">
                    <span>Email subject</span>
                    <input
                      value={draftSubject}
                      onChange={(e) => setDraftSubject(e.target.value)}
                      disabled={!canEdit}
                      placeholder="Subject line..."
                    />
                  </label>
                ) : null}

                <label className="field" style={{ marginTop: channel === "EMAIL" ? "0.75rem" : 0 }}>
                  <span>Body</span>
                  <textarea
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    disabled={!canEdit}
                    rows={10}
                    style={{ width: "100%", resize: "vertical" }}
                    placeholder="Write your template..."
                  />
                </label>

                <p style={{ opacity: 0.75, marginTop: "0.75rem", fontSize: 13 }}>
                  Tip: keep it short. Reminders should be scannable. Variables must stay exactly as written.
                </p>

                {!canEdit ? (
                  <p style={{ opacity: 0.75, fontSize: 13 }}>
                    You’re STAFF. Only ADMIN can edit templates.
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}