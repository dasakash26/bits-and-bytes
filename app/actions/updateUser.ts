"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { User } from "@/types/user";



export async function updateUser(userData: User) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        ...userData,
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
