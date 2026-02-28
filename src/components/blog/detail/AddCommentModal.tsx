// ============================================================
// AddCommentModal — D2YModal with name + comment fields
// ============================================================

import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { D2YModal, D2YTextField, D2YButton, useToast } from "@/components/ui";

interface AddCommentModalProps {
  open: boolean;
  onClose: () => void;
  /** If replying to a comment, show the name of the person */
  replyingTo?: string;
  onSubmit: (data: { name: string; comment: string }) => void;
}

export default function AddCommentModal({
  open,
  onClose,
  replyingTo,
  onSubmit,
}: AddCommentModalProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [nameError, setNameError] = useState("");
  const [commentError, setCommentError] = useState("");
  const { success } = useToast();

  function validate() {
    let valid = true;
    if (!name.trim()) {
      setNameError("Name is required.");
      valid = false;
    } else setNameError("");
    if (!comment.trim()) {
      setCommentError("Comment cannot be empty.");
      valid = false;
    } else if (comment.trim().length < 10) {
      setCommentError("Comment must be at least 10 characters.");
      valid = false;
    } else setCommentError("");
    return valid;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit({ name: name.trim(), comment: comment.trim() });
    success("Comment posted successfully!");
    setName("");
    setComment("");
    onClose();
  }

  function handleClose() {
    setName("");
    setComment("");
    setNameError("");
    setCommentError("");
    onClose();
  }

  return (
    <D2YModal
      open={open}
      onClose={handleClose}
      title={replyingTo ? `Reply to ${replyingTo}` : "Add a Comment"}
      description="Share your thoughts on this article. All comments are moderated."
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <D2YButton variant="outline" size="sm" onClick={handleClose}>
            Cancel
          </D2YButton>
          <D2YButton
            variant="primary"
            size="sm"
            leftIcon={<MessageSquarePlus size={15} />}
            onClick={handleSubmit}
          >
            Post Comment
          </D2YButton>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pt-1">
        <D2YTextField
          label="Your Name"
          placeholder="e.g. Sarah Jenkins"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          required
          fullWidth
        />
        <D2YTextField
          type="textarea"
          label="Comment"
          placeholder="Write your thoughts here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={commentError}
          required
          fullWidth
          rows={5}
        />
      </div>
    </D2YModal>
  );
}
