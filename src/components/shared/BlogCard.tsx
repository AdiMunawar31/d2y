// ============================================================
// BlogCard — Reusable blog post card
// ============================================================

import { Link } from "react-router-dom";
import { D2YImage } from "@/components/ui";

interface BlogCardProps {
  category: string;
  date: string;
  title: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
}

export default function BlogCard({
  category,
  date,
  title,
  href,
  image,
}: BlogCardProps) {
  return (
    <article className="group cursor-pointer">
      {/* Thumbnail */}
      <Link to={href} tabIndex={-1} aria-hidden="true">
        <div className="aspect-16/10 mb-8 overflow-hidden rounded-2xl border border-border shadow-sm">
          <D2YImage
            src={image.src}
            alt={image.alt}
            aspectRatio="16/9"
            objectFit="cover"
            rounded="none"
            className="grayscale brightness-95 group-hover:scale-110 transition-transform duration-700 w-full h-full"
            wrapperClassName="w-full h-full"
          />
        </div>
      </Link>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className="px-2 py-1 rounded bg-foreground text-background text-[9px] font-black uppercase tracking-widest">
          {category}
        </span>
        <time
          dateTime={date}
          className="text-[10px] font-bold text-muted-foreground"
        >
          {date}
        </time>
      </div>

      {/* Title */}
      <Link to={href}>
        <h3 className="text-2xl font-black text-foreground group-hover:underline decoration-2 underline-offset-4 leading-tight">
          {title}
        </h3>
      </Link>
    </article>
  );
}
