import Link from "next/link";
import { deletePostAction } from "./actions";
import { getAdminPosts, getCategories, getTags } from "@/lib/blog";
import { requireOwner } from "@/lib/auth";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; deleted?: string }>;
}) {
  const params = await searchParams;
  const { supabase } = await requireOwner();
  const [posts, categories, tags] = await Promise.all([
    getAdminPosts(supabase),
    getCategories(supabase),
    getTags(supabase),
  ]);

  return (
    <section className="admin-section">
      <div className="admin-title-row">
        <div>
          <span className="eyebrow">Posts</span>
          <h1>Manage blog posts</h1>
        </div>
        <Link className="button button-primary" href="/admin/posts/new">
          New post
        </Link>
      </div>

      {params.error && <div className="admin-alert">{params.error}</div>}
      {params.deleted && <div className="admin-success">Post deleted.</div>}

      <div className="admin-panel">
        <div className="admin-table">
          {posts.map((post) => (
            <div className="admin-table-row" key={post.id}>
              <div>
                <strong>{post.title}</strong>
                <span>
                  /blog/{post.slug} · {post.status} · {post.reading_time} min read
                </span>
              </div>
              <div className="admin-row-actions">
                <Link href={`/blog/${post.slug}`}>Preview</Link>
                <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                <form action={deletePostAction.bind(null, post.id)}>
                  <button type="submit">Delete</button>
                </form>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p>No posts yet.</p>}
        </div>
      </div>

      <div className="admin-taxonomy-grid">
        <div className="admin-panel">
          <h2>Categories</h2>
          <div className="admin-chip-list">
            {categories.map((category) => (
              <span key={category.id}>{category.name}</span>
            ))}
            {categories.length === 0 && <p>No categories yet.</p>}
          </div>
        </div>
        <div className="admin-panel">
          <h2>Tags</h2>
          <div className="admin-chip-list">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
            {tags.length === 0 && <p>No tags yet.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
