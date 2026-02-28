// ============================================================
// BlogDetailComments — Comment list + Add Comment modal trigger
// ============================================================

import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/utils";
import AddCommentModal from "./AddCommentModal";
import type { BlogComment } from "@/data/blog.data";

interface BlogDetailCommentsProps {
  comments: BlogComment[];
}

// ─── Single comment ───────────────────────────────────────

function CommentItem({
  comment,
  isReply = false,
  onReply,
}: {
  comment: BlogComment;
  isReply?: boolean;
  onReply: (author: string) => void;
}) {
  return (
    <div className={cn("flex gap-4", isReply && "ml-12")}>
      {/* Avatar placeholder */}
      <div className="w-10 h-10 shrink-0 rounded-full bg-surface border border-border flex items-center justify-center">
        <User size={16} strokeWidth={1.5} className="text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-bold text-sm text-foreground">
            {comment.author}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {comment.date}
          </span>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">
          {comment.body}
        </p>
        <button
          onClick={() => onReply(comment.author)}
          className="cursor-pointer mt-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function BlogDetailComments({
  comments,
}: BlogDetailCommentsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | undefined>();
  const [localComments, setLocalComments] = useState<BlogComment[]>(comments);

  // Split into top-level and replies
  const topLevel = localComments.filter((c) => !c.parentId);
  const replies = localComments.filter((c) => c.parentId);

  function handleReply(author: string) {
    setReplyingTo(author);
    setModalOpen(true);
  }

  function handleAddNew() {
    setReplyingTo(undefined);
    setModalOpen(true);
  }

  function handleSubmit({ name, comment }: { name: string; comment: string }) {
    const newComment: BlogComment = {
      id: `c${Date.now()}`,
      author: name,
      date: "Just now",
      body: comment,
      parentId: replyingTo
        ? localComments.find((c) => c.author === replyingTo)?.id
        : undefined,
    };
    setLocalComments((prev) => [...prev, newComment]);
  }

  return (
    <section className="mt-20" aria-label="Comments">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
          {localComments.length} Comment{localComments.length !== 1 ? "s" : ""}
        </h3>
        <button
          onClick={handleAddNew}
          className="cursor-pointer text-xs font-bold uppercase tracking-widest border-b border-foreground text-foreground hover:text-muted-foreground hover:border-muted-foreground transition-colors pb-0.5"
        >
          Add Comment
        </button>
      </div>

      {/* Comment list */}
      <div className="space-y-8">
        {topLevel.map((comment) => (
          <div key={comment.id} className="space-y-6">
            <CommentItem comment={comment} onReply={handleReply} />
            {/* Nested replies */}
            {replies
              .filter((r) => r.parentId === comment.id)
              .map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply
                  onReply={handleReply}
                />
              ))}
          </div>
        ))}
      </div>

      {/* Add Comment Modal */}
      <AddCommentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        replyingTo={replyingTo}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
