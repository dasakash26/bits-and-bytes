"use client";
import React, { useEffect, useState } from "react";
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

const iconMap = {
  TrendingUp,
  Eye,
  Search,
  Heart,
};

const colorMap = {
  TrendingUp: "from-primary to-accent",
  Eye: "from-success to-accent",
  Search: "from-warning to-destructive",
  Heart: "from-primary to-destructive",
};

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

interface AnalyticsItem {
  title: string;
  value: number;
  change: string;
  icon: keyof typeof iconMap;
}

export const ProfileCard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch real analytics data when user is signed in
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!session?.user?.email) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/user/analytics?email=${session.user.email}`
        );
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [session?.user?.email]);

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
    if (session?.user?.id) {
      router.push(`/profile/${encodeURIComponent(session.user.id)}`);
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

  // Real analytics data structure with proper typing
  const realAnalytics: AnalyticsItem[] | null = analytics
    ? [
        {
          title: "Posts",
          value: analytics.totalPosts,
          change:
            analytics.postsGrowth > 0
              ? `+${analytics.postsGrowth}%`
              : `${analytics.postsGrowth}%`,
          icon: "TrendingUp",
        },
        {
          title: "Views",
          value: analytics.totalViews,
          change:
            analytics.viewsGrowth > 0
              ? `+${analytics.viewsGrowth}%`
              : `${analytics.viewsGrowth}%`,
          icon: "Eye",
        },
        {
          title: "Likes",
          value: analytics.totalLikes,
          change:
            analytics.likesGrowth > 0
              ? `+${analytics.likesGrowth}%`
              : `${analytics.likesGrowth}%`,
          icon: "Heart",
        },
        {
          title: "Comments",
          value: analytics.totalComments,
          change:
            analytics.commentsGrowth > 0
              ? `+${analytics.commentsGrowth}%`
              : `${analytics.commentsGrowth}%`,
          icon: "Search",
        },
      ]
    : null;

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
                {session ? "Developer" : "Future Innovator"}
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
                <span>Global</span>
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
        <div className="border-t border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-md">
                <BarChart3 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Analytics
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0 pb-5 px-4">
            {loading ? (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-border/50 animate-pulse bg-card/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 bg-muted rounded-md"></div>
                      <div className="w-8 h-3 bg-muted rounded-full"></div>
                    </div>
                    <div className="w-12 h-5 bg-muted rounded mb-1"></div>
                    <div className="w-16 h-2.5 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            ) : realAnalytics ? (
              <div className="grid grid-cols-2 gap-3">
                {realAnalytics.map((item, index) => {
                  const Icon = iconMap[item.icon];
                  const gradient = colorMap[item.icon];
                  const isPositiveChange = item.change.includes("+");

                  return (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-border/50 hover:border-primary/40 bg-card/80 hover:bg-card transition-all duration-300 group/metric hover:scale-[1.02] hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`p-1.5 rounded-md bg-gradient-to-br ${gradient} shadow-sm group-hover/metric:scale-110 transition-transform duration-200`}
                        >
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span
                          className={`text-xs font-semibold px-1.5 py-0.5 rounded-full border text-center min-w-[2rem] ${
                            isPositiveChange
                              ? "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                              : "text-orange-700 bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
                          }`}
                        >
                          {item.change}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-foreground group-hover/metric:text-primary transition-colors duration-200 mb-1">
                        {item.value.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-medium">
                          {item.title}
                        </span>
                        <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-500`}
                            style={{
                              width: `${Math.min(item.value * 10, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No analytics data available</p>
              </div>
            )}
          </CardContent>
        </div>
      )}
    </Card>
  );
};
