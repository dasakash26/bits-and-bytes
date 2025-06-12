"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "../../types/blog";
import { Clock, TrendingUp } from "lucide-react";
import { PostActions } from "../PostActions";
import { AuthorInfo } from "../AuthorInfo";

interface PostCardProps {
  post: BlogPost;
  onPostClick: () => void;
  isLiked: boolean;
  isBookmarked: boolean;
  onLikeToggle: () => void;
  onBookmarkToggle: () => void;
}

export const PostCard = ({
  post,
  onPostClick,
  isLiked,
  isBookmarked,
  onLikeToggle,
  onBookmarkToggle,
}: PostCardProps) => {
  return (
    <Card className="bg-card border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-primary/30 overflow-hidden p-0">
      <CardContent className="p-0">
        {/* Author Info at Top */}
        <div className="p-4 pb-3 border-b border-border bg-gradient-to-r from-transparent to-muted/20">
          <AuthorInfo post={post} />
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={onPostClick}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        )}

        {/* Post Content */}
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h2
                className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2 flex-1 cursor-pointer hover:underline"
                onClick={onPostClick}
              >
                {post.title}
              </h2>
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3" />5 min
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`text-xs hover:bg-primary/20 transition-colors cursor-pointer ${
                      index === 0
                        ? "bg-primary/10 text-primary border-primary/20"
                        : ""
                    }`}
                  >
                    #{tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs hover:bg-muted transition-colors"
                  >
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <PostActions
            isLiked={isLiked}
            onLikeToggle={onLikeToggle}
            likeCount={post.likeCount}
            commentCount={post.comments?.length || 0}
            isBookmarked={isBookmarked}
            onBookmarkToggle={onBookmarkToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};
