import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: {
          include: {
            views: true,
            comments: true,
            likes: true,
          },
        },
      },
    });

    // Calculate analytics
    const posts = user?.posts;
    const totalPosts = posts?.length;
    const totalViews = posts?.reduce(
      (sum, post) => sum + post.views.length,
      0
    ) ?? 0;
    const totalLikes = posts?.reduce((sum, post) => sum + post.likes.length, 0) ?? 0;
    const totalComments = posts?.reduce(
      (sum, post) => sum + post.comments.length,
      0
    ) ?? 0;

    // Calculate growth percentages (simplified - comparing to previous month)
    const currentDate = new Date();
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    const recentPosts = posts?.filter(
      (post) => new Date(post.createdAt) >= lastMonth
    );
    const recentViews = recentPosts?.reduce(
      (sum, post) => sum + post.views.length,
      0
    ) ?? 0;
    const recentLikes = recentPosts?.reduce(
      (sum, post) => sum + post.likes.length,
      0
    ) ?? 0;
    const recentComments = recentPosts?.reduce(
      (sum, post) => sum + post.comments.length,
      0
    ) ?? 0;

    // Helper function to calculate growth percentage
    const calculateGrowth = (recent: number, total: number, recentCount: number) => {
      if (recent <= 0) return 0;
      const previous = Math.max(total - recent, 1);
      return Math.round((recent / previous) * 100);
    };

    const recentPostsCount = recentPosts?.length ?? 0;
    const totalPostsCount = totalPosts ?? 0;
    const totalLikesCount = totalLikes ?? 0;
    const totalCommentsCount = totalComments ?? 0;

    const postsGrowth = calculateGrowth(recentPostsCount, totalPostsCount, recentPostsCount);
    const viewsGrowth = calculateGrowth(recentViews, totalViews, recentViews);
    const likesGrowth = calculateGrowth(recentLikes, totalLikesCount, recentLikes);
    const commentsGrowth = calculateGrowth(recentComments, totalCommentsCount, recentComments);

    return NextResponse.json({
      totalPosts,
      totalViews,
      totalLikes,
      totalComments,
      postsGrowth: Math.min(postsGrowth, 100), // Cap at 100%
      viewsGrowth: Math.min(viewsGrowth, 100),
      likesGrowth: Math.min(likesGrowth, 100),
      commentsGrowth: Math.min(commentsGrowth, 100),
    });
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}