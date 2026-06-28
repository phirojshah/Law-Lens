"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <span className="eyebrow">Error</span>
        <h1>Unable to load admin area</h1>
        <p>Check your Supabase environment variables and owner account setup.</p>
        <button className="button button-primary" type="button" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
