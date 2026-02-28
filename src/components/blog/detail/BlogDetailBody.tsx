// ============================================================
// BlogDetailBody — Renders article content blocks
// Supports: lead, paragraph, heading, blockquote
// ============================================================

import { cn } from "@/utils";
import type { ContentBlock } from "@/data/blog.data";

interface BlogDetailBodyProps {
  content: ContentBlock[];
}

// ─── Block renderers ──────────────────────────────────────

function LeadBlock({ content }: { content: string }) {
  return (
    <p className="text-xl font-medium leading-relaxed text-foreground/80 mb-8">
      {content}
    </p>
  );
}

function ParagraphBlock({ content }: { content: string }) {
  return (
    <p className="text-base leading-relaxed text-foreground/70 mb-6">
      {content}
    </p>
  );
}

function HeadingBlock({ content }: { content: string }) {
  return (
    <h2 className="text-2xl font-black text-foreground mt-12 mb-6 tracking-tight">
      {content}
    </h2>
  );
}

function BlockquoteBlock({
  content,
  attribution,
}: {
  content: string;
  attribution?: string;
}) {
  return (
    <blockquote className="my-10 pl-6 border-l-4 border-foreground">
      <p className="italic text-2xl font-light text-foreground/90 leading-snug">
        {content}
      </p>
      {attribution && (
        <footer className="mt-3 text-sm font-bold text-foreground/60 not-italic">
          {attribution}
        </footer>
      )}
    </blockquote>
  );
}

// ─── Block router ─────────────────────────────────────────

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "lead":
      return <LeadBlock content={block.content} />;
    case "paragraph":
      return <ParagraphBlock content={block.content} />;
    case "heading":
      return <HeadingBlock content={block.content} />;
    case "blockquote":
      return (
        <BlockquoteBlock
          content={block.content}
          attribution={block.attribution}
        />
      );
    default:
      return null;
  }
}

// ─── Main export ──────────────────────────────────────────

export default function BlogDetailBody({ content }: BlogDetailBodyProps) {
  return (
    <div className={cn("max-w-none")}>
      {content.map((block, i) => (
        <ContentBlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}
