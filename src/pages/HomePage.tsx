// ============================================================
// HomePage — Orchestrates all home page sections
// Single responsibility: composition only, no UI logic here
// ============================================================

import {
  HeroSection,
  BlogSection,
  FeaturedProductSection,
  AboutSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <HeroSection />
      <BlogSection />
      <FeaturedProductSection />
      <AboutSection />
    </div>
  );
}
