// ============================================================
// BlogGrid — 2-col article grid + pagination
// ============================================================

import { BLOG_POSTS } from "@/data/blog.data";
import BlogPostCard from "./BlogPostCard";
import BlogPagination from "./BlogPagination";

export default function BlogGrid() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {BLOG_POSTS.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <BlogPagination />
    </div>
  );
}
