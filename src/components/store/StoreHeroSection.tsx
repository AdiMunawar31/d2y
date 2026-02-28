// ============================================================
// StoreHeroSection — Page title + tagline
// ============================================================

import { STORE_HERO } from "@/data/store.data";

export default function StoreHeroSection() {
  return (
    <section className="mb-16">
      <span className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase mb-4 leading-[0.95]">
        {STORE_HERO.title}
      </span>
      <p className="text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
        {STORE_HERO.description}
      </p>
    </section>
  );
}
