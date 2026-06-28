"use client";

import Image from "next/image";
import Link from "next/link";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import PublicHeader from "@/components/public/PublicHeader";
import { useSiteLanguage } from "@/components/public/useSiteLanguage";
import type { BlogPost } from "@/types/blog";

const articleCopy = {
  en: {
    back: "Back to publication",
    minRead: "min read",
    draft: "Draft",
  },
  ne: {
    back: "प्रकाशनमा फर्कनुहोस्",
    minRead: "मिनेट पढाइ",
    draft: "मस्यौदा",
  },
};

export default function BlogPostPageClient({ post }: { post: BlogPost }) {
  const { language, setLanguage, t } = useSiteLanguage();
  const copy = articleCopy[language];
  const tags = (post.post_tags ?? []).map((item) => item.tags?.name).filter(Boolean);
  const dateLocale = language === "ne" ? "ne-NP" : "en";

  return (
    <>
      <PublicHeader currentPage="blog" language={language} setLanguage={setLanguage} t={t} />
      <main className="blog-page">
        <article>
          <header className="article-hero">
            <div className="container article-header-grid">
              <div>
                <Link className="blog-back-link" href="/blog">
                  {copy.back}
                </Link>
                <div className="blog-card-meta">
                  {post.categories?.name && <span>{post.categories.name}</span>}
                  <span>
                    {post.reading_time} {copy.minRead}
                  </span>
                </div>
                <h1>{post.title}</h1>
                <p>{post.summary}</p>
                <p className="article-date">
                  {post.published_at
                    ? new Intl.DateTimeFormat(dateLocale, { dateStyle: "long" }).format(
                        new Date(post.published_at),
                      )
                    : copy.draft}
                </p>
              </div>
              {post.featured_image_url && (
                <div className="article-image">
                  <Image src={post.featured_image_url} alt="" fill sizes="(max-width: 860px) 100vw, 45vw" />
                </div>
              )}
            </div>
          </header>

          <section className="section section-white">
            <div className="container article-content">
              <MarkdownRenderer content={post.content} />
              {tags.length > 0 && (
                <div className="article-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
