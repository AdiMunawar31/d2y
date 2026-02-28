// ============================================================
// PortfolioCTASection — Bottom CTA: "Let's build together"
// ============================================================

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PORTFOLIO_CTA } from "@/data/portfolio.data";

export default function PortfolioCTASection() {
  return (
    <section
      aria-label="Call to action"
      className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-32"
    >
      <div className="flex flex-col items-center border-t border-foreground/10 pt-20 text-center text-background">
        <span className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
          {PORTFOLIO_CTA.headline}
        </span>
        <span className="mt-6 text-lg text-foreground/60">
          {PORTFOLIO_CTA.subtext}
        </span>
        <Link
          to={PORTFOLIO_CTA.href}
          className="group mt-10 inline-flex items-center gap-3 rounded px-10 py-5 text-sm uppercase tracking-widest bg-foreground font-bold hover:scale-105 transition-transform duration-200"
        >
          {PORTFOLIO_CTA.cta}
          <ArrowRight
            size={16}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
