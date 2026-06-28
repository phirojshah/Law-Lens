"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { calculateReadingTime, slugify } from "@/lib/blog";
import { requireOwner } from "@/lib/auth";
import type { BlogPost, Category, Tag } from "@/types/blog";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const postSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().trim().min(20).max(300),
  content: z.string().trim().min(20),
  category: z.string().trim().max(80).optional(),
  tags: z.string().trim().max(300).optional(),
  seoTitle: z.string().trim().max(160).optional(),
  seoDescription: z.string().trim().max(180).optional(),
  authorName: z.string().trim().max(120).optional(),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().optional(),
});

export async function createPostAction(formData: FormData) {
  const { supabase, user } = await requireOwner();
  const parsed = parsePostForm(formData, "/admin/posts/new");
  const image = await uploadFeaturedImage(formData, parsed.slug, "/admin/posts/new");
  const publishedAt = getPublishedAt(parsed.status, parsed.publishedAt, null);
  const category = await upsertCategory(parsed.category);

  const { data: post, error } = await supabase
    .from("blog_posts")
    .insert({
      title: parsed.title,
      slug: parsed.slug,
      summary: parsed.summary,
      content: parsed.content,
      featured_image_url: image?.url ?? null,
      featured_image_path: image?.path ?? null,
      category_id: category?.id ?? null,
      seo_title: parsed.seoTitle || null,
      seo_description: parsed.seoDescription || null,
      status: parsed.status,
      published_at: publishedAt,
      reading_time: calculateReadingTime(parsed.content),
      author_id: user.id,
      author_name: parsed.authorName || "Law Lens Nepal",
    })
    .select("id")
    .single();

  if (error || !post) {
    redirect(`/admin/posts/new?error=${encodeURIComponent(error?.message || "Could not create post.")}`);
  }

  await syncTags(post.id, parsed.tags);
  await logActivity("create", "blog_posts", post.id, { title: parsed.title });
  redirect(`/admin/posts/${post.id}/edit?saved=1`);
}

export async function updatePostAction(id: string, formData: FormData) {
  const { supabase, user } = await requireOwner();
  const parsed = parsePostForm(formData, `/admin/posts/${id}/edit`);
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("id,published_at,featured_image_url,featured_image_path")
    .eq("id", id)
    .maybeSingle<Pick<BlogPost, "id" | "published_at" | "featured_image_url" | "featured_image_path">>();

  if (!existing) {
    redirect("/admin/posts?error=Post not found.");
  }

  const image = await uploadFeaturedImage(formData, parsed.slug, `/admin/posts/${id}/edit`);
  const category = await upsertCategory(parsed.category);
  const publishedAt = getPublishedAt(parsed.status, parsed.publishedAt, existing.published_at);

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title: parsed.title,
      slug: parsed.slug,
      summary: parsed.summary,
      content: parsed.content,
      featured_image_url: image?.url ?? existing.featured_image_url,
      featured_image_path: image?.path ?? existing.featured_image_path,
      category_id: category?.id ?? null,
      seo_title: parsed.seoTitle || null,
      seo_description: parsed.seoDescription || null,
      status: parsed.status,
      published_at: publishedAt,
      updated_at: new Date().toISOString(),
      reading_time: calculateReadingTime(parsed.content),
      author_id: user.id,
      author_name: parsed.authorName || "Law Lens Nepal",
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/posts/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  await syncTags(id, parsed.tags);
  await logActivity("update", "blog_posts", id, { title: parsed.title, status: parsed.status });
  redirect(`/admin/posts/${id}/edit?saved=1`);
}

export async function deletePostAction(id: string) {
  const { supabase } = await requireOwner();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("featured_image_path")
    .eq("id", id)
    .maybeSingle<Pick<BlogPost, "featured_image_path">>();

  if (post?.featured_image_path) {
    await supabase.storage.from("blog-media").remove([post.featured_image_path]);
    await supabase.from("media").delete().eq("path", post.featured_image_path);
  }

  await logActivity("delete", "blog_posts", id, {});
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    redirect(`/admin/posts?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/posts?deleted=1");
}

function parsePostForm(formData: FormData, failurePath: string) {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: slugify(String(formData.get("slug") || "")),
    summary: formData.get("summary"),
    content: formData.get("content"),
    category: formData.get("category"),
    tags: formData.get("tags"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    authorName: formData.get("authorName"),
    status: formData.get("status"),
    publishedAt: formData.get("publishedAt"),
  });

  if (!parsed.success) {
    redirect(`${failurePath}?error=${encodeURIComponent("Please check all required fields and slug format.")}`);
  }

  return parsed.data;
}

function getPublishedAt(status: "draft" | "published", input: string | undefined, existing: string | null) {
  if (status === "draft") {
    return null;
  }

  if (input) {
    return new Date(input).toISOString();
  }

  return existing || new Date().toISOString();
}

async function upsertCategory(categoryName?: string) {
  if (!categoryName) {
    return null;
  }

  const { supabase } = await requireOwner();
  const slug = slugify(categoryName);
  if (!slug) {
    return null;
  }

  const { data, error } = await supabase
    .from("categories")
    .upsert({ name: categoryName, slug }, { onConflict: "slug" })
    .select("id,name,slug")
    .single<Category>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function syncTags(postId: string, tagInput?: string) {
  const { supabase } = await requireOwner();
  const names = Array.from(
    new Set(
      (tagInput || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 12),
    ),
  );

  await supabase.from("post_tags").delete().eq("post_id", postId);

  if (names.length === 0) {
    return;
  }

  const tagRows: Tag[] = [];
  for (const name of names) {
    const slug = slugify(name);
    if (!slug) {
      continue;
    }
    const { data, error } = await supabase
      .from("tags")
      .upsert({ name, slug }, { onConflict: "slug" })
      .select("id,name,slug")
      .single<Tag>();
    if (error) {
      throw new Error(error.message);
    }
    tagRows.push(data);
  }

  if (tagRows.length > 0) {
    await supabase.from("post_tags").insert(tagRows.map((tag) => ({ post_id: postId, tag_id: tag.id })));
  }
}

async function uploadFeaturedImage(formData: FormData, slug: string, failurePath: string) {
  const file = formData.get("featuredImage");
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    redirect(`${failurePath}?error=${encodeURIComponent("Featured image must be JPG, PNG, or WEBP.")}`);
  }

  if (file.size > MAX_IMAGE_SIZE) {
    redirect(`${failurePath}?error=${encodeURIComponent("Featured image must be 10MB or smaller.")}`);
  }

  const { supabase, user } = await requireOwner();
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `posts/${slug}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("blog-media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    redirect(`${failurePath}?error=${encodeURIComponent(error.message)}`);
  }

  const { data } = supabase.storage.from("blog-media").getPublicUrl(path);
  await supabase.from("media").insert({
    owner_id: user.id,
    bucket: "blog-media",
    path,
    url: data.publicUrl,
    mime_type: file.type,
    size_bytes: file.size,
  });
  await logActivity("upload", "media", null, { path });

  return { url: data.publicUrl, path };
}

async function logActivity(action: string, entityType: string, entityId: string | null, metadata: Record<string, unknown>) {
  const { supabase, user } = await requireOwner();
  await supabase.from("activity_logs").insert({
    actor_id: user.id,
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata,
  });
}
