// ============================================================
// PortfolioDetailContent — Main body: overview + job desc + tech deep dive
// ============================================================

import type { ProjectDetail } from "@/data/portfolio.data";

interface PortfolioDetailContentProps {
  project: ProjectDetail;
}

// ─── Sub-components ───────────────────────────────────────

function ContentSection({
  title,
  children,
  bordered = false,
}: {
  title: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <div className={bordered ? "pt-8 border-t border-border" : undefined}>
      <h2 className="text-3xl font-black tracking-tight mb-6 text-foreground">
        {title}
      </h2>
      {children}
    </div>
  );
}

function TechDetailCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
        {title}
      </h4>
      <p className="text-sm text-foreground/50 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function PortfolioDetailContent({
  project,
}: PortfolioDetailContentProps) {
  return (
    <div className="lg:col-span-8 space-y-12">
      <div className="space-y-16">
        <ContentSection title="Project Overview">
          <p className="text-lg text-foreground/60 font-light leading-relaxed">
            {project.overview}
          </p>
        </ContentSection>

        <ContentSection title="Job Description" bordered>
          <p className="text-lg text-foreground/60 font-light leading-relaxed">
            {project.jobDescription}
          </p>
        </ContentSection>

        <ContentSection title="Technical Deep Dive" bordered>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
            {project.techDetails.map((detail) => (
              <TechDetailCard
                key={detail.title}
                title={detail.title}
                description={detail.description}
              />
            ))}
          </div>
        </ContentSection>
      </div>
    </div>
  );
}
