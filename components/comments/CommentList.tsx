"use client";

import { MessageCircle } from "lucide-react";
import { CommentItem } from "./CommentItem";
import { Comment } from "@/types/blog";

interface CommentListProps {
  comments: Comment[];
  replyingTo: string | null;
  onSetReplyingTo: (id: string | null) => void;
  onAddComment: (
    postId: string,
    content: string,
    parentId: string | null
  ) => void;
  onLikeComment: (commentId: string) => void;
}

export const CommentList = ({
  comments,
  replyingTo,
  onSetReplyingTo,
  onAddComment,
  onLikeComment,
}: CommentListProps) => {
  const topLevelComments:Comment[] = comments.filter((comment) => !comment.parentId);

  return (
    <div className="space-y-4">
      {topLevelComments.length > 0 ? (
        topLevelComments.map((comment:Comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replyingTo={replyingTo}
            onSetReplyingTo={onSetReplyingTo}
            onAddComment={onAddComment}
            onLikeComment={onLikeComment}
            postId={comment.postId}
          />
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts! </p>
        </div>
      )}
    </div>
  );
};
