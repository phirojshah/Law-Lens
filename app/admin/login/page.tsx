import type { Metadata } from "next";
import { loginAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owner Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="admin-auth-page">
      <form className="admin-auth-card" action={loginAction}>
        <span className="eyebrow">Owner CMS</span>
        <h1>Law Lens Nepal admin</h1>
        <p>Sign in with the manually created owner account. Public registration is disabled.</p>
        {params.error && <div className="admin-alert">{params.error}</div>}
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <button className="button button-primary" type="submit">
          Secure login
        </button>
      </form>
    </main>
  );
}
