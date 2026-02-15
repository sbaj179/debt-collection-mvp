import { AppShell } from '@/components/AppShell';

export default function PaymentsPage() {
  return (
    <AppShell title="Payments + POP Verification">
      <section className="panel">
        <h3>Pending verification queue</h3>
        <p>Review POP image/PDF, confirm/reject with reason, and auto-message on rejection.</p>
      </section>
    </AppShell>
  );
}
