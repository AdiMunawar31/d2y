// ============================================================
// BlogPage — Orchestrates blog listing page
// Single responsibility: composition only, no UI logic here
// ============================================================

import { BlogHeroSection, BlogGrid, BlogSidebar } from "@/components/blog";

export default function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-20">
      <BlogHeroSection />
      <div className="flex flex-col lg:flex-row gap-16">
        <BlogGrid />
        <BlogSidebar />
      </div>
    </main>
  );
}
