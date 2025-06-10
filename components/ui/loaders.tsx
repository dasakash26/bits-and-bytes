"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton for PostCard
export const PostCardSkeleton = () => {
  return (
    <Card className="bg-card border-border shadow-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Author Info Skeleton */}
        <div className="p-4 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
        </div>

        {/* Image Skeleton */}
        <Skeleton className="w-full aspect-video" />

        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Tags Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>

          {/* Actions Skeleton */}
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton for TrendingCard
export const TrendingCardSkeleton = () => {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-5 w-28" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-3 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Skeleton for ProfileCard
export const ProfileCardSkeleton = () => {
  return (
    <Card className="bg-card border-border shadow-sm overflow-hidden">
      <Skeleton className="h-20 w-full" />
      <CardContent className="relative pt-0 pb-6">
        <div className="flex flex-col items-center -mt-10">
          <Skeleton className="w-20 h-20 rounded-full border-4 border-background" />

          <div className="text-center mt-4 space-y-2">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-5 w-24 mx-auto rounded-full" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>

          <div className="flex gap-8 mt-4 p-4 bg-muted/30 rounded-xl">
            <div className="text-center">
              <Skeleton className="h-6 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="text-center">
              <Skeleton className="h-6 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton for AnalyticsCard
export const AnalyticsCardSkeleton = () => {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-5 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="h-8 w-16 mb-2" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-1 w-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Spinning loader
export const SpinnerLoader = ({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-primary border-t-transparent ${sizeClasses[size]} ${className}`}
    />
  );
};

// Page loader
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <SpinnerLoader size="lg" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

// Category Carousel Skeleton
export const CategoryCarouselSkeleton = () => {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <Skeleton className="w-full h-96 md:h-[500px]" />
      </Card>

      {/* Thumbnail Navigation Skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-20 h-12 md:w-24 md:h-16 rounded-lg flex-shrink-0"
          />
        ))}
      </div>

      {/* Progress Indicators Skeleton */}
      <div className="flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-2 h-2 rounded-full" />
        ))}
      </div>
    </div>
  );
};

// Loading Button
export const LoadingButton = ({
  isLoading,
  children,
  className = "",
  ...props
}: {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <SpinnerLoader size="sm" />}
      {children}
    </button>
  );
};

// Content Placeholder
export const ContentPlaceholder = ({
  icon: Icon,
  title,
  description,
}: {
  icon?: React.ComponentType<any>;
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center py-12">
      {Icon && (
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mx-auto">{description}</p>
    </div>
  );
};
