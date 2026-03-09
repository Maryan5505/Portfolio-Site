"use server";
import { updateUserSessionData } from "@/features/auth/core/session";
import { getCurrentUser } from "@/features/auth/server/currentUser";
import { db } from "@/lib/db/db";
import { UserTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function toggleRole() {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  const [updatedUser] = await db
    .update(UserTable)
    .set({ role: user.role === "user" ? "admin" : "user" })
    .where(eq(UserTable.id, user.id))
    .returning({ id: UserTable.id, role: UserTable.role });

  await updateUserSessionData(updatedUser, await cookies());
}
