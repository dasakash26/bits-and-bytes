"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateView(postId: string) {
  const session: any = await auth();
  if (!session?.user?.id) {
      return { success: false, message: "User not authenticated." }; 
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Blog post not found.");
  }

  const existingView = await prisma.view.findFirst({
    where: {
      postId: post.id,
      userId: session.user.id,
    },
  });

  if (existingView) {
    return { success: true, message: "View already counted." };
  } else {
    await prisma.view.create({
      data: {
        postId: post.id,
        userId: session.user.id,
      },
    });
    return { success: true, message: "View count updated successfully." };
  }
}
