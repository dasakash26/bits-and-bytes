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

export const ProfileCard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleCardClick = () => {
    if (session) {
      router.push("/profile/{session.user.id}");
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

  // Use session data or fallback to default values
  const userName = session?.user?.name || "Guest User";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || "";
  const userInitials = getInitials(userName);

  // Show loading state
  if (status === "loading") {
    return (
      <Card className="bg-card border-border shadow-sm overflow-hidden p-0">
        <div className="h-20 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col items-center -mt-10">
            <div className="w-20 h-20 border-4 border-background shadow-lg rounded-full bg-muted animate-pulse" />
            <div className="text-center mt-4 space-y-2">
              <div className="h-6 w-32 bg-muted rounded animate-pulse mx-auto" />
              <div className="h-5 w-24 bg-muted rounded-full animate-pulse mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`bg-card border-border shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-primary/30 overflow-hidden p-0 ${
        session ? "cursor-pointer" : ""
      }`}
    >
      {/* Header with Profile */}
      <div className="h-20 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <CardContent
        className="relative pt-0 pb-6"
        onClick={session ? handleCardClick : undefined}
      >
        <div className="flex flex-col items-center -mt-10">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-background shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-primary/70 text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {session && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-background flex items-center justify-center">
                <Star className="w-3 h-3 text-yellow-800 fill-current" />
              </div>
            )}
          </div>

          <div className="text-center mt-4 space-y-2">
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
              {userName}
            </h2>
            <p className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-sm">
              {session ? "Content Creator" : "Welcome!"}
            </p>
            {session && userEmail && (
              <p className="text-muted-foreground text-sm px-4 leading-relaxed max-w-xs">
                {userEmail}
              </p>
            )}
            {!session && (
              <p className="text-muted-foreground text-sm px-4 leading-relaxed max-w-xs">
                Sign in to access your profile and analytics
              </p>
            )}
          </div>

          {session && (
            <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <Calendar className="w-4 h-4" />
                <span>Joined 2024</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-4 w-full px-4">
            {session ? (
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={handleSignIn}
                className="w-full flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all"
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
          <CardHeader className="pb-4 pt-4 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
            <CardTitle className="text-lg font-semibold flex items-center gap-2 relative z-10">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-sm">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              Analytics Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-4">
              {analyticsData.overview.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                const gradient = colorMap[item.icon as keyof typeof colorMap];
                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group/metric hover:scale-105 hover:shadow-md"
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
