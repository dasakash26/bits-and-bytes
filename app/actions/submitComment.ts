"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const submitCommentAction = async (
  postId: string,
  content: string,
  parentId: string | null = null
) => {
  const session: any = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to submit a comment.");
  }

  console.log(parentId)
  // post comment
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: session.user.id,
      parentId,
    },
  });

  revalidatePath(`/blog/${postId}`);
  return comment;
};
