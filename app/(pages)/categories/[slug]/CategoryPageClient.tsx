"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { PostCard } from "@/components/Cards/PostCard";
import { BlogPost } from "@/types/blog";


export function CategoryPageClient({ category }: {category: { name: string; posts: BlogPost[] } }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">All {category.name} Posts</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Posts Grid/List */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {category.posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onPostClick={() => {}}
            isLiked={false}
            isBookmarked={false}
            onLikeToggle={() => {}}
            onBookmarkToggle={() => {}}
          />
        ))}
      </div>
    </>
  );
}
