// ============================================================
// BlogPostCard — Individual article card in the grid
// ============================================================

import { Link } from "react-router-dom";
import { D2YImage } from "@/components/ui";
import type { BlogPost } from "@/data/blog.data";

interface BlogPostCardProps {
  post: BlogPost;
}

// ─── Sub-components ───────────────────────────────────────

function PostThumbnail({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
      <div className="aspect-4/3 overflow-hidden mb-6 border border-border">
        <D2YImage
          src={post.image.src}
          alt={post.image.alt}
          aspectRatio="4/3"
          objectFit="cover"
          rounded="none"
          className="grayscale group-hover:scale-105 transition-transform duration-500 w-full h-full"
          wrapperClassName="w-full h-full"
        />
      </div>
    </Link>
  );
}

function PostMeta({ category, date }: { category: string; date: string }) {
  return (
    <div className="flex items-center gap-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
      <span>{category}</span>
      <span
        className="size-1 bg-foreground/20 rounded-full"
        aria-hidden="true"
      />
      <time>{date}</time>
    </div>
  );
}

function PostTitle({ title, slug }: { title: string; slug: string }) {
  return (
    <Link to={`/blog/${slug}`}>
      <h3 className="text-2xl font-bold leading-tight mb-4 text-foreground group-hover:underline decoration-1 underline-offset-4">
        {title}
      </h3>
    </Link>
  );
}

function PostExcerpt({ excerpt }: { excerpt: string }) {
  return (
    <p className="text-foreground/60 text-sm leading-relaxed font-normal line-clamp-3">
      {excerpt}
    </p>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group cursor-pointer">
      <PostThumbnail post={post} />
      <PostMeta category={post.category} date={post.date} />
      <PostTitle title={post.title} slug={post.slug} />
      <PostExcerpt excerpt={post.excerpt} />
    </article>
  );
}
