-- Run this once in the Supabase SQL editor for the live Law Lens Nepal project.
-- It makes existing rows marked "published" visible to public readers and
-- relaxes RLS so status='published' is the source of truth for public posts.

update public.blog_posts
set published_at = coalesce(published_at, now())
where status = 'published'
  and published_at is null;

drop policy if exists "public read published posts" on public.blog_posts;
create policy "public read published posts"
on public.blog_posts for select
using (
  status = 'published'
  or public.is_owner()
);

drop policy if exists "public read post tags" on public.post_tags;
create policy "public read post tags"
on public.post_tags for select
using (
  exists (
    select 1
    from public.blog_posts
    where blog_posts.id = post_tags.post_id
      and blog_posts.status = 'published'
  )
  or public.is_owner()
);
