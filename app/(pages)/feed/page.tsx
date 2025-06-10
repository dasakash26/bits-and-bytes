import React from "react";
import { ProfileCard } from "@/components/Cards/ProfileCard";
import { NewPostInput } from "@/components/post/NewPostInput";
import { FeedPost } from "@/components/FeedPost";
import { TrendingCard } from "@/components/Cards/TrendingCard";
import blogPosts from "@/data/posts";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <ProfileCard />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            <NewPostInput />
            <div className="space-y-4">
              {blogPosts.map((post: any) => (
                <FeedPost key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <TrendingCard />
          </div>
        </div>
      </div>
    </div>
  );
}
