export default function AuthPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1rem' }}>
      <section className="panel" style={{ width: 'min(460px, 100%)' }}>
        <h1>Sign in</h1>
        <p>Supabase Auth entry point: sign up/login/forgot password.</p>
      </section>
    </main>
  );
}
