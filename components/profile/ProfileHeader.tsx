"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Edit, Save, X } from "lucide-react";
import { User } from "@/types/user";

interface ProfileHeaderProps {
  profileData: User & { posts?: any[] };
  setProfileData: (data: User) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isOwner: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profileData,
  setProfileData,
  isEditing,
  setIsEditing,
  isOwner,
  onSave,
  onCancel,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = profileData.name || "Unknown User";
  const userImage = profileData.image || "";
  const userInitials = getInitials(displayName);

  return (
    <div className="relative bg-white dark:bg-card">
      {/* LinkedIn-style Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 relative">
        {/* Optional: Add cover photo upload here */}
      </div>

      {/* Main Profile Section */}
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          {/* Left Side - Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row sm:items-end -mt-20 sm:-mt-16">
            {/* Avatar */}
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-card shadow-lg">
                <AvatarImage
                  src={userImage}
                  alt={displayName}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-500 text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name and Title */}
            <div className="sm:mb-4">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={profileData.name || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        name: e.target.value,
                      })
                    }
                    className="text-2xl font-bold border-none p-0 h-auto bg-transparent"
                    placeholder="Enter your name"
                  />
                  <Input
                    value={profileData.title || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        title: e.target.value,
                      })
                    }
                    className="text-lg text-muted-foreground border-none p-0 h-auto bg-transparent"
                    placeholder="Enter your headline"
                  />
                  <Input
                    value={profileData.location || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      })
                    }
                    className="text-sm text-muted-foreground border-none p-0 h-auto bg-transparent"
                    placeholder="Enter your location"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {displayName}
                  </h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    {profileData.title || "Add a professional headline"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profileData.location || "Add location"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Edit Controls */}
          {isOwner && (
            <div className="flex gap-2 mt-4 sm:mt-0">
              {isEditing ? (
                <>
                  <Button
                    onClick={onSave}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onCancel}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit profile
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Post Stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-medium text-foreground">
              {profileData.posts?.length || 0}
            </span>
            posts
          </span>
        </div>
      </div>
    </div>
  );
};
