"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import styles from "../auth.module.css";

export default function SignUpPage() {
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return createClient(url, key);
  }, []);

  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const org = orgName.trim();
      const em = email.trim();

      if (!org) throw new Error("Organization name is required.");
      if (!em) throw new Error("Email is required.");
      if (password.length < 8) throw new Error("Password must be at least 8 characters.");

      // Sign up (Confirm Email is OFF, so session should be returned)
      const { data, error } = await supabase.auth.signUp({ email: em, password });
      if (error) throw error;

      if (!data.session) {
        throw new Error("No session returned. Confirm Email must be OFF in Supabase Auth settings.");
      }

      // Bootstrap tenant (org + membership + seed defaults)
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

      window.location.href = "/dashboard";
    } catch (err: any) {
      setMsg(err?.message ?? "Sign up failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={`${styles.panel} ${styles.left}`}>
          <div className={styles.kicker}>🏢 Multi-tenant workspace</div>
          <h1 className={styles.h1}>Create your private tenant</h1>
          <p className={styles.p}>
            Every business gets an isolated workspace. Your customers, invoices, reminders, and messages never mix with other businesses.
          </p>

          <ul className={styles.list}>
            <li className={styles.li}>
              <b>Tenant isolation</b>
              <span className={styles.muted}>All data is scoped to org_id with strict Row-Level Security.</span>
            </li>
            <li className={styles.li}>
              <b>Team-ready</b>
              <span className={styles.muted}>Invite staff later. Roles control access.</span>
            </li>
            <li className={styles.li}>
              <b>Automations preloaded</b>
              <span className={styles.muted}>Templates + reminder rules seed automatically on creation.</span>
            </li>
          </ul>
        </section>

        <section className={`${styles.panel} ${styles.right}`}>
          <header className={styles.header}>
            <h2>Create account</h2>
            <p>Create your user + workspace tenant in one flow.</p>
          </header>

          <form className={styles.form} onSubmit={onSubmit}>
            <label className={styles.field}>
              <span>Organization name</span>
              <input
                className={styles.input}
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g., Midnight Cleaning Co."
              />
            </label>

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
                {loading ? "Creating..." : "Create account + workspace"}
              </button>
            </div>

            {msg && <div className={styles.notice}>{msg}</div>}

            <div className={styles.linkRow}>
              <span className={styles.muted}>Already have an account?</span>
              <Link className={styles.a} href="/auth/signin">
                Sign in
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}