import { AppShell } from '@/components/AppShell';

export default function ReportsPage() {
  return (
    <AppShell title="Reports">
      <section className="panel">
        <h3>Aging buckets</h3>
        <p>0–7, 8–14, 15–30, 30+ days with CSV export-ready reporting endpoints.</p>
      </section>
    </AppShell>
  );
}
