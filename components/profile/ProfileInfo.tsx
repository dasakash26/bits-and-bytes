"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Calendar,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Edit3,
} from "lucide-react";
import { User } from "@/types/user";

interface ProfileInfoProps {
  profileData: User;
  setProfileData: (data: User) => void;
  isEditing: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profileData,
  setProfileData,
  isEditing,
}) => {
  const extractUsername = (url: string, platform: string) => {
    if (!url) return "";

    // If it's already just a username (no http/https), return as is
    if (!url.includes("http") && !url.includes(".com")) {
      return url.replace("@", "");
    }

    try {
      const urlObj = new URL(url.includes("http") ? url : `https://${url}`);
      const pathname = urlObj.pathname;

      switch (platform) {
        case "github":
          return pathname.split("/")[1] || "";
        case "twitter":
          return pathname.split("/")[1] || "";
        case "linkedin":
          return pathname.split("/in/")[1]?.split("/")[0] || "";
        default:
          return urlObj.hostname.replace("www.", "");
      }
    } catch {
      return url;
    }
  };

  const socialLinks = [
    {
      key: "website" as keyof User,
      icon: Globe,
      label: "Website",
      placeholder: "yoursite.com",
      display: (value: string) => extractUsername(value, "website"),
    },
    {
      key: "github" as keyof User,
      icon: Github,
      label: "GitHub",
      placeholder: "username",
      display: (value: string) => `@${extractUsername(value, "github")}`,
    },
    {
      key: "twitter" as keyof User,
      icon: Twitter,
      label: "Twitter",
      placeholder: "username",
      display: (value: string) => `@${extractUsername(value, "twitter")}`,
    },
    {
      key: "linkedin" as keyof User,
      icon: Linkedin,
      label: "LinkedIn",
      placeholder: "username",
      display: (value: string) => extractUsername(value, "linkedin"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* About Section - Enhanced */}
      <div className="bg-gradient-to-br from-card via-card to-card/95 border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            About
          </h2>
          {isEditing && (
            <div className="p-2 bg-primary/10 rounded-xl">
              <Edit3 className="w-4 h-4 text-primary" />
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="relative">
            <Textarea
              value={profileData.bio || ""}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  bio: e.target.value,
                })
              }
              className="min-h-[100px] resize-none border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 text-sm leading-relaxed focus:border-primary/50 focus:ring-2 focus:ring-primary/10 bg-muted/20 placeholder:text-muted-foreground/60 transition-all duration-200"
              placeholder="Share your story, expertise, and what makes you unique..."
            />
            <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
              {profileData.bio?.length || 0}/500
            </div>
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-foreground/90">
            {profileData.bio ? (
              <p className="whitespace-pre-wrap">{profileData.bio}</p>
            ) : (
              <div className="flex items-center justify-center py-8 px-4 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/10">
                <span className="text-muted-foreground italic text-center">
                  No bio added yet. Share something about yourself!
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Info - Enhanced */}
      <div className="bg-gradient-to-br from-card via-card to-card/95 border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-5">
          Contact & Links
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email - Enhanced */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border border-blue-200/20 dark:border-blue-700/20 hover:scale-[1.02] transition-all duration-200">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer truncate font-medium">
              {profileData.email}
            </span>
          </div>

          {/* Location - Enhanced */}
          {(isEditing || profileData.location) && (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-200/20 dark:border-green-700/20 hover:scale-[1.02] transition-all duration-200">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              {isEditing ? (
                <Input
                  value={profileData.location || ""}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      location: e.target.value,
                    })
                  }
                  placeholder="Add your location"
                  className="border-0 bg-transparent p-0 text-sm focus:ring-0 flex-1 font-medium"
                />
              ) : (
                <span className="text-green-700 dark:text-green-300 truncate font-medium">
                  {profileData.location || "Location not specified"}
                </span>
              )}
            </div>
          )}

          {/* Social Links - Enhanced Grid */}
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            const value = profileData[link.key] as string;

            if (!isEditing && !value) return null;

            const colors = [
              {
                bg: "from-purple-50/50 to-indigo-50/50 dark:from-purple-900/10 dark:to-indigo-900/10",
                border: "border-purple-200/20 dark:border-purple-700/20",
                icon: "bg-purple-100 dark:bg-purple-900/30",
                iconColor: "text-purple-600 dark:text-purple-400",
                text: "text-purple-700 dark:text-purple-300",
              },
              {
                bg: "from-gray-50/50 to-slate-50/50 dark:from-gray-900/10 dark:to-slate-900/10",
                border: "border-gray-200/20 dark:border-gray-700/20",
                icon: "bg-gray-100 dark:bg-gray-900/30",
                iconColor: "text-gray-600 dark:text-gray-400",
                text: "text-gray-700 dark:text-gray-300",
              },
              {
                bg: "from-sky-50/50 to-blue-50/50 dark:from-sky-900/10 dark:to-blue-900/10",
                border: "border-sky-200/20 dark:border-sky-700/20",
                icon: "bg-sky-100 dark:bg-sky-900/30",
                iconColor: "text-sky-600 dark:text-sky-400",
                text: "text-sky-700 dark:text-sky-300",
              },
              {
                bg: "from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10",
                border: "border-blue-200/20 dark:border-blue-700/20",
                icon: "bg-blue-100 dark:bg-blue-900/30",
                iconColor: "text-blue-600 dark:text-blue-400",
                text: "text-blue-700 dark:text-blue-300",
              },
            ];

            const colorScheme = colors[index % colors.length];

            return (
              <div
                key={link.key}
                className={`flex items-center gap-3 p-3 bg-gradient-to-r ${colorScheme.bg} rounded-xl border ${colorScheme.border} hover:scale-[1.02] transition-transform duration-200`}
              >
                <div className={`p-2 ${colorScheme.icon} rounded-lg`}>
                  <Icon className={`w-4 h-4 ${colorScheme.iconColor}`} />
                </div>
                {isEditing ? (
                  <Input
                    value={value || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        [link.key]: e.target.value,
                      })
                    }
                    placeholder={`Add your ${link.label.toLowerCase()}`}
                    className="border-0 bg-transparent p-0 text-sm focus:ring-0 flex-1 font-medium"
                  />
                ) : value ? (
                  <span
                    className={`${colorScheme.text} hover:underline cursor-pointer truncate font-medium`}
                  >
                    {link.display(value)}
                  </span>
                ) : null}
              </div>
            );
          })}

          {/* Join Date - Enhanced - Full Width */}
          <div className="md:col-span-2 flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl border border-amber-200/20 dark:border-amber-700/20 hover:scale-[1.01] transition-all duration-200">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              Joined{" "}
              {new Date(profileData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Skills/Badges - Enhanced */}
      {profileData.badges && profileData.badges.length > 0 && (
        <div className="bg-gradient-to-br from-card via-card to-card/95 border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-5">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {profileData.badges.slice(0, 12).map((badge, index) => (
              <span
                key={index}
                className="group px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 hover:from-primary/20 hover:to-primary/15 text-primary border border-primary/20 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md cursor-default text-center"
              >
                {badge}
              </span>
            ))}
            {profileData.badges.length > 12 && (
              <span className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-muted/80 to-muted/60 text-muted-foreground rounded-full border border-muted-foreground/20 hover:scale-105 transition-transform duration-200 cursor-default text-center">
                +{profileData.badges.length - 12} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
