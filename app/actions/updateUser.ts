"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function updateUser(userData: any) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    if (userData.id !== session.user.id) {
      throw new Error("Email mismatch: Cannot update another user's data");
    }

    // Extract only the User model fields, excluding relationships
    const {
      name,
      username,
      bio,
      title,
      location,
      website,
      twitter,
      github,
      linkedin,
    } = userData;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        bio,
        title,
        location,
        website,
        twitter,
        github,
        linkedin,
        username,
        updatedAt: new Date(),
      },
    });

    console.log("User updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}
