import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import type { Profile } from "@/types/blog";

export default function AdminHeader({ profile }: { profile: Profile }) {
  return (
    <header className="admin-header">
      <Link className="brand" href="/admin/dashboard">
        <span className="brand-mark" aria-hidden="true">
          LL
        </span>
        <span>
          <strong>Law Lens CMS</strong>
          <small>{profile.full_name || profile.email || "Owner"}</small>
        </span>
      </Link>
      <nav className="admin-nav" aria-label="Admin navigation">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/posts">Posts</Link>
        <Link href="/admin/posts/new">New Post</Link>
        <Link href="/blog">View Publication</Link>
        <form action={logoutAction}>
          <button type="submit">Logout</button>
        </form>
      </nav>
    </header>
  );
}
