import styles from './StatsGrid.module.css';

const stats = [
  ['Total Outstanding', 'R 284,110'],
  ['Total Overdue', 'R 127,990'],
  ['Due Today', '14 invoices'],
  ['Collected This Week', 'R 89,302']
];

export function StatsGrid() {
  return (
    <div className={styles.grid}>
      {stats.map(([label, value]) => (
        <article key={label} className={styles.card}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </div>
  );
}
