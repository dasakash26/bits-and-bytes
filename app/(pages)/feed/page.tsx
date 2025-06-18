"no-store";
import React from "react";
import { ProfileCard } from "@/components/Cards/ProfileCard";
import { NewPostInput } from "@/components/post/NewPostInput";
import { FeedPost } from "@/components/FeedPost";
import { TrendingCard } from "@/components/Cards/TrendingCard";
import { prisma } from "@/lib/prisma";
import { BlogPost } from "@/types/blog";

async function getPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: true,
        comments: {
          include: {
            author: true,
            replies: {
              include: {
                author: true,
              },
            },
          },
        },
        category: true,
        likes: true,
        views: true,
        savedBy: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function FeedPage() {
  let time = Date.now();
  const posts = await getPosts();
  time = Date.now() - time;
  console.log(">> Fetching posts took:", time, "ms");
  console.log(">> Fetched posts of length:", posts.length);
  
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
              {posts.length > 0 ? (
                posts.map((post) => <FeedPost key={post.id} post={post} />)
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No posts available yet. Be the first to create one!
                  </p>
                </div>
              )}
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
