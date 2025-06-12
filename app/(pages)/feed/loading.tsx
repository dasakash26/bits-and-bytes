import {
  PostCardSkeleton,
  TrendingCardSkeleton,
  ProfileCardSkeleton,
} from "@/components/ui/loaders";

function NewPostInputSkeleton() {
  return (
    <div className="mb-4 bg-card rounded-lg border shadow-sm animate-pulse">
      <div className="p-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-muted rounded-full flex-shrink-0"></div>
          <div className="flex-1 py-2 px-3 bg-muted/30 rounded-full border border-border/30">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-muted rounded w-32"></div>
              <div className="w-3 h-3 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeedLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <ProfileCardSkeleton />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            <NewPostInputSkeleton />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <TrendingCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
