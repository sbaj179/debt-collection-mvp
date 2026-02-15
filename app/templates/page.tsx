import { AppShell } from '@/components/AppShell';

export default function TemplatesPage() {
  return (
    <AppShell title="Templates">
      <section className="panel">
        <h3>Tone tiers: Friendly → Firm → Final</h3>
        <p>Variables: {'{customer_name}, {invoice_number}, {amount}, {due_date}, {pay_link}, {portal_link}, {business_name}'}</p>
      </section>
    </AppShell>
  );
}
