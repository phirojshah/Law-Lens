"use client";

import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import PublicHeader from "@/components/public/PublicHeader";
import { useSiteLanguage } from "@/components/public/useSiteLanguage";
import type { BlogPost } from "@/types/blog";

const publicationCopy = {
  en: {
    backHome: "Law Lens Nepal",
    eyebrow: "Publication",
    title: "Articles and legal updates",
    intro:
      "Practical notes on legal documentation, property matters, business law, dispute support, and administrative processes in Nepal.",
    emptyTitle: "No published posts yet",
    emptyBody: "Published articles will appear here after the owner adds them in the CMS.",
    readArticle: "Read article",
    minRead: "min read",
  },
  ne: {
    backHome: "ल लेंस नेपाल",
    eyebrow: "प्रकाशन",
    title: "लेख तथा कानुनी अपडेट",
    intro:
      "नेपालका कागजात, सम्पत्ति, व्यवसाय, विवाद सहयोग र प्रशासनिक प्रक्रियासम्बन्धी व्यावहारिक कानुनी नोटहरू।",
    emptyTitle: "अहिलेसम्म प्रकाशित लेख छैन",
    emptyBody: "मालिकले CMS मा लेख थपेपछि प्रकाशित लेखहरू यहाँ देखिनेछन्।",
    readArticle: "लेख पढ्नुहोस्",
    minRead: "मिनेट पढाइ",
  },
};

export default function BlogPageClient({ posts }: { posts: BlogPost[] }) {
  const { language, setLanguage, t } = useSiteLanguage();
  const copy = publicationCopy[language];

  return (
    <>
      <PublicHeader currentPage="blog" language={language} setLanguage={setLanguage} t={t} />
      <main className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <Link className="blog-back-link" href="/">
              {copy.backHome}
            </Link>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
          </div>
        </section>

        <section className="section section-white">
          <div className="container">
            {posts.length > 0 ? (
              <div className="blog-grid">
                {posts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    readLabel={copy.readArticle}
                    readingLabel={copy.minRead}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h2>{copy.emptyTitle}</h2>
                <p>{copy.emptyBody}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
