// ============================================================
// BlogSidebarTags — Clickable tag pills
// ============================================================

import { Link } from "react-router-dom";
import { BLOG_TAGS } from "@/data/blog.data";

export default function BlogSidebarTags() {
  return (
    <section aria-label="Tags">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground/40">
        Tags
      </h4>
      <div className="flex flex-wrap gap-2">
        {BLOG_TAGS.map((tag) => (
          <Link
            key={tag}
            to={`/blog?tag=${tag}`}
            className="text-[10px] font-medium border border-border px-2 py-1 text-foreground hover:border-foreground transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
