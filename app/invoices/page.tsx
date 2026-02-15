import { AppShell } from '@/components/AppShell';

export default function InvoicesPage() {
  return (
    <AppShell title="Invoices">
      <section className="panel">
        <h3>Invoice builder</h3>
        <p>Fast create: items, due date, VAT toggle, attachments, and send/schedule actions.</p>
      </section>
    </AppShell>
  );
}
