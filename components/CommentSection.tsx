"use client";

import React, { useState } from "react";
import { Comment } from "@/types/blog";
import { CommentForm } from "./comments/CommentForm";
import { CommentList } from "./comments/CommentList";
import {
  handleAddComment,
  handleLikeComment,
} from "./comments/commentHandlers";


export const CommentSection = ({ comments}:{comments:Comment[]}) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-semibold mb-4">
          Comments ({comments.length})
        </h3>

        <CommentForm
          onSubmit={(content) => handleAddComment(comments[0].postId, content, null)}
        />
      </div>
      <CommentList
        comments={comments}
        replyingTo={replyingTo}
        onSetReplyingTo={setReplyingTo}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />
    </div>
  );
};
