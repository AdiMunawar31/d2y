// ============================================================
// PortfolioProjectCard — Image card with dark hover overlay
// ============================================================

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { D2YImage } from "@/components/ui";
import type { PortfolioProject } from "@/data/portfolio.data";

interface PortfolioProjectCardProps {
  project: PortfolioProject;
}

// ─── Overlay ──────────────────────────────────────────────

function CardOverlay({ project }: { project: PortfolioProject }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-foreground/80 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <span className="text-xs font-bold uppercase tracking-widest text-background/60">
        {project.category}
      </span>
      <span className="mt-2 text-2xl font-bold text-background leading-tight">
        {project.title}
      </span>
      <p className="mt-2 text-sm text-background/80">{project.description}</p>
      <Link
        to={`/portfolio/${project.slug}`}
        className="mt-6 flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-widest text-background hover:gap-3 transition-all duration-200"
        aria-label={`View case study for ${project.title}`}
      >
        View Case Study
        <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
      </Link>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function PortfolioProjectCard({
  project,
}: PortfolioProjectCardProps) {
  return (
    <Link to={`/portfolio/${project.slug}`}>
      <article className="group relative overflow-hidden rounded bg-surface cursor-pointer">
        <div className="aspect-4/5 overflow-hidden">
          <D2YImage
            src={project.image.src}
            alt={project.image.alt}
            aspectRatio="auto"
            objectFit="cover"
            rounded="none"
            className="grayscale w-full h-full group-hover:scale-105 transition-transform duration-700"
            wrapperClassName="w-full h-full"
          />
        </div>

        <CardOverlay project={project} />
      </article>
    </Link>
  );
}
