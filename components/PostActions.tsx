"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react";

interface PostActionsProps {
  isLiked: boolean;
  onLikeToggle: () => void;
  likeCount: number;
  commentCount: number;
  shareCount?: number;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
  onShare?: () => void;
  showBorder?: boolean;
}

export const PostActions = ({
  isLiked,
  onLikeToggle,
  likeCount,
  commentCount,
  shareCount = 0,
  isBookmarked,
  onBookmarkToggle,
  onShare,
  showBorder = true,
}: PostActionsProps) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare();
    }
  };

  return (
    <div
      className={`flex items-center justify-between w-full ${
        showBorder ? "border-t border-border/30 pt-2" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 py-1.5 h-auto ${
            isLiked
              ? "text-red-500"
              : "text-muted-foreground hover:text-red-500"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle();
          }}
        >
          <Heart className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
          <span className="text-sm">{likeCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="px-2 py-1.5 h-auto text-muted-foreground hover:text-primary"
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">{commentCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="px-2 py-1.5 h-auto text-muted-foreground hover:text-primary"
          onClick={handleShare}
        >
          <Share className="w-4 h-4 mr-1" />
          <span className="text-sm">{shareCount}</span>
        </Button>
      </div>

      {onBookmarkToggle && (
        <Button
          variant="ghost"
          size="sm"
          className={`px-2 py-1.5 h-auto ${
            isBookmarked
              ? "text-yellow-500"
              : "text-muted-foreground hover:text-yellow-500"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle();
          }}
        >
          <Bookmark
            className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
          />
        </Button>
      )}
    </div>
  );
};
