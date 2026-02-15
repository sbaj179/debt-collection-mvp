import { AppShell } from '@/components/AppShell';

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <section className="panel">
        <h3>Organization controls</h3>
        <p>Business profile, payment settings, provider keys, team roles, retention and audit access.</p>
      </section>
    </AppShell>
  );
}
