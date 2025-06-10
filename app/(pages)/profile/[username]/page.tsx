"use client";
import React, { useState } from "react";
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
  TrendingUp,
  Eye,
  Search,
  Heart,
  BarChart3,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";
import analyticsData from "@/data/analytics.json";

// Dummy user data synced with ProfileCard
const dummyUserData = {
  bio: "Code wizard by day, debugging detective by night 🕵️‍♂️ Turning caffeine into features since 2021. Currently breaking things in production and calling it 'iterative development' ☕️💻",
  role: "Full-Stack Sorcerer",
  location: "India",
  joinDate: "2024",
  website: "akashdas.dev",
  email: "contact@akashdas.dev",
  followers: 1247,
  following: 324,
  posts: 42,
  drafts: 15,
  socials: {
    github: "dasakash26",
    twitter: "dasakash26",
    linkedin: "akash-das-dev",
    website: "akashdas.dev",
  },
};

const iconMap = {
  TrendingUp,
  Eye,
  Search,
  Heart,
};

const colorMap = {
  TrendingUp: "from-blue-500 to-cyan-500",
  Eye: "from-emerald-500 to-teal-500",
  Search: "from-orange-500 to-red-500",
  Heart: "from-purple-500 to-pink-500",
};

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { data: session } = useSession();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [profileData, setProfileData] = useState(dummyUserData);
  const [tempValue, setTempValue] = useState("");

  // Generate initials from user's name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Use session data or fallback values
  const userName = session?.user?.name || "Guest User";
  const userEmail = session?.user?.email || dummyUserData.email;
  const userImage = session?.user?.image || "";
  const userInitials = getInitials(userName);

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = (field: string) => {
    setProfileData({ ...profileData, [field]: tempValue });
    setEditingField(null);
    setTempValue("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const isOwner = session;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Universal Edit Button */}
          {isOwner && (
            <div className="flex justify-end mb-4">
              <Button
                variant={editingField ? "default" : "outline"}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  editingField
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-muted"
                }`}
                onClick={() =>
                  setEditingField(editingField ? null : "universal")
                }
              >
                <Settings className="w-4 h-4" />
                {editingField ? "Exit Edit Mode" : "Edit Profile"}
              </Button>
            </div>
          )}

          {/* Edit Mode Indicator */}
          {editingField && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
              <p className="text-sm text-primary font-medium">
                🎨 Edit Mode Active - Click on any field to modify it
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card
                className={`relative bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden p-0 ${
                  editingField ? "ring-2 ring-primary/20" : ""
                }`}
              >
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
                          alt={userName}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/70 text-white">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      {session && (
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                          <Star className="w-5 h-5 text-yellow-800 fill-current" />
                        </div>
                      )}
                    </div>

                    {/* User Info Section */}
                    <div className="text-center mt-8 space-y-6 w-full">
                      <div className="space-y-3">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                          {userName}
                        </h1>
                        <p className="text-primary font-semibold text-xl">
                          @{params.username}
                        </p>

                        {/* Editable Role */}
                        <div className="flex justify-center">
                          {editingField === "role" ? (
                            <div className="flex items-center gap-2 p-2 bg-background rounded-lg border border-primary shadow-sm">
                              <Input
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="w-48 text-center bg-transparent border-none focus:ring-0 focus:outline-none"
                                placeholder="Enter role"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={() => handleSave("role")}
                                className="h-8"
                              >
                                <Save className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancel}
                                className="h-8"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div
                              className={`inline-flex items-center bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                editingField
                                  ? "cursor-pointer hover:bg-primary/20 hover:scale-105 shadow-md ring-2 ring-primary/10"
                                  : ""
                              }`}
                              onClick={() =>
                                editingField &&
                                handleEdit("role", profileData.role)
                              }
                            >
                              {session ? profileData.role : "Future Innovator"}
                              {editingField && (
                                <Edit className="w-3 h-3 ml-2 opacity-60" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bio Section */}
                      <div
                        className={`bg-muted/30 border border-border/50 rounded-xl p-6 text-left max-w-2xl mx-auto transition-all duration-200 ${
                          editingField && editingField !== "bio"
                            ? "hover:bg-muted/40 hover:border-primary/30 cursor-pointer"
                            : ""
                        }`}
                        onClick={() =>
                          editingField &&
                          editingField !== "bio" &&
                          handleEdit("bio", profileData.bio)
                        }
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            About
                          </h3>
                          {editingField && editingField !== "bio" && (
                            <Edit className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>

                        {editingField === "bio" ? (
                          <div className="space-y-3">
                            <Textarea
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="text-sm leading-relaxed resize-none bg-background border-primary focus:border-primary focus:ring-primary/20"
                              rows={4}
                              placeholder="Tell us about yourself..."
                              autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                onClick={() => handleSave("bio")}
                              >
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancel}
                              >
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {session
                              ? profileData.bio
                              : "Ready to join our community of digital dreamers and code conjurers! ✨🚀"}
                          </p>
                        )}
                      </div>

                      {/* Email Display */}
                      {session && userEmail && (
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
                      <div className="flex items-center gap-2 hover:text-primary transition-colors">
                        <MapPin className="w-4 h-4" />
                        {editingField === "location" ? (
                          <div className="flex items-center gap-2 p-1 bg-background rounded border border-primary">
                            <Input
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="h-6 w-32 text-sm bg-transparent border-none focus:ring-0"
                              placeholder="Location"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSave("location")}
                              className="h-6 w-6 p-0"
                            >
                              <Save className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancel}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <span
                            className={`transition-all duration-200 ${
                              editingField
                                ? "cursor-pointer hover:bg-primary/10 hover:text-primary px-2 py-1 rounded border-2 border-transparent hover:border-primary/20"
                                : ""
                            }`}
                            onClick={() =>
                              editingField &&
                              handleEdit("location", profileData.location)
                            }
                          >
                            {profileData.location}
                            {editingField && (
                              <Edit className="w-3 h-3 inline ml-1 opacity-60" />
                            )}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {profileData.joinDate}</span>
                      </div>

                      {/* Website */}
                      <div className="flex items-center gap-2 hover:text-primary transition-colors">
                        <LinkIcon className="w-4 h-4" />
                        {editingField === "website" ? (
                          <div className="flex items-center gap-2 p-1 bg-background rounded border border-primary">
                            <Input
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              className="h-6 w-40 text-sm bg-transparent border-none focus:ring-0"
                              placeholder="website.com"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSave("website")}
                              className="h-6 w-6 p-0"
                            >
                              <Save className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancel}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <span
                            className={`transition-all duration-200 ${
                              editingField
                                ? "cursor-pointer hover:bg-primary/10 hover:text-primary px-2 py-1 rounded border-2 border-transparent hover:border-primary/20"
                                : ""
                            }`}
                            onClick={() =>
                              editingField &&
                              handleEdit("website", profileData.website)
                            }
                          >
                            {profileData.website}
                            {editingField && (
                              <Edit className="w-3 h-3 inline ml-1 opacity-60" />
                            )}
                          </span>
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
                        {editingField && editingField !== "socials" && (
                          <Edit className="w-3 h-3 inline ml-2 opacity-60" />
                        )}
                      </h4>

                      {editingField === "socials" ? (
                        <div className="space-y-4 max-w-md mx-auto p-4 bg-background rounded-lg border border-primary shadow-sm">
                          <div className="grid grid-cols-2 gap-3">
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
                                  value={JSON.parse(tempValue)[key] || ""}
                                  onChange={(e) => {
                                    const socials = JSON.parse(tempValue);
                                    socials[key] = e.target.value;
                                    setTempValue(JSON.stringify(socials));
                                  }}
                                  className="h-8 text-sm bg-background border-border focus:border-primary"
                                  placeholder={placeholder}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2 justify-center pt-2 border-t border-border">
                            <Button
                              size="sm"
                              onClick={() => {
                                setProfileData({
                                  ...profileData,
                                  socials: JSON.parse(tempValue),
                                });
                                setEditingField(null);
                                setTempValue("");
                              }}
                            >
                              <Save className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancel}
                            >
                              <X className="w-3 h-3 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`flex gap-3 justify-center transition-all duration-200 ${
                            editingField ? "cursor-pointer" : ""
                          }`}
                          onClick={() =>
                            editingField &&
                            handleEdit(
                              "socials",
                              JSON.stringify(profileData.socials)
                            )
                          }
                        >
                          {[
                            { Icon: Github, key: "github" },
                            { Icon: Twitter, key: "twitter" },
                            { Icon: Linkedin, key: "linkedin" },
                            { Icon: Globe, key: "website" },
                          ].map(({ Icon }, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted hover:border-primary/30 transition-all duration-200 hover:scale-105 group/social ${
                                editingField
                                  ? "ring-2 ring-primary/20 hover:ring-primary/40"
                                  : ""
                              }`}
                            >
                              <Icon className="w-5 h-5 group-hover/social:text-primary transition-colors" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Analytics */}
            {session && (
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
                    {/* Main Analytics */}
                    {analyticsData.overview.map((item, index) => {
                      const Icon = iconMap[item.icon as keyof typeof iconMap];
                      const gradient =
                        colorMap[item.icon as keyof typeof colorMap];
                      return (
                        <div
                          key={index}
                          className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xl font-bold">
                                {item.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.title}
                              </div>
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                              {item.change}
                            </span>
                          </div>
                          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${gradient} rounded-full w-3/4`}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* Divider */}
                    <div className="border-t border-border/50 my-4"></div>

                    {/* Posts Analytics */}
                    <div className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                          <Edit className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xl font-bold">
                            {profileData.posts}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Published Posts
                          </div>
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full">
                          +12%
                        </span>
                      </div>
                      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-4/5" />
                      </div>
                    </div>

                    {/* Drafts Analytics */}
                    <div className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                          <Save className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xl font-bold">
                            {profileData.drafts}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Draft Posts
                          </div>
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-full">
                          +3
                        </span>
                      </div>
                      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-2/3" />
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
                  Posts ({profileData.posts})
                </TabsTrigger>
                <TabsTrigger
                  value="drafts"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Drafts ({profileData.drafts})
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
