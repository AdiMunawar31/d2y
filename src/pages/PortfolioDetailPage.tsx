// ============================================================
// PortfolioDetailPage — Dynamic project detail via :slug param
// Fetches project data by slug, renders full detail layout
// ============================================================

import { useParams, Navigate } from "react-router-dom";
import {
  PortfolioDetailHero,
  PortfolioDetailMeta,
  PortfolioDetailContent,
  PortfolioDetailNav,
  PortfolioDetailNotFound,
} from "@/components/portfolio";
import { getProjectBySlug, getAdjacentProjects } from "@/data/portfolio.data";

export default function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/portfolio" replace />;

  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);

  if (!project) return <PortfolioDetailNotFound />;

  return (
    <main className="flex-1">
      <PortfolioDetailHero project={project} />

      <section className="px-6 lg:px-20 py-16 border-t border-border">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <PortfolioDetailMeta project={project} />
          <PortfolioDetailContent project={project} />
        </div>
      </section>

      <PortfolioDetailNav prev={prev} next={next} />
    </main>
  );
}
