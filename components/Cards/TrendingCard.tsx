"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame, ChevronRight } from "lucide-react";
import blogPosts from "@/data/posts";

export const TrendingCard = () => {
  const router = useRouter();

  const handlePostClick = (id: number) => {
    router.push(`/article/${id}`);
  };

  return (
    <Card className="bg-card border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30 group">
      <CardHeader className="pb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-10 translate-x-10" />
        <CardTitle className="text-lg font-semibold flex items-center gap-2 relative z-10">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-sm">
            <Flame className="w-4 h-4 text-white" />
          </div>
          Trending Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {blogPosts.slice(0, 5).map((post, index) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 cursor-pointer group/item hover:scale-[1.02] hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 relative">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border border-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 mb-2 group-hover/item:text-primary transition-colors">
                  {post.title}
                </h4>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    by{" "}
                    <span className="font-medium text-foreground/80">
                      {post.author}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary border-0"
                    >
                      {post.tags?.[0] || "Article"}
                    </Badge>
                    <ChevronRight className="w-3 h-3 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
