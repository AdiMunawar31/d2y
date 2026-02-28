// ============================================================
// BlogDetailHeader — Article header: badges, title, author bar
// ============================================================

import { useState } from "react";
import { Bookmark, Share2 } from "lucide-react";
import { D2YAvatar } from "@/components/ui";
import { useToast } from "@/components/ui";
import { cn } from "@/utils";
import type { BlogPostDetail } from "@/data/blog.data";

interface BlogDetailHeaderProps {
  post: BlogPostDetail;
}

// ─── Sub-components ───────────────────────────────────────

function ArticleBadges({
  category,
  readTime,
}: {
  category: string;
  readTime: string;
}) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      <span className="px-2 py-1 bg-foreground text-background text-[10px] font-bold uppercase tracking-wider rounded-sm">
        {category}
      </span>
      <span className="px-2 py-1 border border-foreground text-foreground text-[10px] font-bold uppercase tracking-wider rounded-sm">
        {readTime}
      </span>
    </div>
  );
}

function ArticleTitle({ title }: { title: string }) {
  return (
    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-8 text-foreground">
      {title}
    </h1>
  );
}

function ActionButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 border rounded transition-all duration-200",
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border hover:border-foreground text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function AuthorBar({ post }: { post: BlogPostDetail }) {
  const [bookmarked, setBookmarked] = useState(false);
  const { success } = useToast();

  function handleShare() {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    success("Link copied to clipboard!");
  }

  return (
    <div className="flex items-center justify-between py-6 border-y border-border">
      {/* Author */}
      <div className="flex items-center gap-4">
        <D2YAvatar
          src={post.author.avatar}
          name={post.author.name}
          size="md"
          shape="circle"
          className="grayscale"
        />
        <div>
          <p className="font-bold text-sm text-foreground">
            {post.author.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {post.date} · {post.author.role}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <ActionButton
          active={bookmarked}
          onClick={() => setBookmarked((b) => !b)}
        >
          <Bookmark
            size={18}
            strokeWidth={1.75}
            className={bookmarked ? "fill-background" : ""}
          />
        </ActionButton>
        <ActionButton onClick={handleShare}>
          <Share2 size={18} strokeWidth={1.75} />
        </ActionButton>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  return (
    <header className="mb-12">
      <ArticleBadges category={post.category} readTime={post.readTime} />
      <ArticleTitle title={post.title} />
      <AuthorBar post={post} />
    </header>
  );
}
