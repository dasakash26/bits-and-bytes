"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { BlogPost } from "@/types/blog";
import { FileText, Bookmark, Edit3, Plus } from "lucide-react";
import { PostCard } from "./PostCard";

interface ProfileContentProps {
  profileData: User;
  userPosts: BlogPost[];
  savedPosts: BlogPost[];
  drafts: BlogPost[];
  isOwner?: boolean;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  profileData,
  userPosts,
  savedPosts,
  drafts,
  isOwner = false,
}) => {
  const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionText,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    actionText?: string;
  }) => (
    <div className="text-center py-20">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-muted via-muted/80 to-muted/60 rounded-2xl flex items-center justify-center shadow-inner">
        <Icon className="w-10 h-10 text-muted-foreground/70" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground text-base max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && isOwner && (
        <Button className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="w-4 h-4" />
          {actionText}
        </Button>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
      <Tabs defaultValue="posts" className="w-full">
        <div className="bg-gradient-to-r from-background via-muted/5 to-background border-b border-border p-6 pb-0">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30 backdrop-blur-sm rounded-xl p-1 mb-4">
            <TabsTrigger
              value="posts"
              className="flex items-center gap-2 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Posts</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {userPosts.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="flex items-center gap-2 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
              {isOwner && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {savedPosts.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="drafts"
              className="flex items-center gap-2 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Drafts</span>
              {isOwner && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {drafts.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Posts Tab */}
        <TabsContent value="posts" className="p-8 mt-0">
          {userPosts.length > 0 ? (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="transform hover:scale-[1.01] transition-transform duration-200"
                >
                  <PostCard
                    post={post}
                    isLiked={false} // TODO: Check if current user liked this post
                    isOwner={isOwner}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title={`${
                profileData.name?.split(" ")[0] || "User"
              } hasn't posted yet`}
              description="Share your thoughts, ideas, and expertise with the community. Your first post is just a click away!"
              actionText={isOwner ? "Write your first post" : undefined}
            />
          )}
        </TabsContent>

        {/* Saved Tab */}
        <TabsContent value="saved" className="p-8 mt-0">
          {isOwner ? (
            savedPosts.length > 0 ? (
              <div className="space-y-6">
                {savedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="transform hover:scale-[1.01] transition-transform duration-200"
                  >
                    <PostCard post={post} isLiked={false} isOwner={isOwner} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Bookmark}
                title="No saved posts yet"
                description="Bookmark posts you want to read later or reference again. They'll appear here for easy access."
              />
            )
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 dark:from-amber-900/30 dark:via-amber-800/20 dark:to-orange-900/30 rounded-2xl flex items-center justify-center shadow-inner">
                <Bookmark className="w-10 h-10 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Private Collection
              </h3>
              <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
                Saved posts are personal bookmarks, only visible to the profile
                owner.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Drafts Tab */}
        <TabsContent value="drafts" className="p-8 mt-0">
          {isOwner ? (
            drafts.length > 0 ? (
              <div className="space-y-6">
                {drafts.map((post) => (
                  <div
                    key={post.id}
                    className="transform hover:scale-[1.01] transition-transform duration-200"
                  >
                    <PostCard post={post} isLiked={false} isOwner={true} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Edit3}
                title="No drafts yet"
                description="Start writing and save drafts to polish later. Your ideas deserve the perfect words."
                actionText="Create a draft"
              />
            )
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-100 dark:from-purple-900/30 dark:via-purple-800/20 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center shadow-inner">
                <Edit3 className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Work in Progress
              </h3>
              <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
                Draft posts are private workspace areas, only visible to the
                author.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
