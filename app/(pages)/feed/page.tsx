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
        author: {
          include: {
            user: true,
          },
        },
        category: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    // Transform the database data to match the BlogPost interface
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "", // Handle null by providing empty string
      authorId: post.authorId,
      author: {
        id: post.author.id,
        name: post.author.name,
        avatar: post.author.avatar || undefined,
        bio: post.author.bio || undefined,
        twitter: post.author.twitter || undefined,
        github: post.author.github || undefined,
        linkedin: post.author.linkedin || undefined,
        userId: post.author.userId || undefined, // Handle null
        user: post.author.user
          ? {
              id: post.author.user.id,
              name: post.author.user.name || undefined,
              email: post.author.user.email,
              emailVerified: post.author.user.emailVerified || undefined,
              image: post.author.user.image || undefined,
              username: post.author.user.username || undefined,
              bio: post.author.user.bio || undefined,
              title: post.author.user.title || undefined,
              location: post.author.user.location || undefined,
              website: post.author.user.website || undefined,
              twitter: post.author.user.twitter || undefined,
              github: post.author.user.github || undefined,
              linkedin: post.author.user.linkedin || undefined,
              postsCount: post.author.user.postsCount,
              badges: post.author.user.badges,
              createdAt: post.author.user.createdAt,
              updatedAt: post.author.user.updatedAt,
            }
          : undefined,
      },
      date: post.date,
      readTime: post.readTime || "5 min read", // Handle null
      categoryId: post.categoryId,
      category: {
        id: post.category.id,
        name: post.category.name,
        description: post.category.description || undefined,
        icon: post.category.icon || undefined,
      },
      tags: post.tags,
      image: post.image || "", // Handle null by providing empty string
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      viewCount: post.viewCount,
      content: post.content,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function FeedPage() {
  const posts = await getPosts();

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
