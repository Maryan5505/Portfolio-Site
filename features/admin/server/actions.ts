"use server";
import { getCurrentUser } from "@/features/auth/server/currentUser";
import { db } from "@/lib/db/db";
import { UserTable, type UserRole } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAllUsers() {
  return db.query.UserTable.findMany({
    columns: {
      id: true,
      name: true,
      surname: true,
      username: true,
      email: true,
      phone: true,
      country: true,
      hobby: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [desc(UserTable.createdAt)],
  });
}

export async function findUserById(id: string) {
  const user = await db.query.UserTable.findFirst({
    columns: {
      id: true,
      name: true,
      surname: true,
      username: true,
      email: true,
      phone: true,
      country: true,
      hobby: true,
      role: true,
    },
    where: eq(UserTable.id, id),
  });

  return user;
}

export async function updateUserRole(userId: string, role: UserRole) {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  if (currentUser.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await db.update(UserTable).set({ role }).where(eq(UserTable.id, userId));

  revalidatePath("/admin");
}
