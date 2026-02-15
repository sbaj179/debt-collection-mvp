import { AppShell } from '@/components/AppShell';
import { StatsGrid } from '@/components/StatsGrid';

const dueToday = [
  ['INV-1002', 'Acme Retail', 'R 9,450'],
  ['INV-1011', 'Blue Crane Logistics', 'R 18,120'],
  ['INV-1016', 'Southline Foods', 'R 3,210']
];

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <StatsGrid />
      <section className="panel" style={{ marginTop: '1rem' }}>
        <h3>Due today (top 10)</h3>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th align="left">Invoice</th>
              <th align="left">Customer</th>
              <th align="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {dueToday.map(([invoice, customer, amount]) => (
              <tr key={invoice}>
                <td>{invoice}</td>
                <td>{customer}</td>
                <td align="right">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="panel" style={{ marginTop: '1rem' }}>
        <h3>Activity feed</h3>
        <ul>
          <li>reminder_sent · INV-1002 via WhatsApp · 08:15</li>
          <li>pop_uploaded · INV-1008 · waiting verification</li>
          <li>payment_confirmed · INV-1001 · R 12,100</li>
        </ul>
      </section>
    </AppShell>
  );
}
