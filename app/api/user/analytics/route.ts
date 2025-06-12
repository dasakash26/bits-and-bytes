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
        author: {
          include: {
            posts: {
              include: {
                comments: true,
              },
            },
          },
        },
        comments: true,
      },
    });

    if (!user || !user.author) {
      return NextResponse.json({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        postsGrowth: 0,
        viewsGrowth: 0,
        likesGrowth: 0,
        commentsGrowth: 0,
      });
    }

    // Calculate analytics
    const posts = user.author.posts;
    const totalPosts = posts.length;
    const totalViews = posts.reduce((sum, post) => sum + post.viewCount, 0);
    const totalLikes = posts.reduce((sum, post) => sum + post.likeCount, 0);
    const totalComments = posts.reduce(
      (sum, post) => sum + post.comments.length,
      0
    );

    // Calculate growth percentages (simplified - comparing to previous month)
    const currentDate = new Date();
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    const recentPosts = posts.filter(
      (post) => new Date(post.createdAt) >= lastMonth
    );
    const recentViews = recentPosts.reduce(
      (sum, post) => sum + post.viewCount,
      0
    );
    const recentLikes = recentPosts.reduce(
      (sum, post) => sum + post.likeCount,
      0
    );
    const recentComments = recentPosts.reduce(
      (sum, post) => sum + post.comments.length,
      0
    );

    // Simple growth calculation (you can make this more sophisticated)
    const postsGrowth =
      recentPosts.length > 0
        ? Math.round(
            (recentPosts.length /
              Math.max(totalPosts - recentPosts.length, 1)) *
              100
          )
        : 0;
    const viewsGrowth =
      recentViews > 0
        ? Math.round(
            (recentViews / Math.max(totalViews - recentViews, 1)) * 100
          )
        : 0;
    const likesGrowth =
      recentLikes > 0
        ? Math.round(
            (recentLikes / Math.max(totalLikes - recentLikes, 1)) * 100
          )
        : 0;
    const commentsGrowth =
      recentComments > 0
        ? Math.round(
            (recentComments / Math.max(totalComments - recentComments, 1)) * 100
          )
        : 0;

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
