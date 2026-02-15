'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AppShell.module.css';

const navItems = [
  ['Dashboard', '/dashboard'],
  ['Customers', '/customers'],
  ['Invoices', '/invoices'],
  ['Payments', '/payments'],
  ['Automations', '/automations'],
  ['Templates', '/templates'],
  ['Reports', '/reports'],
  ['Settings', '/settings']
];

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <h1>Get Paid Faster</h1>
        <p>Collections automation</p>
        <nav>
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? styles.active : ''}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className={styles.content}>
        <header className={styles.header}>
          <h2>{title}</h2>
          <button type="button">+ Create invoice</button>
        </header>
        {children}
      </section>
    </main>
  );
}
