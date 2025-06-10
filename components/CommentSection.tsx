"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  comments: any[];
}

export const CommentSection = ({ comments }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = (content: string) => {
    console.log("Adding comment:", content);
    setNewComment("");
  };

  const handleLikeComment = (commentId: string) => {
    console.log("Liking comment:", commentId);
  };

  const handleReplyComment = (commentId: string, content: string) => {
    console.log("Replying to comment:", commentId, content);
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: any;
    isReply?: boolean;
  }) => (
    <div className={`flex gap-3 ${isReply ? "ml-12 mt-3" : "mb-6"}`}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.author.avatar} />
        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              @{comment.author.username}
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm leading-relaxed">{comment.content}</p>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-auto ${comment.isLiked ? "text-red-500" : ""}`}
            onClick={() => handleLikeComment(comment.id)}
          >
            <Heart
              className={`w-4 h-4 mr-1 ${
                comment.isLiked ? "fill-current" : ""
              }`}
            />
            <span className="text-xs">{comment.likes}</span>
          </Button>

          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto"
              onClick={() =>
                setReplyingTo(replyingTo === comment.id ? null : comment.id)
              }
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">Reply</span>
            </Button>
          )}

          <Button variant="ghost" size="sm" className="p-1 h-auto">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-3 space-y-2">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[80px] text-sm"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleReplyComment(comment.id, replyContent)}
                disabled={!replyContent.trim()}
              >
                Reply
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map((reply:any) => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-semibold mb-4">
          Comments ({comments.length})
        </h3>

        <div className="space-y-3">
          <Textarea
            placeholder="What are your thoughts?"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button
              onClick={() => handleAddComment(newComment)}
              disabled={!newComment.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};
