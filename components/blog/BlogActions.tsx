"use client";

import React, { useState, useEffect } from "react";
import { PostActions } from "@/components/PostActions";
import { BlogPost } from "@/types/blog";
import { useSession } from "next-auth/react";
import { toggleLike, toggleSave } from "@/app/actions/like.actions";
import { deleteBlogAction } from "@/app/actions/blog.actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const BlogActions = ({ post }: { post: BlogPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const session = useSession();
  const router = useRouter();

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

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteBlogAction(post.id);
      router.push("/feed");
    } catch (error) {
      console.error("Failed to delete blog post:", error);
      alert("Failed to delete blog post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const isAuthor = session.data?.user?.id === post.authorId;

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

      {isAuthor && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-4"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      )}
    </div>
  );
};
