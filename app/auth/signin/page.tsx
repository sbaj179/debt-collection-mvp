"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import styles from "../auth.module.css";

export default function SignInPage() {
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return createClient(url, key);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [needsOrg, setNeedsOrg] = useState(false);
  const [orgName, setOrgName] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function pickActiveOrgOrAsk(): Promise<boolean> {
    // If the user belongs to multiple orgs later, we take the newest by created_at.
    const mRes = await supabase
      .from("org_memberships")
      .select("org_id")
      .order("created_at", { ascending: false })
      .limit(1);

    if (mRes.error) throw mRes.error;

    if (mRes.data && mRes.data.length > 0) {
      localStorage.setItem("active_org_id", mRes.data[0].org_id);
      return true;
    }

    setNeedsOrg(true);
    setMsg("No workspace found for this account. Enter your organization name to create your tenant.");
    return false;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      if (!data.session) throw new Error("No session returned.");

      const ok = await pickActiveOrgOrAsk();
      if (!ok) return;

      window.location.href = "/dashboard";
    } catch (err: any) {
      setMsg(err?.message ?? "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  async function createOrgNow() {
    setMsg(null);
    setLoading(true);

    try {
      const org = orgName.trim();
      if (!org) throw new Error("Organization name is required.");

      const { data: boot, error: bootErr } = await supabase.rpc("bootstrap_org", {
        p_name: org,
        p_timezone: "Africa/Johannesburg",
        p_payment_mode: "MANUAL_EFT",
        p_support_email: null,
        p_support_phone: null,
      });

      if (bootErr) throw bootErr;

      const newOrgId = boot?.org_id as string | undefined;
      if (!newOrgId) throw new Error("bootstrap_org did not return org_id");

      localStorage.setItem("active_org_id", newOrgId);
      setNeedsOrg(false);

      window.location.href = "/dashboard";
    } catch (err: any) {
      setMsg(err?.message ?? "Failed to create workspace.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={`${styles.panel} ${styles.left}`}>
          <div className={styles.kicker}>🔒 Tenant isolation</div>
          <h1 className={styles.h1}>Sign in to your workspace</h1>
          <p className={styles.p}>
            This system is multi-tenant by design. You only see data inside your organization — nothing else.
          </p>

          <ul className={styles.list}>
            <li className={styles.li}>
              <b>Org-scoped access</b>
              <span className={styles.muted}>All queries are scoped to org_id with RLS enforcement.</span>
            </li>
            <li className={styles.li}>
              <b>Automations + auditability</b>
              <span className={styles.muted}>Reminders and critical actions are logged for traceability.</span>
            </li>
            <li className={styles.li}>
              <b>Built for daily usage</b>
              <span className={styles.muted}>Fast UI, clear debtors list, and automated follow-ups.</span>
            </li>
          </ul>
        </section>

        <section className={`${styles.panel} ${styles.right}`}>
          <header className={styles.header}>
            <h2>Sign in</h2>
            <p>Access your tenant. If none exists, we’ll create one.</p>
          </header>

          {!needsOrg ? (
            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.field}>
                <span>Email</span>
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </label>

              <label className={styles.field}>
                <span>Password</span>
                <input
                  className={styles.input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </label>

              <div className={styles.btnRow}>
                <button className={`${styles.btn} ${styles.primary}`} disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>

              {msg && <div className={styles.notice}>{msg}</div>}

              <div className={styles.linkRow}>
                <span className={styles.muted}>No account?</span>
                <Link className={styles.a} href="/auth/signup">
                  Create one
                </Link>
              </div>
            </form>
          ) : (
            <div className={styles.form}>
              <label className={styles.field}>
                <span>Organization name</span>
                <input
                  className={styles.input}
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., Midnight Cleaning Co."
                />
              </label>

              <div className={styles.btnRow}>
                <button className={`${styles.btn} ${styles.primary}`} onClick={createOrgNow} disabled={loading}>
                  {loading ? "Creating..." : "Create workspace"}
                </button>
              </div>

              {msg && <div className={styles.notice}>{msg}</div>}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}