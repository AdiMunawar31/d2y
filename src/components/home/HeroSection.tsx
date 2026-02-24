// ============================================================
// HeroSection — Home page hero
// ============================================================

import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { D2YImage } from "@/components/ui";
import { HERO_DATA } from "@/data/home.data";

// ─── Sub-components ───────────────────────────────────────

function HeroEyebrow() {
  return (
    <div className="inline-flex items-center gap-4 text-[var(--color-foreground)]/30 uppercase tracking-[0.4em] text-[10px] font-black">
      <span
        className="w-12 h-px bg-[var(--color-foreground)]/20"
        aria-hidden="true"
      />
      {HERO_DATA.eyebrow}
    </div>
  );
}

function HeroHeadline() {
  return (
    <h1 className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter text-[var(--color-foreground)] text-balance">
      {HERO_DATA.headline.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </h1>
  );
}

function HeroSubtext() {
  return (
    <p className="text-xl text-[var(--color-foreground)]/60 max-w-lg leading-relaxed font-medium">
      {HERO_DATA.subtext}
    </p>
  );
}

function HeroCTA() {
  return (
    <div className="flex items-center gap-6 pt-4  text-primary-foreground">
      <Link
        to={HERO_DATA.cta.primary.href}
        className="group bg-foreground px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-transform duration-200"
      >
        {HERO_DATA.cta.primary.label}
        <ArrowUpRight
          size={16}
          strokeWidth={2.5}
          className="transition-transform text-primary-foreground duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

function HeroCurrentProject() {
  return (
    <div className="absolute -bottom-6 -left-6 bg-[var(--color-background)] p-8 rounded-2xl shadow-xl border border-[var(--color-border)] hidden md:block">
      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-muted-foreground)] mb-1">
        {HERO_DATA.currentProject.label}
      </p>
      <p className="text-sm font-bold text-[var(--color-foreground)]">
        {HERO_DATA.currentProject.name}
      </p>
    </div>
  );
}

function HeroImage() {
  return (
    <div className="lg:col-span-5 relative">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl">
        <D2YImage
          src={HERO_DATA.image.src}
          alt={HERO_DATA.image.alt}
          aspectRatio="auto"
          objectFit="cover"
          rounded="none"
          className="grayscale contrast-125 brightness-90 hover:scale-105 transition-transform duration-1000 h-full"
          wrapperClassName="h-full w-full"
        />
      </div>
      <HeroCurrentProject />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="-mt-20 pb-24 md:py-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
    >
      {/* Left: copy */}
      <div className="lg:col-span-7 flex flex-col gap-10">
        <HeroEyebrow />
        <HeroHeadline />
        <HeroSubtext />
        <HeroCTA />
      </div>

      {/* Right: image */}
      <HeroImage />
    </section>
  );
}
