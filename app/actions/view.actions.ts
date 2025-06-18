"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateView(postId: string) {
  const session: any = await auth();
  if (!session?.user?.id) {
    //unknown view add
    session.user.id =
      "unknown_view_user-" + Math.floor(Math.random() * 1000000);
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
  }

  revalidatePath(`/blog/${postId}`);
  return { success: true, message: "View count updated successfully." };
}
