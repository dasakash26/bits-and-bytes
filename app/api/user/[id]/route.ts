import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ id: id }, { email: id }],
      },
      include: {
        posts: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
                username: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            likes: {
              select: {
                id: true,
                userId: true,
              },
            },
            comments: {
              select: {
                id: true,
              },
            },
            views: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        savedPosts: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
                username: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
            likes: {
              select: {
                id: true,
                userId: true,
              },
            },
            comments: {
              select: {
                id: true,
              },
            },
            views: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
