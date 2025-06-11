"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import blogPostSchema, { BlogPostSchema } from "../validation/blog.validation";

export async function submitBlogAction(
  postData: Omit<BlogPostSchema, "id" | "authorId">
) {
  const session: any = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to submit a blog post.");
  }

  // Verify the user exists in the database - try both id and email
  let user = await prisma.user.findUnique({
    where: { id: session.id },
  });

  // If user not found by id, try by email as fallback
  if (!user && session.user.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  if (!user) {
    throw new Error("User not found in database.");
  }

  // Find or create an Author record for this user
  let author = await prisma.author.findUnique({
    where: { userId: user.id },
  });

  if (!author) {
    // Create an Author record if it doesn't exist
    author = await prisma.author.create({
      data: {
        name: user.name || user.email || "Anonymous",
        bio: user.bio || null,
        avatar: user.image || null,
        twitter: user.twitter || null,
        github: user.github || null,
        linkedin: user.linkedin || null,
        userId: user.id,
      },
    });
  }

  const authorId = author.id;

  // Ensure the category exists, create if it doesn't
  let category = await prisma.category.findUnique({
    where: { id: postData.categoryId },
  });

  if (!category) {
    // Create a default category if it doesn't exist
    category = await prisma.category.create({
      data: {
        id: postData.categoryId,
        name: postData.categoryId
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        description: `Category for ${postData.categoryId}`,
        icon: "📝",
      },
    });
  }

  // Add the authorId from database user
  const dataWithAuthor = {
    ...postData,
    authorId,
  };

  const validatedBlog = blogPostSchema.safeParse(dataWithAuthor);

  if (!validatedBlog.success) {
    throw new Error("Invalid blog post data: " + validatedBlog.error.message);
  }

  const { id, authorId: validatedAuthorId, ...blogData } = validatedBlog.data;

  const res = await prisma.blogPost.create({
    data: {
      ...blogData,
      authorId,
    },
  });

  console.log("Blog post created successfully:", res.title);
  revalidatePath("/blog");
  return res;
}
