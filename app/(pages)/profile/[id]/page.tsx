"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { updateUser } from "@/app/actions/updateUser";
import { User } from "@/types/user";
import { BlogPost } from "@/types/blog";
import {
  ProfileHeader,
  ProfileInfo,
  ProfileAnalytics,
  ProfileContent,
  ProfileSkeleton,
} from "@/components/profile";

// Extended User type with posts
interface UserWithPosts extends User {
  posts?: BlogPost[];
  savedPosts?: BlogPost[];
}

// Default user data structure
const defaultUserData: UserWithPosts = {
  id: "",
  name: "Unknown User",
  email: "",
  username: "",
  bio: "",
  title: "",
  location: "",
  website: "",
  twitter: "",
  github: "",
  linkedin: "",
  postsCount: 0,
  badges: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  posts: [],
  savedPosts: [],
};

// Analytics interface
interface Analytics {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  postsGrowth: number;
  viewsGrowth: number;
  likesGrowth: number;
  commentsGrowth: number;
}

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] =
    useState<UserWithPosts>(defaultUserData);
  const [originalData, setOriginalData] =
    useState<UserWithPosts>(defaultUserData);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Fetch user data from API using ID parameter
  useEffect(() => {
    const fetchUserData = async () => {
      const resolvedParams = await params;
      if (!resolvedParams.id) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/user/${resolvedParams.id}`);
        if (response.ok) {
          const userData = await response.json();
          setProfileData(userData);
          setOriginalData(userData);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params]);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!profileData.email) return;

      setAnalyticsLoading(true);
      try {
        const response = await fetch(
          `/api/user/analytics?email=${profileData.email}`
        );
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    if (profileData.email) {
      fetchAnalytics();
    }
  }, [profileData.email]);

  const handleSave = async () => {
    try {
      await updateUser(profileData);
      setOriginalData(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  const isOwner = session?.user?.email === profileData.email;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
        
          <div className="mb-6">
            <div className="bg-white dark:bg-card border border-border rounded-lg shadow-sm overflow-hidden">
              <ProfileHeader
                profileData={profileData}
                setProfileData={setProfileData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isOwner={isOwner}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Profile Info (Smaller) */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileInfo
                profileData={profileData}
                setProfileData={setProfileData}
                isEditing={isEditing}
              />
            </div>

            {/* Right Column - Analytics (Larger) */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileAnalytics
                analytics={analytics}
                loading={analyticsLoading}
              />
            </div>
          </div>

          {/* Posts/Saved/Drafts Section - Full Width */}
          <div className="mt-6">
            <ProfileContent
              profileData={profileData}
              userPosts={profileData.posts || []}
              savedPosts={isOwner ? profileData.savedPosts || [] : []}
              drafts={[]} // TODO: Implement drafts functionality
              isOwner={isOwner}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
