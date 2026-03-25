import { cookies } from "next/headers";
import { cache } from "react";
import { getUserFromSession } from "../core/session";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { UserTable } from "@/lib/db/schema";
import { redirect } from "next/navigation";

function getUserFromDb(id: string) {
  return db.query.UserTable.findFirst({
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
}

type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

function _getCurrentUser(options: {
  redirectIfNotFound: true;
}): Promise<FullUser>;
function _getCurrentUser(options?: {
  redirectIfNotFound?: false;
}): Promise<FullUser | null>;

async function _getCurrentUser({ redirectIfNotFound = false } = {}) {
  const sessionUser = await getUserFromSession(await cookies());

  if (sessionUser == null) {
    if (redirectIfNotFound) return redirect("/sign-in");
    return null;
  }

  const fullUser = await getUserFromDb(sessionUser.id);

  if (fullUser == null) {
    if (redirectIfNotFound) return redirect("/sign-in");
    return null;
  }

  return fullUser;
}

export const getCurrentUser = cache(_getCurrentUser);
