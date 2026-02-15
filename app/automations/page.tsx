import { AppShell } from '@/components/AppShell';

export default function AutomationsPage() {
  return (
    <AppShell title="Automations">
      <section className="panel">
        <h3>Reminder rule pack</h3>
        <p>Trigger offsets, channel fallback (WhatsApp → SMS → Email), quiet hours, and cap controls.</p>
      </section>
    </AppShell>
  );
}
