"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import blogPostSchema, { BlogPostSchema } from "../validation/blog.validation";
import {
  sendBlogPublishedEmail,
  sendNewPostNotificationToAdmin,
} from "@/lib/email-templates";
import { User } from "@/types/user";

export async function submitBlogAction(
  postData: Omit<BlogPostSchema, "id" | "authorId">
) {
  const session: any = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to submit a blog post.");
  }

  const user= await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      posts: true,
    },
  });

  if (!user) {
    return "User not found in database.";
  }

  let category = await prisma.category.findUnique({
    where: { id: postData.categoryId },
  });

  if (!category) {
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

  const dataWithAuthor = {
    ...postData,
    authorId: session.user.id,
  };

  const validatedBlog = blogPostSchema.safeParse(dataWithAuthor);

  if (!validatedBlog.success) {
    throw new Error("Invalid blog post data: " + validatedBlog.error.message);
  }

  const { ...blogData } = validatedBlog.data;

  const res = await prisma.blogPost.create({
    data: {
      ...blogData,
      authorId: user.id,
    },
  });

  console.log("Blog post created successfully:", res.title);

  let emailSent = false;
  if (user.email) {
    try {
      const emailResult = await sendBlogPublishedEmail(
        { name: user.name || null, email: user.email },
        { id: res.id, title: res.title, readTime: res.readTime || null },
        { name: category.name }
      );

      if (emailResult.success) {
        console.log("Confirmation email sent successfully to:", user.email);
        emailSent = true;
      } else {
        console.error("Failed to send confirmation email:", emailResult.error);
      }
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  }

  try {
    const adminEmailResult = await sendNewPostNotificationToAdmin(
      { name: user.name || null, email: user.email },
      { id: res.id, title: res.title, readTime: res.readTime || null },
      { name: category.name }
    );

    if (adminEmailResult.success) {
      console.log("Admin notification email sent successfully");
    } else {
      console.error(
        "Failed to send admin notification email:",
        adminEmailResult.error
      );
    }
  } catch (error) {
    console.error("Error sending admin notification email:", error);
  }

  revalidatePath("/blog");
  return {
    ...res,
    emailSent,
    message: emailSent
      ? "Blog post published successfully! A confirmation email has been sent to your email address."
      : "Blog post published successfully!",
  };
}

export async function deleteBlogAction(postId: string) {
  const session: any = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to delete a blog post.");
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Blog post not found.");
  }

  if (post.authorId !== session.user.id) {
    throw new Error("You are not authorized to delete this blog post.");
  }

  await prisma.blogPost.delete({
    where: { id: postId },
  });

  revalidatePath("/blog");
  return { success: true, message: "Blog post deleted successfully." };
}

export async function updateBlogAction(
  postId: string,
  postData: Omit<BlogPostSchema, "id" | "authorId">
) {
  const session: any = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to update a blog post.");
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Blog post not found.");
  }

  if (post.authorId !== session.user.id) {
    throw new Error("You are not authorized to update this blog post.");
  }

  const validatedBlog = blogPostSchema.safeParse({
    ...postData,
    id: postId,
    authorId: post.authorId,
  });

  if (!validatedBlog.success) {
    throw new Error("Invalid blog post data: " + validatedBlog.error.message);
  }

  const { ...blogData } = validatedBlog.data;

  const updatedPost = await prisma.blogPost.update({
    where: { id: postId },
    data: blogData,
  });

  revalidatePath(`/blog/${postId}`);
  return {
    success: true,
    message: "Blog post updated successfully.",
    updatedPost,
  };
}

export async function getUserPosts(userId: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { authorId: userId },
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
          },
        },
        likes: {
          select: {
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
      orderBy: { createdAt: "desc" },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
}

export async function getUserSavedPosts(userId: string) {
  try {
    const session: any = await auth();
    if (!session?.user?.id || session.user.id !== userId) {
      throw new Error("Unauthorized: Can only view your own saved posts");
    }

    const savedPosts = await prisma.user.findUnique({
      where: { id: userId },
      include: {
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
              },
            },
            likes: {
              select: {
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
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return savedPosts?.savedPosts || [];
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    throw new Error("Failed to fetch saved posts");
  }
}

export async function getUserDrafts(userId: string) {
  try {
    const session: any = await auth();
    if (!session?.user?.id || session.user.id !== userId) {
      throw new Error("Unauthorized: Can only view your own drafts");
    }

    // For now, we'll return an empty array as drafts functionality needs to be implemented
    // In a real implementation, you'd have a separate drafts table or a status field on BlogPost
    const drafts = await prisma.blogPost.findMany({
      where: {
        authorId: userId,
        // This would be something like: status: 'DRAFT' if you had a status field
      },
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
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return []; // Return empty for now until draft functionality is properly implemented
  } catch (error) {
    console.error("Error fetching drafts:", error);
    throw new Error("Failed to fetch drafts");
  }
}

export async function toggleSavePost(postId: string) {
  try {
    const session: any = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be logged in to save posts");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        savedPosts: {
          where: { id: postId },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isAlreadySaved = user.savedPosts.length > 0;

    if (isAlreadySaved) {
      // Remove from saved posts
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          savedPosts: {
            disconnect: { id: postId },
          },
        },
      });
    } else {
      // Add to saved posts
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          savedPosts: {
            connect: { id: postId },
          },
        },
      });
    }

    revalidatePath("/profile");
    return { success: true, saved: !isAlreadySaved };
  } catch (error) {
    console.error("Error toggling save post:", error);
    throw new Error("Failed to toggle save post");
  }
}
