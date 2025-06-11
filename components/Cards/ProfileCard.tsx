"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Eye,
  Search,
  Heart,
  BarChart3,
  LogOut,
  LogIn,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";
import analyticsData from "@/data/analytics.json";
import EmailSignIn from "../EmailSignIn";

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

// Dummy user data
const dummyUserData = {
  bio: "Code wizard by day, debugging detective by night 🕵️‍♂️ Turning caffeine into features since 2021. Currently breaking things in production and calling it 'iterative development' ☕️💻",
  role: "Full-Stack Sorcerer",
  guestBio:
    "Ready to join our community of digital dreamers and code conjurers? Sign in and let's build something magical together! ✨🚀",
};

export const ProfileCard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Generate display name from email if name is not available
  const getDisplayName = (user: any) => {
    if (user?.name) return user.name;
    if (user?.email) {
      // Extract name from email (before @)
      const emailName = user.email.split("@")[0];
      // Capitalize first letter and replace dots/underscores with spaces
      return emailName
        .replace(/[._]/g, " ")
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return "Guest User";
  };

  const handleCardClick = () => {
    if (session) {
      // Create a slug from the user's name or use email
      const userSlug = userName.toLowerCase().replace(/\s+/g, "") || "user";
      router.push(`/profile/${userSlug}`);
    }
  };

  const handleSignOut = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await signOut();
  };

  const handleSignIn = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await signIn("google");
  };

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
  const userName = getDisplayName(session?.user) || "Guest User";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || "";
  const userInitials = getInitials(userName);
  const userBio = session ? dummyUserData.bio : dummyUserData.guestBio;
  const userRole = session ? dummyUserData.role : "Future Innovator";

  // Show loading state
  if (status === "loading") {
    return (
      <Card className="bg-card border-border shadow-lg overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        </div>
        <CardContent className="relative pt-0 pb-8 px-6">
          <div className="flex flex-col items-center -mt-12">
            <div className="w-24 h-24 border-4 border-background shadow-xl rounded-full bg-muted animate-pulse" />
            <div className="text-center mt-6 space-y-3 w-full">
              <div className="h-7 w-40 bg-muted rounded-lg animate-pulse mx-auto" />
              <div className="h-5 w-32 bg-muted rounded-full animate-pulse mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-primary/40 overflow-hidden ${
        session ? "cursor-pointer" : ""
      }`}
    >
      {/* Header */}
      <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <CardContent
        className="relative pt-0 pb-8 px-6"
        onClick={session ? handleCardClick : undefined}
      >
        <div className="flex flex-col items-center -mt-12">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300">
              <AvatarImage
                src={userImage}
                alt={userName}
                className="object-cover"
              />
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-primary/70 text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {session && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full border-3 border-background flex items-center justify-center shadow-lg">
                <Star className="w-3.5 h-3.5 text-yellow-800 fill-current" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-center mt-6 space-y-4 w-full">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                {userName}
              </h2>

              <div className="inline-flex items-center bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {userRole}
              </div>
            </div>

            {/* Email for signed-in users */}
            {session && userEmail && (
              <p className="text-muted-foreground text-sm bg-muted/20 px-3 py-2 rounded-lg border border-border/50">
                {userEmail}
              </p>
            )}
          </div>

          {/* Location & Date Info */}
          {session && (
            <div className="flex items-center gap-8 mt-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Calendar className="w-4 h-4" />
                <span>Joined 2024</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 w-full">
            {session ? (
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={handleSignIn}
                size="sm"
                className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                Sign In with Google
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      {/* Analytics Section - Only show when signed in */}
      {session && (
        <div className="border-t border-border bg-muted/20">
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="text-lg font-semibold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              Analytics Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0 pb-6">
            <div className="grid grid-cols-2 gap-4">
              {analyticsData.overview.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                const gradient = colorMap[item.icon as keyof typeof colorMap];
                return (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-300 group/metric hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-sm group-hover/metric:scale-110 transition-transform duration-200`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                        {item.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground group-hover/metric:text-primary transition-colors duration-200">
                      {item.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-1 flex items-center justify-between">
                      <span>{item.title}</span>
                      <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${gradient} rounded-full w-3/4`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
};
