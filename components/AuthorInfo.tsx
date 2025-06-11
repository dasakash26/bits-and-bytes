import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye } from "lucide-react";
import { BlogPost } from "../types/blog";

interface AuthorInfoProps {
  post: BlogPost;
  showMoreButton?: boolean;
}

export const AuthorInfo = ({
  post,
  showMoreButton = true,
}: AuthorInfoProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
          <AvatarImage
            src={
              post.author.avatar ||
              "https://github.com/shadcn.png"
            }
          />
          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
            {post.author.name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-lg">{post.author.name}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            <span>•</span>
            {post.readTime}
            <span>•</span>
            <Eye className="w-3 h-3" />
            <span>{post.viewCount} views</span>
          </div>
        </div>
      </div>
      {showMoreButton && (
        <Button variant="ghost" size="sm" className="hover:bg-muted/50">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};
