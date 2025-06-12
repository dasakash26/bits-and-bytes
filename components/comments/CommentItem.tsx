"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, MoreHorizontal, Loader } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Comment } from "@/types/blog";
import { CommentForm } from "./CommentForm";
import { deleteCommentAction } from "@/app/actions/comment.actions";
import { getSession } from "next-auth/react";

const MenuItem = ({
  children,
  onClick,
  className = "",
  disabled = false,
  isLoading = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}) => (
  <li
    className={`px-4 py-2 text-sm hover:bg-muted cursor-pointer transition-colors flex items-center gap-2 ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    } ${className}`}
    onClick={disabled ? undefined : onClick}
  >
    {isLoading && <Loader size="sm" />}
    {children}
  </li>
);

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  replyingTo: string | null;
  onSetReplyingTo: (id: string | null) => void;
  onAddComment: (
    postId: string,
    content: string,
    parentId: string | null
  ) => void;
  onLikeComment: (commentId: string) => void;
  postId: string;
}
export const CommentItem = ({
  comment,
  isReply = false,
  replyingTo,
  onSetReplyingTo,
  onAddComment,
  onLikeComment,
  postId,
}: CommentItemProps) => {
  if (!comment || !comment) {
    return null;
  }
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const session = getSession();
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCommentAction(comment.id);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`flex gap-3 ${isReply ? "ml-8 mt-3" : "mb-6"} ${
        isDeleting ? "opacity-50" : ""
      }`}
    >
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.author?.name ?? ""} />
        <AvatarFallback>
          {comment.author?.name
            ? comment.author.name.charAt(0).toUpperCase()
            : "A"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <Card className="bg-muted/30 border-0 shadow-none p-0">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">
                {comment.author?.name}
              </span>
              {comment.author?.email && (
                <>
                  <span className="text-xs text-muted-foreground">
                    @{comment.author.email.split("@")[0]}
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                </>
              )}
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{comment.content}</p>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto"
            onClick={() => onLikeComment(comment.id)}
          >
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-xs">0</span>
          </Button>

          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto"
              onClick={() =>
                onSetReplyingTo(replyingTo === comment.id ? null : comment.id)
              }
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">Reply</span>
            </Button>
          )}

          <div className="relative" ref={menuRef}>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader size="sm" />
              ) : (
                <MoreHorizontal className="w-4 h-4" />
              )}
            </Button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border shadow-lg rounded-md z-50">
                <ul className="py-1">
                  <MenuItem
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Add edit functionality here
                    }}
                    disabled={isDeleting}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={handleDelete}
                    className="text-destructive"
                    disabled={isDeleting}
                    isLoading={isDeleting}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Add report functionality here
                    }}
                    disabled={isDeleting}
                  >
                    Report
                  </MenuItem>
                </ul>
              </div>
            )}
          </div>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-3">
            <CommentForm
              onSubmit={(content: string) =>
                onAddComment(postId, content, comment.id)
              }
              placeholder={`Reply to ${comment.author?.name}...`}
              onCancel={() => onSetReplyingTo(null)}
              autoFocus
            />
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map((reply: any) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                isReply
                replyingTo={replyingTo}
                onSetReplyingTo={onSetReplyingTo}
                onAddComment={onAddComment}
                onLikeComment={onLikeComment}
                postId={postId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
