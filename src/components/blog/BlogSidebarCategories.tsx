// ============================================================
// BlogSidebarCategories — Category links with post count
// ============================================================

import { Link } from "react-router-dom";
import { BLOG_CATEGORIES } from "@/data/blog.data";

export default function BlogSidebarCategories() {
  return (
    <section aria-label="Categories">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-foreground/40">
        Categories
      </h4>
      <ul className="flex flex-col gap-4" role="list">
        {BLOG_CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/blog?category=${cat.slug}`}
              className="group flex items-center justify-between text-sm font-medium text-foreground hover:pl-2 transition-all duration-200"
            >
              <span>{cat.label}</span>
              <span className="text-[10px] text-foreground/30">
                {cat.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
