import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ posts: [], categories: [], authors: [] });
    }

    const sanitizedQuery = query.trim().slice(0, 100); // Limit query length

    // Check if database is available (for build-time compatibility)
    if (!process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
      return NextResponse.json({
        posts: [],
        categories: [],
        authors: [],
        error: "Database not configured",
      });
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
            author: {
              include: {
                user: true,
              },
            },
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

        // Search authors
        prisma.author.findMany({
          where: {
            OR: [
              {
                user: {
                  name: { contains: sanitizedQuery, mode: "insensitive" },
                },
              },
              { bio: { contains: sanitizedQuery, mode: "insensitive" } },
            ],
          },
          include: {
            user: true,
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
