import { db } from "@/lib/db/db";
import { UserTable } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export function getAllUsers() {
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
