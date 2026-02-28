// ============================================================
// BlogSidebar — Composes all sidebar widgets
// Single responsibility: sidebar layout + widget ordering
// ============================================================

import BlogSidebarSearch from "./BlogSidebarSearch";
import BlogSidebarCategories from "./BlogSidebarCategories";
import BlogSidebarNewsletter from "./BlogSidebarNewsletter";
import BlogSidebarTags from "./BlogSidebarTags";

export default function BlogSidebar() {
  return (
    <aside
      className="w-full lg:w-72 shrink-0 flex flex-col gap-12"
      aria-label="Blog sidebar"
    >
      <BlogSidebarSearch />
      <BlogSidebarCategories />
      <BlogSidebarNewsletter />
      <BlogSidebarTags />
    </aside>
  );
}
