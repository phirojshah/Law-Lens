import type { MetadataRoute } from "next";
import { getPublishedPostSlugs } from "@/lib/blog";
import { getSiteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const posts = await getPublishedPostSlugs();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
