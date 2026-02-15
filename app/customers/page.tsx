import { AppShell } from '@/components/AppShell';

export default function CustomersPage() {
  return (
    <AppShell title="Customers">
      <section className="panel">
        <h3>Customer list</h3>
        <p>Search, risk tags, consent flags, and CSV import mapping preview are scaffolded for MVP.</p>
      </section>
    </AppShell>
  );
}
