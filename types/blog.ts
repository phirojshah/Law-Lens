export type PostStatus = "draft" | "published";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "owner";
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Media = {
  id: string;
  url: string;
  path: string;
  mime_type: string;
  size_bytes: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featured_image_url: string | null;
  featured_image_path: string | null;
  category_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: PostStatus;
  published_at: string | null;
  updated_at: string;
  created_at: string;
  reading_time: number;
  author_id: string | null;
  author_name: string | null;
  categories?: Category | null;
  post_tags?: Array<{ tags: Tag | null }>;
};

export type PostFormDefaults = Partial<
  Pick<
    BlogPost,
    | "id"
    | "title"
    | "slug"
    | "summary"
    | "content"
    | "featured_image_url"
    | "seo_title"
    | "seo_description"
    | "status"
    | "published_at"
    | "author_name"
  >
> & {
  category?: string;
  tags?: string;
};
