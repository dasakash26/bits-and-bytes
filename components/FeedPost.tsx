"use client";
import React, { useState } from "react";
import { BlogPost } from "../types/blog";
import { PostModal } from "./PostModal";
import { PostCard } from "./Cards/PostCard";

interface FeedPostProps {
  post: BlogPost;
}

export const FeedPost = ({ post }: FeedPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <PostModal
      post={post}
      isLiked={isLiked}
      isBookmarked={isBookmarked}
      onLikeToggle={handleLikeToggle}
      onBookmarkToggle={handleBookmarkToggle}
    >
      <div>
        <PostCard
          post={post}
          onPostClick={() => {}}
          isLiked={isLiked}
          isBookmarked={isBookmarked}
          onLikeToggle={handleLikeToggle}
          onBookmarkToggle={handleBookmarkToggle}
        />
      </div>
    </PostModal>
  );
};
