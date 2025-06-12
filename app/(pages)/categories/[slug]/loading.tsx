import { Card, CardContent } from "@/components/ui/card";
import { PostCardSkeleton } from "@/components/ui/loaders";

function CategoryHeroSkeleton() {
  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-16 px-4 animate-pulse">
      <div className="container mx-auto text-center">
        <div className="h-12 md:h-16 bg-white/20 rounded-lg mb-4 max-w-md mx-auto"></div>
        <div className="h-6 bg-white/20 rounded-lg max-w-2xl mx-auto mb-4"></div>
        <div className="h-8 bg-white/20 rounded-full w-24 mx-auto"></div>
      </div>
    </div>
  );
}

function CategoryCarouselSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="min-w-[300px] animate-pulse">
            <CardContent className="p-4">
              <div className="h-40 bg-muted rounded-lg mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <CategoryHeroSkeleton />

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Carousel Section */}
        <div className="mb-8">
          <div className="h-8 bg-muted rounded mb-4 w-48 animate-pulse"></div>
          <CategoryCarouselSkeleton />
        </div>

        {/* Posts Grid Section */}
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded w-32 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
