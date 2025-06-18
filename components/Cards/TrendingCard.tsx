import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const TrendingCard = async () => {
  const trendingPosts = await prisma.blogPost.findMany({
    take: 5,
    include: {
      author: true,
    },
  });

  return (
    <Card className="group bg-card border-border shadow-elevation-interactive hover:shadow-elevation-high hover:border-primary/30 transition-all duration-300">
      <CardHeader className="pb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full -translate-y-10 translate-x-10" />
        <CardTitle className="text-lg font-semibold flex items-center gap-2 relative z-10">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-elevation-medium">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="text-gradient">Trending Posts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingPosts.map((post, index) => (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="group/item block p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-elevation-interactive hover:shadow-elevation-medium"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 relative">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary via-primary/80 to-accent/60 flex items-center justify-center shadow-elevation-medium">
                  <span className="text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                {index < 3 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border border-background shadow-sm" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 mb-2 group-hover/item:text-primary transition-colors duration-200">
                  {post.title}
                </h4>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    by{" "}
                    <span className="font-medium text-foreground/80 group-hover/item:text-primary transition-colors duration-200">
                      {post.author.name || "Anonymous"}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary border border-primary/20 shadow-sm"
                    >
                      {post.tags?.[0] || "Article"}
                    </Badge>
                    <ChevronRight className="w-3 h-3 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
