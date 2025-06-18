import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProfileSkeleton />
        </div>
      </div>
    </div>
  );
}
