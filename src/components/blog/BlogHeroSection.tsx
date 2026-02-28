// ============================================================
// BlogHeroSection — Page title + description header
// ============================================================

import { BLOG_HERO } from "@/data/blog.data";

export default function BlogHeroSection() {
  return (
    <div className="mb-16 border-b border-border pb-10">
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-foreground leading-[0.92]">
        {BLOG_HERO.headline.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="max-w-xl text-lg text-foreground/60 leading-relaxed font-light">
        {BLOG_HERO.description}
      </p>
    </div>
  );
}
