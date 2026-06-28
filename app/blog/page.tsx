import type { Metadata } from "next";
import BlogPageClient from "@/components/blog/BlogPageClient";
import { getPublishedPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/env";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Publication",
  description: "Publications, legal insights, and updates from Law Lens Nepal.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Law Lens Nepal Publication",
    description: "Publications, legal insights, and updates from Law Lens Nepal.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const siteUrl = getSiteUrl();

  return (
    <>
      <BlogPageClient posts={posts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Law Lens Nepal Publication",
            url: `${siteUrl}/blog`,
          }),
        }}
      />
    </>
  );
}
