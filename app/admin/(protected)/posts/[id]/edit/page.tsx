import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { getAdminPostById, getCategories, getTags, tagsToInput } from "@/lib/blog";
import { requireOwner } from "@/lib/auth";
import { updatePostAction } from "../../actions";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const { supabase } = await requireOwner();
  const [post, categories, tags] = await Promise.all([
    getAdminPostById(supabase, id),
    getCategories(supabase),
    getTags(supabase),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      {query.saved && <div className="admin-success">Post saved.</div>}
      <PostForm
        action={updatePostAction.bind(null, post.id)}
        actionLabel="Save post"
        categories={categories}
        tags={tags}
        error={query.error}
        defaults={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          summary: post.summary,
          content: post.content,
          featured_image_url: post.featured_image_url,
          seo_title: post.seo_title,
          seo_description: post.seo_description,
          status: post.status,
          published_at: post.published_at,
          author_name: post.author_name ?? "Law Lens Nepal",
          category: post.categories?.name ?? "",
          tags: tagsToInput(post),
        }}
      />
    </>
  );
}
