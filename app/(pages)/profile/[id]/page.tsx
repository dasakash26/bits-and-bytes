"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Calendar,
  Link as LinkIcon,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Star,
  Edit,
  Save,
  X,
  BarChart3,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { updateUser } from "@/app/actions/updateUser";
import { User } from "@/types/user";

// Default user data structure
const defaultUserData: User = {
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
};

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<User>(defaultUserData);
  const [originalData, setOriginalData] = useState<User>(defaultUserData);
  const [loading, setLoading] = useState(true);

  // Fetch user data from API using email parameter
  useEffect(() => {
    const fetchUserData = async () => {
      const resolvedParams = await params;
      if (!resolvedParams.id) return;
      console.log(`/api/user/${resolvedParams.id}`);
      setLoading(true);
      try {
        const response = await fetch(`/api/user/${resolvedParams.id}`);
        console.log(response);
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

  // Generate initials from user's name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Use profile data instead of session data
  const displayName = profileData.name || "Unknown User";
  const userEmail = profileData.email || "";
  const userImage = profileData.image || "";
  const userInitials = getInitials(displayName);

  const handleSave = async () => {
    try {
      console.log("Saving profile data:", profileData);
      const updatedUser = await updateUser(profileData);
      setOriginalData(profileData); // Update original data after successful save
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData); // Reset to original data
    setIsEditing(false);
  };

  // Check if current user is the profile owner
  const isOwner = session?.user?.email === profileData.email;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="relative bg-card border-border shadow-lg overflow-hidden animate-pulse">
                  <div className="h-32 bg-muted"></div>
                  <CardContent className="relative pt-0 pb-6 px-6">
                    <div className="flex flex-col items-center -mt-16">
                      <div className="w-28 h-28 bg-muted rounded-full"></div>
                      <div className="text-center mt-6 space-y-4 w-full">
                        <div className="h-8 bg-muted rounded w-48 mx-auto"></div>
                        <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
                        <div className="h-20 bg-muted rounded w-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="relative bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden p-0">
                <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border-b border-border relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/3 rounded-full blur-lg" />
                </div>

                <CardContent className="relative pt-0 pb-6 px-6">
                  <div className="flex flex-col items-center -mt-16">
                    <div className="relative">
                      <Avatar className="w-28 h-28 border-4 border-background shadow-2xl ring-4 ring-primary/10 transition-transform duration-300 hover:scale-105">
                        <AvatarImage
                          src={userImage}
                          alt={displayName}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/70 text-white">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      {profileData.id && (
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                          <Star className="w-5 h-5 text-yellow-800 fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Edit Button */}
                    {isOwner && (
                      <div className="mt-4">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSave}
                              className="flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              Save Profile
                            </Button>
                            <Button
                              variant="outline"
                              onClick={handleCancel}
                              className="flex items-center gap-2"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => setIsEditing(true)}
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Profile
                          </Button>
                        )}
                      </div>
                    )}

                    {/* User Info Section */}
                    <div className="text-center mt-6 space-y-6 w-full">
                      <div className="space-y-3">
                        {isEditing ? (
                          <Input
                            value={profileData.name || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                name: e.target.value,
                              })
                            }
                            className="w-64 text-center text-4xl font-bold mx-auto"
                            placeholder="Enter your name"
                          />
                        ) : (
                          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                            {displayName}
                          </h1>
                        )}

                        {/* Username */}
                        {isEditing ? (
                          <div className="flex justify-center">
                            <div className="flex items-center">
                              <span className="text-primary font-semibold text-xl">
                                @
                              </span>
                              <Input
                                value={profileData.username || ""}
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    username: e.target.value,
                                  })
                                }
                                className="w-32 text-center text-xl font-semibold text-primary border-none focus:ring-0 p-0"
                                placeholder="username"
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="text-primary font-semibold text-xl">
                            @{profileData.username}
                          </p>
                        )}

                        {/* Editable Title */}
                        <div className="flex justify-center">
                          {isEditing ? (
                            <Input
                              value={profileData.title || ""}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  title: e.target.value,
                                })
                              }
                              className="w-48 text-center"
                              placeholder="Enter your role"
                            />
                          ) : (
                            <div className="inline-flex items-center bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                              {profileData.title || "Set your role"}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bio Section */}
                      <div className="bg-muted/30 border border-border/50 rounded-xl p-6 text-left max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            About
                          </h3>
                        </div>

                        {isEditing ? (
                          <Textarea
                            value={profileData.bio || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                bio: e.target.value,
                              })
                            }
                            className="text-sm leading-relaxed resize-none"
                            rows={4}
                            placeholder="Tell us about yourself..."
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {profileData.bio || "Tell us about yourself..."}
                          </p>
                        )}
                      </div>

                      {/* Email Display */}
                      {userEmail && (
                        <div className="flex justify-center">
                          <p className="text-muted-foreground text-sm bg-muted/20 px-4 py-2 rounded-lg border border-border/50">
                            {userEmail}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                      {/* Location */}
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {isEditing ? (
                          <Input
                            value={profileData.location || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                location: e.target.value,
                              })
                            }
                            className="h-8 w-32 text-sm"
                            placeholder="Location"
                          />
                        ) : (
                          <span>{profileData.location || "Add location"}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date().getFullYear()}</span>
                      </div>

                      {/* Website */}
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        {isEditing ? (
                          <Input
                            value={profileData.website || ""}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                website: e.target.value,
                              })
                            }
                            className="h-8 w-40 text-sm"
                            placeholder="website.com"
                          />
                        ) : (
                          <span>{profileData.website || "Add website"}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{userEmail}</span>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="mt-8 space-y-4">
                      <h4 className="text-sm font-semibold text-foreground text-center">
                        Social Links
                      </h4>

                      {isEditing ? (
                        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                          {[
                            {
                              key: "github",
                              icon: Github,
                              label: "GitHub",
                              placeholder: "username",
                            },
                            {
                              key: "twitter",
                              icon: Twitter,
                              label: "Twitter",
                              placeholder: "username",
                            },
                            {
                              key: "linkedin",
                              icon: Linkedin,
                              label: "LinkedIn",
                              placeholder: "profile-name",
                            },
                            {
                              key: "website",
                              icon: Globe,
                              label: "Website",
                              placeholder: "website.com",
                            },
                          ].map(({ key, icon: Icon, label, placeholder }) => (
                            <div key={key} className="space-y-2">
                              <label className="text-xs text-muted-foreground flex items-center gap-2">
                                <Icon className="w-3 h-3" />
                                {label}
                              </label>
                              <Input
                                value={
                                  (profileData[key as keyof User] as string) ||
                                  ""
                                }
                                onChange={(e) =>
                                  setProfileData({
                                    ...profileData,
                                    [key]: e.target.value,
                                  })
                                }
                                className="h-8 text-sm"
                                placeholder={placeholder}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-3 justify-center">
                          {[
                            { Icon: Github, key: "github" },
                            { Icon: Twitter, key: "twitter" },
                            { Icon: Linkedin, key: "linkedin" },
                            { Icon: Globe, key: "website" },
                          ].map(({ Icon }, index) => (
                            <div
                              key={index}
                              className="p-3 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted hover:border-primary/30 transition-all duration-200 hover:scale-105"
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Badges */}
                    {profileData.badges && profileData.badges.length > 0 && (
                      <div className="mt-8">
                        <h4 className="text-sm font-semibold text-foreground text-center mb-4">
                          Badges
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {profileData.badges.map((badge, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Analytics */}
            {profileData.id && (
              <div className="space-y-6">
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      Analytics Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Posts Analytics */}
                    <div className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                          <Edit className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xl font-bold">
                            {profileData.postsCount || 0}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Published Posts
                          </div>
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                          +0%
                        </span>
                      </div>
                      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-0" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="mt-8">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 border border-border/50">
                <TabsTrigger
                  value="posts"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Posts ({profileData.postsCount || 0})
                </TabsTrigger>
                <TabsTrigger
                  value="drafts"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Drafts (0)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-6">
                <Card className="border-border/50 bg-muted/20">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground text-lg">
                      No posts yet. Check back later! 📝
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="drafts" className="mt-6">
                <Card className="border-border/50 bg-muted/20">
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground text-lg">
                      No drafts yet. Start writing! ✍️
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
