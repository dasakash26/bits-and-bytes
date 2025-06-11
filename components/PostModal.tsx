import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Bookmark,
  ExternalLink,
  Share2,
  Plus,
  Minus,
} from "lucide-react";
import { BlogPost } from "../types/blog";
import ReactMarkdown from "react-markdown";
import { AuthorInfo } from "./AuthorInfo";
import { PostActions } from "./PostActions";
import { CommentSection } from "./CommentSection";
import { mockComments } from "../data/mockComments";
import { useRouter } from "next/navigation";

interface PostModalProps {
  post: BlogPost;
  isLiked: boolean;
  isBookmarked: boolean;
  onLikeToggle: () => void;
  onBookmarkToggle: () => void;
  children: React.ReactNode;
}

export const PostModal = ({
  post,
  isLiked,
  isBookmarked,
  onLikeToggle,
  onBookmarkToggle,
  children,
}: PostModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleOpenInNewPage = () => {
    router.push(`/blog/${post.id}`);
  };

  if (!post) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={`${
          isFullscreen
            ? "max-w-full h-screen w-screen rounded-none"
            : "sm:max-w-5xl max-h-[90vh] w-[95vw] rounded-xl"
        } p-0 overflow-hidden flex flex-col transition-all duration-300 shadow-lg border`}
        showCloseButton={false}
      >
        <DialogHeader className="p-3 border-b flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-1 flex-1 min-w-0">
              <AuthorInfo post={post} showMoreButton={false} />
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={handleOpenInNewPage}
                className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors group"
                title="Open in new page"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-full h-full">
                  <ExternalLink className="w-2.5 h-2.5 text-green-900" />
                </div>
              </button>
              <button
                onClick={handleFullscreenToggle}
                className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors group"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-full h-full">
                  {isFullscreen ? (
                    <Minus className="w-2.5 h-2.5 text-yellow-900" />
                  ) : (
                    <Plus className="w-2.5 h-2.5 text-yellow-900" />
                  )}
                </div>
              </button>
              <DialogClose asChild>
                <button
                  className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors group"
                  title="Close modal"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-full h-full">
                    <X className="w-2.5 h-2.5 text-red-900" />
                  </div>
                </button>
              </DialogClose>
            </div>
          </div>
          <DialogTitle className="text-base font-bold mt-1 underline">
            {post.title}
          </DialogTitle>
          <DialogDescription className="mt-0 flex items-center gap-1 text-xs">
            <div className="w-0.5 h-0.5 bg-primary rounded-full" />
            Published{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            • {post.readTime}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg shadow-sm"
                loading="lazy"
              />
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag, index) => (
                <Badge
                  key={`${tag}-${index}`}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 4} more
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Comment Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <CommentSection comments={mockComments} />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t px-6 py-4">
            <div className="flex items-center justify-between">
              <PostActions
                isLiked={isLiked}
                onLikeToggle={onLikeToggle}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                showBorder={false}
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={isBookmarked ? "text-yellow-500" : ""}
                  onClick={onBookmarkToggle}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                  />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
