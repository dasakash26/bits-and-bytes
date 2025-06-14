"use client";
import React, { useState } from "react";
import { BlogPost } from "../types/blog";
import { PostModal } from "./PostModal";
import { PostCard } from "./Cards/PostCard";



export const FeedPost = ({ post }: {
  post: BlogPost;
}) => {
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
        <div className="mb-4"/>
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
