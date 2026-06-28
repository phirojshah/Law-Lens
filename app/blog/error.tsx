"use client";

export default function BlogError({ reset }: { reset: () => void }) {
  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <span className="eyebrow">Error</span>
          <h1>Unable to load articles</h1>
          <button className="button button-primary" type="button" onClick={reset}>
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
