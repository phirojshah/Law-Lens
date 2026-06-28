"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Category, PostFormDefaults, Tag } from "@/types/blog";

export default function PostForm({
  action,
  actionLabel,
  categories,
  tags,
  defaults = {},
  error,
}: {
  action: (formData: FormData) => void | Promise<void>;
  actionLabel: string;
  categories: Category[];
  tags: Tag[];
  defaults?: PostFormDefaults;
  error?: string;
}) {
  const [title, setTitle] = useState(defaults.title ?? "");
  const [slug, setSlug] = useState(defaults.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(defaults.slug));
  const [summary, setSummary] = useState(defaults.summary ?? "");
  const [content, setContent] = useState(defaults.content ?? "");
  const [preview, setPreview] = useState(false);
  const categoryOptions = useMemo(() => categories.map((category) => category.name), [categories]);
  const tagOptions = useMemo(() => tags.map((tag) => tag.name), [tags]);

  return (
    <div className="post-editor-grid">
      <form className="admin-form" action={action}>
        <div className="admin-form-header">
          <div>
            <span className="eyebrow">Blog CMS</span>
            <h1>{actionLabel}</h1>
          </div>
          <button className="button button-secondary admin-preview-button" type="button" onClick={() => setPreview((value) => !value)}>
            {preview ? "Hide preview" : "Preview article"}
          </button>
        </div>

        {error && <div className="admin-alert">{error}</div>}

        <label>
          Title
          <input
            name="title"
            value={title}
            onChange={(event) => {
              const nextTitle = event.target.value;
              setTitle(nextTitle);
              if (!slugEdited) {
                setSlug(toPostSlug(nextTitle));
              }
            }}
            minLength={3}
            maxLength={160}
            required
          />
        </label>
        <label>
          Slug
          <input
            name="slug"
            value={slug}
            onChange={(event) => {
              const nextSlug = toPostSlug(event.target.value);
              setSlug(nextSlug);
              setSlugEdited(Boolean(nextSlug));
            }}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            placeholder="property-law-in-nepal"
            maxLength={120}
          />
          <small>Use English letters, numbers, and hyphens only.</small>
        </label>
        <label>
          Summary
          <textarea
            name="summary"
            rows={3}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            minLength={20}
            maxLength={300}
            required
          />
        </label>
        <label>
          Content
          <textarea name="content" rows={14} value={content} onChange={(event) => setContent(event.target.value)} minLength={20} required />
        </label>

        <div className="form-row">
          <label>
            Category
            <input name="category" defaultValue={defaults.category ?? ""} list="category-options" maxLength={80} />
            <datalist id="category-options">
              {categoryOptions.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>
          <label>
            Tags
            <input name="tags" defaultValue={defaults.tags ?? ""} list="tag-options" placeholder="property, contracts, nepal" />
            <datalist id="tag-options">
              {tagOptions.map((tag) => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
          </label>
        </div>

        <div className="form-row">
          <label>
            SEO title
            <input name="seoTitle" defaultValue={defaults.seo_title ?? ""} maxLength={160} />
          </label>
          <label>
            SEO description
            <input name="seoDescription" defaultValue={defaults.seo_description ?? ""} maxLength={180} />
          </label>
        </div>

        <div className="form-row">
          <label>
            Author
            <input name="authorName" defaultValue={defaults.author_name ?? "Law Lens Nepal"} maxLength={120} />
          </label>
          <label>
            Status
            <select name="status" defaultValue={defaults.status ?? "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        <label>
          Published date
          <input name="publishedAt" type="datetime-local" defaultValue={toDateTimeLocal(defaults.published_at)} />
        </label>

        {defaults.featured_image_url && (
          <div className="current-image">
            <Image src={defaults.featured_image_url} alt="" width={320} height={180} />
          </div>
        )}

        <label>
          Featured image
          <input name="featuredImage" type="file" accept="image/jpeg,image/png,image/webp" />
          <small>JPG, PNG, or WEBP only. Maximum 10MB.</small>
        </label>

        <SubmitButton>{actionLabel}</SubmitButton>
      </form>

      {preview && (
        <aside className="post-preview">
          <span className="eyebrow">Preview</span>
          <h2>{title || "Untitled article"}</h2>
          <p>{summary}</p>
          <MarkdownRenderer content={content || "_Start writing to preview your article._"} />
        </aside>
      )}
    </div>
  );
}

function toDateTimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 16);
}

function toPostSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}
