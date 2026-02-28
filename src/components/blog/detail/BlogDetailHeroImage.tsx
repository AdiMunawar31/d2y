// ============================================================
// BlogDetailHeroImage — Full-bleed article hero image + caption
// ============================================================

import { D2YImage } from "@/components/ui";
import type { BlogPostDetail } from "@/data/blog.data";

interface BlogDetailHeroImageProps {
  post: BlogPostDetail;
}

export default function BlogDetailHeroImage({
  post,
}: BlogDetailHeroImageProps) {
  return (
    <div className="mb-12 -mx-6 md:-mx-24">
      <div className="aspect-21/9 bg-surface overflow-hidden border border-border">
        <D2YImage
          src={post.hero.src}
          alt={post.hero.alt}
          objectFit="cover"
          rounded="none"
          className="grayscale w-full h-full"
          wrapperClassName="w-full h-full"
        />
      </div>
      {post.hero.caption && (
        <p className="mt-3 text-center text-xs text-muted-foreground italic">
          {post.hero.caption}
        </p>
      )}
    </div>
  );
}
