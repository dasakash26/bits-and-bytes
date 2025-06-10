import { 
  PostCardSkeleton, 
  TrendingCardSkeleton, 
  ProfileCardSkeleton, 
  AnalyticsCardSkeleton 
} from "@/components/ui/loaders";

export default function FeedLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileCardSkeleton />
          <TrendingCardSkeleton />
          <AnalyticsCardSkeleton />
        </div>
      </div>
    </div>
  );
}
