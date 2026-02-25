// ============================================================
// AboutHeroSection — Large headline + portrait image
// ============================================================

import { D2YImage } from "@/components/ui";
import { ABOUT_HERO } from "@/data/about.data";

// ─── Sub-components ───────────────────────────────────────

function AboutHeadline() {
  return (
    <div className="lg:col-span-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-[var(--color-muted-foreground)]">
        {ABOUT_HERO.eyebrow}
      </p>
      <span className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-[var(--color-foreground)] uppercase">
        {ABOUT_HERO.headline.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>
    </div>
  );
}

function AboutPortrait() {
  return (
    <div className="lg:col-span-4 flex flex-col gap-6 mt-20 mr-20">
      <div className="aspect-square overflow-hidden rounded-sm grayscale">
        <D2YImage
          src={ABOUT_HERO.image.src}
          alt={ABOUT_HERO.image.alt}
          aspectRatio="1/1"
          objectFit="cover"
          rounded="none"
          className="opacity-90 w-full h-full"
          wrapperClassName="w-full h-full"
        />
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function AboutHeroSection() {
  return (
    <section
      aria-label="About hero"
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24 lg:mb-32"
    >
      <AboutHeadline />
      <AboutPortrait />
    </section>
  );
}
