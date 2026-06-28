import PostForm from "@/components/admin/PostForm";
import { getCategories, getTags } from "@/lib/blog";
import { requireOwner } from "@/lib/auth";
import { createPostAction } from "../actions";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const { supabase } = await requireOwner();
  const [categories, tags] = await Promise.all([getCategories(supabase), getTags(supabase)]);

  return (
    <PostForm
      action={createPostAction}
      actionLabel="Create blog post"
      categories={categories}
      tags={tags}
      error={params.error}
    />
  );
}
