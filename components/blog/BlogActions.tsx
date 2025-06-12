"use client";

import React, { useState } from "react";
import { PostActions } from "@/components/PostActions";
import { BlogPost } from "@/types/blog";


export const BlogActions = ({ post }: {post:BlogPost}) => {
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
        commentCount={post.comments.length || 0} // Default to 0 if not provided
        shareCount={0} // Assuming no share count for now
        isBookmarked={false} // Assuming no bookmark functionality for now
        onBookmarkToggle={() => {}} // Placeholder function
        onShare={() => {}} // Placeholder function
        showBorder={false} // No border needed here
      />
    </div>
  );
};
