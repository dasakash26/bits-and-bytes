"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Grid, List, Filter } from "lucide-react";
import { PostCard } from "@/components/Cards/PostCard";
import blogPosts from "@/data/posts";
import { CategoryCarousel } from "@/components/CategoryCarousel";

const categoryData = {
  technology: {
    title: "Technology",
    description: "Latest trends in tech, programming, and innovation",
    color: "from-blue-500 to-purple-500",
    posts: blogPosts.filter((post) => post.tags.includes("Technology")),
  },
  design: {
    title: "Design",
    description: "UI/UX, visual design, and creative inspiration",
    color: "from-pink-500 to-orange-500",
    posts: blogPosts.filter((post) => post.tags.includes("Design")),
  },
  lifestyle: {
    title: "Lifestyle",
    description: "Personal growth, productivity, and life insights",
    color: "from-green-500 to-teal-500",
    posts: blogPosts.filter((post) => post.tags.includes("Lifestyle")),
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const category = categoryData[slug as keyof typeof categoryData];

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">
            The category you're looking for doesn't exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className={`bg-gradient-to-r ${category.color} text-white py-16 px-4`}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {category.title}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {category.description}
          </p>
          <Badge className="mt-4 bg-white/20 text-white border-white/30">
            {category.posts.length} Articles
          </Badge>
        </div>
      </div>

      {/* Featured Carousel */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Featured in {category.title}
          </h2>
          <CategoryCarousel posts={category.posts.slice(0, 5)} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">All {category.title} Posts</h3>
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
      </div>
    </div>
  );
}
