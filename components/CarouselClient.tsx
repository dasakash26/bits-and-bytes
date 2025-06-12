"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/generated/prisma";

interface CarouselClientProps {
  posts: BlogPost[];
}

export const CarouselClient = ({ posts }: CarouselClientProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, posts.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (!posts.length) return null;

  const currentPost = posts[currentIndex];

  return (
    <div className="relative group">
      {/* Main Carousel */}
      <Card className="overflow-hidden bg-card border-border shadow-lg">
        <Link href={`/blog/${currentPost.id}`}>
          <div className="relative h-96 md:h-[500px] cursor-pointer">
            {/* Background Image */}
            {currentPost.image && (
              <div className="absolute inset-0">
                <img
                  src={currentPost.image}
                  alt={currentPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            )}

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div className="text-white max-w-3xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentPost.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={`${tag}-${index}`}
                      className="bg-white/20 text-white border-white/30"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                  {currentPost.title}
                </h2>

                {currentPost.excerpt && (
                  <p className="text-lg opacity-90 mb-6 line-clamp-2">
                    {currentPost.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-6 text-sm opacity-75">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{currentPost.authorId || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentPost.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Navigation Arrows */}
        {posts.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={(e) => {
                e.preventDefault();
                goToPrevious();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={(e) => {
                e.preventDefault();
                goToNext();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}
      </Card>

      {/* Thumbnail Navigation */}
      {posts.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {posts.map((post, index) => (
            <button
              key={post.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 relative group/thumb ${
                index === currentIndex ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="w-20 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform group-hover/thumb:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                )}
              </div>
              <div
                className={`absolute inset-0 rounded-lg transition-opacity ${
                  index === currentIndex
                    ? "bg-primary/20"
                    : "bg-black/20 group-hover/thumb:bg-black/10"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Progress Indicators */}
      {posts.length > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
