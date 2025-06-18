"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Card Skeleton */}
            <div className="lg:col-span-2">
              <Card className="relative bg-card border-border shadow-sm overflow-hidden animate-pulse">
                {/* Header Background */}
                <div className="h-32 bg-muted"></div>

                <CardContent className="relative pt-0 pb-6 px-6">
                  <div className="flex flex-col items-center -mt-16">
                    {/* Avatar Skeleton */}
                    <div className="w-28 h-28 bg-muted rounded-full border-4 border-background"></div>

                    {/* User Info Skeleton */}
                    <div className="text-center mt-6 space-y-4 w-full">
                      <div className="space-y-3">
                        <div className="h-8 bg-muted rounded w-48 mx-auto"></div>
                        <div className="h-6 bg-muted rounded w-32 mx-auto"></div>
                        <div className="h-8 bg-muted rounded w-40 mx-auto"></div>
                      </div>
                    </div>

                    {/* Bio Section Skeleton */}
                    <div className="w-full mt-8 space-y-6">
                      <div className="bg-muted/30 border border-border/50 rounded-xl p-6">
                        <div className="h-4 bg-muted rounded w-20 mb-4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-full"></div>
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>

                      {/* Contact Info Skeleton */}
                      <div className="bg-muted/30 border border-border/50 rounded-xl p-6">
                        <div className="h-4 bg-muted rounded w-32 mb-4"></div>
                        <div className="space-y-3">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-4 h-4 bg-muted rounded"></div>
                              <div className="h-4 bg-muted rounded flex-1"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Sidebar Skeleton */}
            <div className="space-y-6">
              <Card className="bg-card border-border shadow-sm animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-muted rounded-lg"></div>
                    <div className="h-6 bg-muted rounded w-24"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border/50 bg-muted/20"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 bg-muted rounded-lg"></div>
                          <div className="w-12 h-4 bg-muted rounded-full"></div>
                        </div>
                        <div className="w-16 h-6 bg-muted rounded mb-2"></div>
                        <div className="w-20 h-3 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Content Tabs Skeleton */}
          <div className="mt-8">
            <div className="flex gap-2 mb-6">
              <div className="h-10 bg-muted rounded w-24"></div>
              <div className="h-10 bg-muted rounded w-24"></div>
            </div>

            <Card className="border-border/50 bg-muted/10 animate-pulse">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full mb-4"></div>
                <div className="h-6 bg-muted rounded w-40 mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
