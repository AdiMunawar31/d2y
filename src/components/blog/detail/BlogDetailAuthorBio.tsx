// ============================================================
// BlogDetailAuthorBio — Author card at bottom of article
// ============================================================

import { D2YAvatar } from "@/components/ui";
import type { BlogAuthor } from "@/data/blog.data";

interface BlogDetailAuthorBioProps {
  author: BlogAuthor;
}

export default function BlogDetailAuthorBio({
  author,
}: BlogDetailAuthorBioProps) {
  return (
    <div className="mt-20 p-8 border border-border bg-surface flex flex-col md:flex-row gap-8 items-center md:items-start">
      {/* Avatar */}
      <D2YAvatar
        src={author.avatar}
        name={author.name}
        size="xl"
        shape="circle"
        className="grayscale shrink-0"
      />

      {/* Info */}
      <div>
        <h3 className="font-black text-xl mb-2 text-foreground">
          About {author.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {author.bio}
        </p>

        {/* Socials */}
        <div className="flex flex-wrap gap-5">
          {author.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-xs font-bold uppercase tracking-widest border-b border-foreground text-foreground hover:text-muted-foreground hover:border-muted-foreground transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
