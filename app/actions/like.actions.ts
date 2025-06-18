"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
  const session: any = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to like a blog post.");
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Blog post not found.");
  }

  const existingLike = await prisma.like.findFirst({
    where: {
      postId: post.id,
      userId: session.user.id,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        postId: post.id,
        userId: session.user.id,
      },
    });
  }

  revalidatePath(`/blog/${postId}`);
  return { success: true, message: "Like status toggled successfully." };
}

export async function getLikesCount(postId: string) {
  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Blog post not found.");
  }

  const likesCount = await prisma.like.count({
    where: {
      postId: post.id,
    },
  });

  return { likesCount };
}

export async function toggleSave(postId: string) {
  const session: any = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to save a blog post.");
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Blog post not found.");
  }

  const existingSave = await prisma.user.findFirst({
    where: {
      id: session.user.id,
      savedPosts: {
        some: {
          id: post.id,
        },
      },
    },
  });

  if (existingSave) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        savedPosts: {
          disconnect: { id: post.id },
        },
      },
    });
  } else {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        savedPosts: {
          connect: { id: post.id },
        },
      },
    });
  }

  revalidatePath(`/blog/${postId}`);
  return { success: true, message: "Save status toggled successfully." };
}

