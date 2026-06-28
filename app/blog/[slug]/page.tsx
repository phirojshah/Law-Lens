import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPageClient from "@/components/blog/BlogPostPageClient";
import { getPublishedPostBySlug, getPublishedPostSlugs } from "@/lib/blog";
import { getSiteUrl } from "@/lib/env";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.summary;
  const canonical = `/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: post.author_name ? [post.author_name] : ["Law Lens Nepal"],
      images: post.featured_image_url
        ? [
            {
              url: post.featured_image_url,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const tags = (post.post_tags ?? []).map((item) => item.tags?.name).filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo_description || post.summary,
    image: post.featured_image_url ? [post.featured_image_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: post.author_name || "Law Lens Nepal",
    },
    publisher: {
      "@type": "LegalService",
      name: "Law Lens Nepal",
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: tags.join(", "),
  };

  return (
    <>
      <BlogPostPageClient post={post} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
