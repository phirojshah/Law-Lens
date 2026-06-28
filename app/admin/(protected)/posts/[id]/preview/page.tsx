import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { getAdminPostById } from "@/lib/blog";
import { requireOwner } from "@/lib/auth";

export default async function AdminPostPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireOwner();
  const post = await getAdminPostById(supabase, id);

  if (!post) {
    notFound();
  }

  const tags = (post.post_tags ?? []).map((item) => item.tags?.name).filter(Boolean);

  return (
    <section className="admin-section">
      <div className="admin-title-row">
        <div>
          <span className="eyebrow">Preview</span>
          <h1>{post.title}</h1>
        </div>
        <div className="admin-row-actions">
          {post.status === "published" && <Link href={`/blog/${post.slug}`}>Open public page</Link>}
          <Link href={`/admin/posts/${post.id}/edit`}>Edit post</Link>
        </div>
      </div>

      <div className="admin-panel admin-preview-note">
        <strong>Owner-only preview</strong>
        <span>
          Status: {post.status}
          {post.published_at ? ` · Published: ${new Date(post.published_at).toLocaleDateString("en")}` : " · No publish date"}
        </span>
      </div>

      <article className="admin-panel admin-preview-article">
        {post.featured_image_url && (
          <div className="admin-preview-image">
            <Image src={post.featured_image_url} alt="" fill sizes="(max-width: 860px) 100vw, 920px" />
          </div>
        )}

        <div className="blog-card-meta">
          {post.categories?.name && <span>{post.categories.name}</span>}
          <span>{post.reading_time} min read</span>
        </div>
        <h2>{post.title}</h2>
        <p className="admin-preview-summary">{post.summary}</p>
        <MarkdownRenderer content={post.content} />

        {tags.length > 0 && (
          <div className="article-tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
