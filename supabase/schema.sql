-- Law Lens Nepal owner-only CMS schema for Supabase PostgreSQL.
-- Run this in the Supabase SQL editor after creating the project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'owner' check (role = 'owner'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  content text not null,
  featured_image_url text,
  featured_image_path text,
  category_id uuid references public.categories(id) on delete set null,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  reading_time integer not null default 1 check (reading_time > 0),
  author_id uuid references public.profiles(id) on delete set null,
  author_name text default 'Law Lens Nepal',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, tag_id)
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  bucket text not null default 'blog-media',
  path text not null unique,
  url text not null,
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 10485760),
  alt_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists set_tags_updated_at on public.tags;
create trigger set_tags_updated_at
before update on public.tags
for each row execute function public.set_updated_at();

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

create or replace function public.is_owner()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'owner'
  );
$$;

create index if not exists blog_posts_status_published_at_idx
  on public.blog_posts(status, published_at desc);
create index if not exists blog_posts_slug_idx on public.blog_posts(slug);
create index if not exists blog_posts_category_id_idx on public.blog_posts(category_id);
create index if not exists post_tags_tag_id_idx on public.post_tags(tag_id);
create index if not exists media_owner_id_idx on public.media(owner_id);
create index if not exists activity_logs_actor_id_created_at_idx
  on public.activity_logs(actor_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.post_tags enable row level security;
alter table public.media enable row level security;
alter table public.activity_logs enable row level security;

drop policy if exists "profiles select own or owner" on public.profiles;
create policy "profiles select own or owner"
on public.profiles for select
using (id = auth.uid() or public.is_owner());

drop policy if exists "owners manage profiles" on public.profiles;
create policy "owners manage profiles"
on public.profiles for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "public read categories" on public.categories;
create policy "public read categories"
on public.categories for select
using (true);

drop policy if exists "owners manage categories" on public.categories;
create policy "owners manage categories"
on public.categories for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "public read tags" on public.tags;
create policy "public read tags"
on public.tags for select
using (true);

drop policy if exists "owners manage tags" on public.tags;
create policy "owners manage tags"
on public.tags for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "public read published posts" on public.blog_posts;
create policy "public read published posts"
on public.blog_posts for select
using (
  (status = 'published' and published_at is not null and published_at <= now())
  or public.is_owner()
);

drop policy if exists "owners manage posts" on public.blog_posts;
create policy "owners manage posts"
on public.blog_posts for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "public read post tags" on public.post_tags;
create policy "public read post tags"
on public.post_tags for select
using (
  exists (
    select 1
    from public.blog_posts
    where blog_posts.id = post_tags.post_id
      and blog_posts.status = 'published'
      and blog_posts.published_at is not null
      and blog_posts.published_at <= now()
  )
  or public.is_owner()
);

drop policy if exists "owners manage post tags" on public.post_tags;
create policy "owners manage post tags"
on public.post_tags for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "public read media" on public.media;
create policy "public read media"
on public.media for select
using (true);

drop policy if exists "owners manage media" on public.media;
create policy "owners manage media"
on public.media for all
using (public.is_owner())
with check (public.is_owner());

drop policy if exists "owners read logs" on public.activity_logs;
create policy "owners read logs"
on public.activity_logs for select
using (public.is_owner());

drop policy if exists "owners insert logs" on public.activity_logs;
create policy "owners insert logs"
on public.activity_logs for insert
with check (public.is_owner());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-media',
  'blog-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public read blog media" on storage.objects;
create policy "public read blog media"
on storage.objects for select
using (bucket_id = 'blog-media');

drop policy if exists "owners upload blog media" on storage.objects;
create policy "owners upload blog media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'blog-media'
  and public.is_owner()
  and storage.extension(name) in ('jpg', 'jpeg', 'png', 'webp')
);

drop policy if exists "owners update blog media" on storage.objects;
create policy "owners update blog media"
on storage.objects for update
to authenticated
using (bucket_id = 'blog-media' and public.is_owner())
with check (
  bucket_id = 'blog-media'
  and public.is_owner()
  and storage.extension(name) in ('jpg', 'jpeg', 'png', 'webp')
);

drop policy if exists "owners delete blog media" on storage.objects;
create policy "owners delete blog media"
on storage.objects for delete
to authenticated
using (bucket_id = 'blog-media' and public.is_owner());
