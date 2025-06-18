"use client";

import React, { useState, useEffect } from "react";
import { PostActions } from "@/components/PostActions";
import { BlogPost } from "@/types/blog";
import { useSession } from "next-auth/react";
import { toggleLike, toggleSave } from "@/app/actions/like.actions";
import { deleteBlogAction } from "@/app/actions/blog.actions";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const BlogActions = ({ post }: { post: BlogPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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
      toast.success(isLiked ? "Like removed" : "Post liked!");
    } catch (error) {
      setIsLiked(previousLikedState);
      console.error("Failed to toggle like:", error);
      toast.error("Failed to update like. Please try again.");
    }
  };

  const handleBookmarkToggle = async () => {
    const previousBookmarkedState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      await toggleSave(post.id);
      toast.success(isBookmarked ? "Bookmark removed" : "Post bookmarked");
    } catch (error) {
      setIsBookmarked(previousBookmarkedState);
      console.error("Failed to toggle bookmark:", error);
      toast.error("Failed to update bookmark. Please try again.");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBlogAction(post.id);
      toast.success("Blog post deleted successfully!");
      setShowDeleteDialog(false);
      router.push("/feed");
    } catch (error) {
      console.error("Failed to delete blog post:", error);
      toast.error("Failed to delete blog post. Please try again.");
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
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm" className="ml-4">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Delete Blog Post
              </DialogTitle>
              <DialogDescription className="text-left">
                Are you sure you want to delete "<strong>{post.title}</strong>"?
                This action cannot be undone and will permanently remove the
                post and all its comments.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {isDeleting ? "Deleting..." : "Delete Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
