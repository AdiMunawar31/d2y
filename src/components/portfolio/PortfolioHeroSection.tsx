// ============================================================
// PortfolioHeroSection — Page headline with period accent
// ============================================================

import { PORTFOLIO_HERO } from "@/data/portfolio.data";

export default function PortfolioHeroSection() {
  return (
    <section
      aria-label="Portfolio hero"
      className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:px-10 lg:pt-24 lg:pb-16"
    >
      <div className="max-w-3xl">
        <div className="text-5xl font-black leading-[1.1] tracking-tight text-foreground md:text-7xl">
          {PORTFOLIO_HERO.headline}{" "}
          <span className="text-foreground/20">{PORTFOLIO_HERO.period}</span>
        </div>
        <p className="mt-6 text-lg leading-relaxed text-foreground/60 md:text-xl">
          {PORTFOLIO_HERO.description}
        </p>
      </div>
    </section>
  );
}
