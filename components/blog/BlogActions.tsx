"use client";

import React, { useState, useEffect } from "react";
import { PostActions } from "@/components/PostActions";
import { BlogPost } from "@/types/blog";
import { useSession } from "next-auth/react";
import { toggleLike, toggleSave } from "@/app/actions/like.actions";

export const BlogActions = ({ post }: { post: BlogPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const session = useSession();

  useEffect(() => {
    post.likes.forEach((like) => {
      if (session.data?.user?.id === like.userId) {
        setIsLiked(true);
      }
    });
  }, [post]);

  useEffect(() => {
    post?.savedBy?.forEach((save) => {
      if (session.data?.user?.id === save.id) {
        setIsBookmarked(true);
      }
    });
  }, [post]);

  const handleLikeToggle = async () => {
    const previousLikedState = isLiked;
    setIsLiked(!isLiked);

    try {
      await toggleLike(post.id);
    } catch (error) {
      setIsLiked(previousLikedState);
      console.error("Failed to toggle like:", error);
    }
  };

  const handleBookmarkToggle = async () => {
    const previousBookmarkedState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      await toggleSave(post.id);
    } catch (error) {
      setIsBookmarked(previousBookmarkedState);
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <div className="flex items-center justify-between pt-6 border-t">
      <PostActions
        isLiked={isLiked}
        onLikeToggle={handleLikeToggle}
        likeCount={post.likes.length || 0}
        commentCount={post.comments.length || 0}
        shareCount={0}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
        onShare={() => {}}
        showBorder={false}
      />
    </div>
  );
};
