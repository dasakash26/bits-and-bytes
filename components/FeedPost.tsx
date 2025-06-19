"use client";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../types/blog";
import { PostModal } from "./PostModal";
import { PostCard } from "./Cards/PostCard";
import { useSession } from "next-auth/react";
import { toggleLike, toggleSave } from "@/app/actions/like.actions";
import { toast } from "sonner";

export const FeedPost = ({ post }: { post: BlogPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [mounted, setMounted] = useState(false);
  const session = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !session.data?.user?.id) return;

    // Reset states when post or session changes
    setIsLiked(false);
    setIsBookmarked(false);
    setLikesCount(post.likes?.length || 0);

    // Check if current user liked this post
    post.likes?.forEach((like) => {
      if (session.data?.user?.id === like.userId) {
        setIsLiked(true);
      }
    });
  }, [post, session.data?.user?.id, mounted]);

  useEffect(() => {
    if (!mounted || !session.data?.user?.id) return;

    // Check if current user bookmarked this post
    post?.savedBy?.forEach((save) => {
      if (session.data?.user?.id === save.id) {
        setIsBookmarked(true);
      }
    });
  }, [post, session.data?.user?.id, mounted]);

  const handleLikeToggle = async () => {
    if (!session.data?.user?.id) {
      toast.error("You must be logged in to like a post.");
      return;
    };

    const previousLikedState = isLiked;
    const previousLikesCount = likesCount;

    // Optimistically update UI
    setIsLiked(!isLiked);
    setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

    try {
      await toggleLike(post.id);
    } catch (error) {
      // Revert on error
      setIsLiked(previousLikedState);
      setLikesCount(previousLikesCount);
      console.error("Failed to toggle like:", error);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!session.data?.user?.id) {
      toast.error("You must be logged in to bookmark a post.");
      return;
    };
    const previousBookmarkedState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      await toggleSave(post.id);
    } catch (error) {
      setIsBookmarked(previousBookmarkedState);
      console.error("Failed to toggle bookmark:", error);
    }
  };

  // Prevent hydration mismatch on Vercel
  if (!mounted) {
    return (
      <PostModal
        post={post}
        isLiked={false}
        isBookmarked={false}
        onLikeToggle={() => {}}
        onBookmarkToggle={() => {}}
      >
        <div>
          <div className="mb-4" />
          <PostCard
            post={post}
            onPostClick={() => {}}
            isLiked={false}
            isBookmarked={false}
            onLikeToggle={() => {}}
            onBookmarkToggle={() => {}}
            likesCount={post.likes?.length || 0}
          />
        </div>
      </PostModal>
    );
  }

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
          likesCount={likesCount}
        />
      </div>
    </PostModal>
  );
};
