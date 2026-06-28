import Link from "next/link";
import { getAdminPosts, getCategories, getTags } from "@/lib/blog";
import { requireOwner } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const { supabase } = await requireOwner();
  const [posts, categories, tags] = await Promise.all([
    getAdminPosts(supabase),
    getCategories(supabase),
    getTags(supabase),
  ]);
  const published = posts.filter((post) => post.status === "published").length;
  const drafts = posts.length - published;

  return (
    <section className="admin-section">
      <div className="admin-title-row">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Owner CMS overview</h1>
        </div>
        <Link className="button button-primary" href="/admin/posts/new">
          Create post
        </Link>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat">
          <strong>{posts.length}</strong>
          <span>Total posts</span>
        </div>
        <div className="admin-stat">
          <strong>{published}</strong>
          <span>Published</span>
        </div>
        <div className="admin-stat">
          <strong>{drafts}</strong>
          <span>Drafts</span>
        </div>
        <div className="admin-stat">
          <strong>{categories.length + tags.length}</strong>
          <span>Categories and tags</span>
        </div>
      </div>

      <div className="admin-panel">
        <h2>Recent posts</h2>
        <div className="admin-table">
          {posts.slice(0, 6).map((post) => (
            <div className="admin-table-row" key={post.id}>
              <div>
                <strong>{post.title}</strong>
                <span>{post.status}</span>
              </div>
              <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
            </div>
          ))}
          {posts.length === 0 && <p>No posts yet. Create the first article for the blog.</p>}
        </div>
      </div>
    </section>
  );
}
