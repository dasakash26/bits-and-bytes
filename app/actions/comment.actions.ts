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

  console.log(parentId);
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

export const deleteCommentAction = async (commentId: string) => {
  const session: any = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to delete a comment.");
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      replies: true,
    },
  });

  if (!comment || comment.authorId !== session.user.id) {
    return new Error("Comment not found or you are not the author.");
  }

  if (comment.replies && comment.replies.length > 0) {
    await prisma.comment.deleteMany({
      where: {
        parentId: commentId,
      },
    });
  }

  // Delete the main comment
  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  revalidatePath(`/blog/${comment.postId}`);
};
