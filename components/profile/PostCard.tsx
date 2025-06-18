"use client";
import React from "react";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { BlogPost } from "@/types/blog";
import Link from "next/link";

interface PostCardProps {
  post: BlogPost;
  isLiked?: boolean;
  isOwner?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  isLiked = false,
  isOwner = false,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      "day"
    );
  };

  return (
    <div className="group bg-gradient-to-r from-card via-card to-card/95 border border-border/60 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      <div className="flex gap-4">
        {/* Author Avatar */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center text-primary font-semibold text-sm shadow-inner">
          {post.author.image ? (
            <img
              src={post.author.image}
              alt={post.author.name || "User"}
              className="w-full h-full rounded-xl object-cover ring-2 ring-background shadow-sm"
            />
          ) : (
            <span className="text-lg font-bold">
              {post.author.name?.charAt(0) || "U"}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-foreground">
                {post.author.name}
              </h4>
              <span className="text-xs text-muted-foreground/60">•</span>
              <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                {formatDate(new Date(post.createdAt))}
              </span>
            </div>
            {isOwner && (
              <button className="p-2 hover:bg-muted/50 rounded-xl transition-colors duration-200 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Post Title and Excerpt */}
          <Link href={`/blog/${post.id}`} className="block mb-4 group/link">
            <h3 className="font-bold text-lg text-foreground group-hover/link:text-primary transition-colors duration-200 mb-2 line-clamp-2 leading-tight">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </Link>

          {/* Category and Read Time */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/15 to-primary/10 text-primary border border-primary/20 hover:from-primary/20 hover:to-primary/15 transition-colors cursor-pointer">
              {post.category.name}
            </span>
            {post.readTime && (
              <>
                <span className="text-xs text-muted-foreground/60">•</span>
                <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                  {post.readTime} read
                </span>
              </>
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2 text-sm font-medium hover:text-red-500 transition-all duration-200 hover:scale-105 ${
                  isLiked ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{post.likes?.length || 0}</span>
              </button>
              <Link
                href={`/blog/${post.id}#comments`}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-blue-500 transition-all duration-200 hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments?.length || 0}</span>
              </Link>
              <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-green-500 transition-all duration-200 hover:scale-105">
                <Share className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
            <Link
              href={`/blog/${post.id}`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-105 bg-muted/30 hover:bg-muted/50 px-3 py-1.5 rounded-full"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Read</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
