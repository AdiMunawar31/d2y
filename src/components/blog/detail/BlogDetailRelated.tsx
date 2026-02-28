// ============================================================
// BlogDetailRelated — "Continue Reading" related posts grid
// ============================================================

import { Link } from "react-router-dom";
import { D2YImage } from "@/components/ui";
import type { RelatedPost } from "@/data/blog.data";

interface BlogDetailRelatedProps {
  posts: RelatedPost[];
}

// ─── Single related card ──────────────────────────────────

function RelatedCard({ post }: { post: RelatedPost }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      {/* Thumbnail */}
      <div className="aspect-4/3 bg-surface mb-4 overflow-hidden border border-border">
        <D2YImage
          src={post.image.src}
          alt={post.image.alt}
          objectFit="cover"
          rounded="none"
          className="grayscale group-hover:grayscale-0 transition-all duration-500 w-full h-full"
          wrapperClassName="w-full h-full"
        />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {post.category}
      </span>
      <h4 className="text-lg font-bold leading-tight mt-2 text-foreground group-hover:underline underline-offset-4 decoration-1">
        {post.title}
      </h4>
    </Link>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function BlogDetailRelated({ posts }: BlogDetailRelatedProps) {
  if (!posts.length) return null;

  return (
    <section
      className="mt-32 pt-16 border-t border-border"
      aria-label="Related posts"
    >
      <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-12 text-center text-muted-foreground">
        Continue Reading
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <RelatedCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
