import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // Find user by id or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ id: id }, { email: id }],
      },
      include: {
        author: {
          include: {
            posts: {
              include: {
                category: true,
                comments: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
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
