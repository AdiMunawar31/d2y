// ============================================================
// PortfolioDetailHero — Full-width cinematic hero banner
// ============================================================

import { D2YImage } from "@/components/ui";
import type { ProjectDetail } from "@/data/portfolio.data";

interface PortfolioDetailHeroProps {
  project: ProjectDetail;
}

export default function PortfolioDetailHero({
  project,
}: PortfolioDetailHeroProps) {
  return (
    <section className="px-6 lg:px-20 pt-12 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/40 mb-4">
            {project.category}
          </p>
          <h1 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl uppercase text-foreground">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/60 font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="relative aspect-21/9 w-full overflow-hidden rounded-xl shadow-2xl">
          <div
            className="absolute inset-0 z-10 bg-linear-to-t from-black/40 to-transparent"
            aria-hidden="true"
          />
          <D2YImage
            src={project.hero.src}
            alt={project.hero.alt}
            objectFit="cover"
            rounded="none"
            className="grayscale brightness-75 contrast-125 hover:scale-105 transition-transform duration-2000 w-full h-full"
            wrapperClassName="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
