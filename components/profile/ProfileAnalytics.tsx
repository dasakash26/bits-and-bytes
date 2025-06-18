"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Eye, Heart, MessageCircle } from "lucide-react";

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

interface ProfileAnalyticsProps {
  analytics: Analytics | null;
  loading: boolean;
}

const iconMap = {
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
};

const colorMap = {
  TrendingUp: "from-primary to-accent",
  Eye: "from-green-500 to-green-600",
  Heart: "from-red-500 to-pink-500",
  MessageCircle: "from-blue-500 to-blue-600",
};

export const ProfileAnalytics: React.FC<ProfileAnalyticsProps> = ({
  analytics,
  loading,
}) => {
  const analyticsData = analytics
    ? [
        {
          title: "Posts",
          value: analytics.totalPosts,
          change:
            analytics.postsGrowth > 0
              ? `+${analytics.postsGrowth}%`
              : `${analytics.postsGrowth}%`,
          icon: "TrendingUp" as keyof typeof iconMap,
          gradient: colorMap.TrendingUp,
        },
        {
          title: "Views",
          value: analytics.totalViews,
          change:
            analytics.viewsGrowth > 0
              ? `+${analytics.viewsGrowth}%`
              : `${analytics.viewsGrowth}%`,
          icon: "Eye" as keyof typeof iconMap,
          gradient: colorMap.Eye,
        },
        {
          title: "Likes",
          value: analytics.totalLikes,
          change:
            analytics.likesGrowth > 0
              ? `+${analytics.likesGrowth}%`
              : `${analytics.likesGrowth}%`,
          icon: "Heart" as keyof typeof iconMap,
          gradient: colorMap.Heart,
        },
        {
          title: "Comments",
          value: analytics.totalComments,
          change:
            analytics.commentsGrowth > 0
              ? `+${analytics.commentsGrowth}%`
              : `${analytics.commentsGrowth}%`,
          icon: "MessageCircle" as keyof typeof iconMap,
          gradient: colorMap.MessageCircle,
        },
      ]
    : null;

  return (
    <div className="bg-white dark:bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div>
                    <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                    <div className="w-12 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        ) : analyticsData ? (
          <div className="space-y-3">
            {analyticsData.map((item, index) => {
              const Icon = iconMap[item.icon];
              const isPositiveChange = item.change.includes("+");

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient}`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        {item.value.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.title}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      isPositiveChange
                        ? "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                        : "text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {item.change}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No analytics data available</p>
          </div>
        )}
      </div>
    </div>
  );
};
