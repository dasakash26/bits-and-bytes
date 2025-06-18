import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ posts: [], categories: [], authors: [] });
    }

    const sanitizedQuery = query.trim().slice(0, 100);

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        posts: [],
        categories: [],
        authors: [],
        error: "Database not configured",
      });
    }

    try {
      // Test Prisma connection
      await prisma.$connect();
    } catch (connectionError) {
      console.error("Database connection failed:", connectionError);
      return NextResponse.json(
        {
          posts: [],
          categories: [],
          authors: [],
          error: "Database temporarily unavailable",
        },
        { status: 503 }
      );
    }

    try {
      const [posts, categories, authors] = await Promise.all([
        // Search posts
        prisma.blogPost.findMany({
          where: {
            OR: [
              { title: { contains: sanitizedQuery, mode: "insensitive" } },
              { content: { contains: sanitizedQuery, mode: "insensitive" } },
              { excerpt: { contains: sanitizedQuery, mode: "insensitive" } },
            ],
          },
          include: {
            author: true,
          },
          take: 10,
        }),

        // Search categories
        prisma.category.findMany({
          where: {
            OR: [
              { name: { contains: sanitizedQuery, mode: "insensitive" } },
              {
                description: { contains: sanitizedQuery, mode: "insensitive" },
              },
            ],
          },
          include: {
            _count: {
              select: {
                posts: true,
              },
            },
          },
          take: 5,
        }),

        // Search authors (users who have written posts)
        prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: sanitizedQuery, mode: "insensitive" } },
              { bio: { contains: sanitizedQuery, mode: "insensitive" } },
            ],
            posts: {
              some: {}, // Only users who have written at least one post
            },
          },
          include: {
            _count: {
              select: {
                posts: true,
              },
            },
          },
          take: 5,
        }),
      ]);

      return NextResponse.json({ posts, categories, authors });
    } catch (error) {
      console.error("Search error:", error);
      return NextResponse.json(
        {
          posts: [],
          categories: [],
          authors: [],
          error: "Search functionality temporarily unavailable",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        posts: [],
        categories: [],
        authors: [],
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
