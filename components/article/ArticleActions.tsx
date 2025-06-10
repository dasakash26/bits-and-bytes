"use client";

import React, { useState } from "react";
import { PostActions } from "@/components/PostActions";

interface ArticleActionsProps {
  post: {
    likeCount: number;
    commentCount: number;
  };
}

export const ArticleActions = ({ post }: ArticleActionsProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center justify-between pt-6 border-t">
      <PostActions
        isLiked={isLiked}
        onLikeToggle={handleLikeToggle}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        showBorder={false}
      />
    </div>
  );
};
