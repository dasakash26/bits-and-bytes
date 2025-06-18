"use client";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../types/blog";
import { PostModal } from "./PostModal";
import { PostCard } from "./Cards/PostCard";
import { useSession } from "next-auth/react";
import { toggleLike, toggleSave } from "@/app/actions/like.actions";

export const FeedPost = ({ post }: { post: BlogPost }) => {
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
    <PostModal
      post={post}
      isLiked={isLiked}
      isBookmarked={isBookmarked}
      onLikeToggle={handleLikeToggle}
      onBookmarkToggle={handleBookmarkToggle}
    >
      <div>
        <div className="mb-4" />
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
