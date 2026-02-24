// ============================================================
// BlogSection — Latest perspectives / editorial section
// ============================================================

import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/data/home.data";
import BlogCard from "@/components/shared/BlogCard";

// ─── Sub-components ───────────────────────────────────────

function BlogHeader() {
  return (
    <div className="flex items-end justify-between mb-16">
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">
          Editorial
        </span>
        <h2 className="text-4xl font-black tracking-tighter text-[var(--color-foreground)]">
          Latest Perspectives
        </h2>
      </div>
      <Link
        to="/blog"
        className="text-[11px] font-black uppercase tracking-widest border-b-2 border-[var(--color-foreground)] pb-1 hover:text-[var(--color-muted-foreground)] hover:border-[var(--color-muted-foreground)] transition-all"
      >
        Archive
      </Link>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function BlogSection() {
  return (
    <section
      aria-label="Latest blog posts"
      className="border-t border-[var(--color-border)] py-32"
    >
      <BlogHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {BLOG_POSTS.map((post) => (
          <BlogCard
            key={post.id}
            category={post.category}
            date={post.date}
            title={post.title}
            href={post.href}
            image={post.image}
          />
        ))}
      </div>
    </section>
  );
}
