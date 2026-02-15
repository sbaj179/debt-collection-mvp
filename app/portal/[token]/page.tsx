interface PortalProps {
  params: { token: string };
}

export default function PortalPage({ params }: PortalProps) {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1rem' }}>
      <section className="panel" style={{ width: 'min(720px, 100%)' }}>
        <h1>Invoice portal</h1>
        <p>Token: {params.token.slice(0, 8)}••••</p>
        <p>Branding, line items, amount due, pay link, POP upload, PDF, and dispute action live here.</p>
      </section>
    </main>
  );
}
