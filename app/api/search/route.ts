import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ posts: [], categories: [], authors: [] });
  }

  try {
    const [posts, categories, authors] = await Promise.all([
      // Search posts
      prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
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
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
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
            { user: { name: { contains: query, mode: "insensitive" } } },
            { bio: { contains: query, mode: "insensitive" } },
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
    return NextResponse.json({ posts: [], categories: [], authors: [] });
  }
}
