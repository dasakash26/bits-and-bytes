import {
  CategoryCarouselSkeleton,
  PostCardSkeleton,
} from "@/components/ui/loaders";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-24 mx-auto rounded-full" />
        </div>
      </div>

      {/* Featured Carousel Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <CategoryCarouselSkeleton />
        </div>

        {/* Controls Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-7 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
