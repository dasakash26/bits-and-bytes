"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, Share } from "lucide-react";

export const BlogHeader = () => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={isBookmarked ? "text-yellow-500" : ""}
              onClick={handleBookmarkToggle}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
