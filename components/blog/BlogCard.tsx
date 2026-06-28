import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";

export default function BlogCard({
  post,
  readLabel = "Read article",
  readingLabel = "min read",
}: {
  post: BlogPost;
  readLabel?: string;
  readingLabel?: string;
}) {
  const category = post.categories?.name;

  return (
    <article className="blog-card">
      {post.featured_image_url && (
        <Link href={`/blog/${post.slug}`} className="blog-card-image" aria-label={post.title}>
          <Image src={post.featured_image_url} alt="" fill sizes="(max-width: 860px) 100vw, 33vw" />
        </Link>
      )}
      <div className="blog-card-body">
        <div className="blog-card-meta">
          {category && <span>{category}</span>}
          <span>
            {post.reading_time} {readingLabel}
          </span>
        </div>
        <h2>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.summary}</p>
        <Link className="text-link" href={`/blog/${post.slug}`}>
          {readLabel}
        </Link>
      </div>
    </article>
  );
}
