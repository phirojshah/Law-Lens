import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { BlogPost, Category, Tag } from "@/types/blog";

const postSelect = `
  *,
  categories(id,name,slug),
  post_tags(tags(id,name,slug))
`;

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function publicSupabase() {
  return createSupabasePublicClient();
}

export async function getPublishedPosts() {
  const supabase = publicSupabase();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select(postSelect)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch published posts", error.message);
    return [];
  }

  return (data ?? []) as BlogPost[];
}

export async function getPublishedPostSlugs() {
  const supabase = publicSupabase();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug,updated_at")
    .eq("status", "published");

  if (error) {
    console.error("Failed to fetch post slugs", error.message);
    return [];
  }

  return (data ?? []) as Array<{ slug: string; updated_at: string | null }>;
}

export async function getPublishedPostBySlug(slug: string) {
  const supabase = publicSupabase();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select(postSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch post", error.message);
    return null;
  }

  return (data ?? null) as BlogPost | null;
}

export async function getAdminPosts(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(postSelect)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BlogPost[];
}

export async function getAdminPostById(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from("blog_posts").select(postSelect).eq("id", id).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? null) as BlogPost | null;
}

export async function getCategories(supabase?: SupabaseClient) {
  const client = supabase ?? publicSupabase();
  if (!client) {
    return [];
  }

  const { data, error } = await client.from("categories").select("id,name,slug").order("name");
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Category[];
}

export async function getTags(supabase?: SupabaseClient) {
  const client = supabase ?? publicSupabase();
  if (!client) {
    return [];
  }

  const { data, error } = await client.from("tags").select("id,name,slug").order("name");
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Tag[];
}

export function tagsToInput(post?: BlogPost | null) {
  return (post?.post_tags ?? [])
    .map((item) => item.tags?.name)
    .filter(Boolean)
    .join(", ");
}
