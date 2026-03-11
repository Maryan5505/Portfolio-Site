"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema } from "../sign-in/schemas";
import { signUpSchema } from "../sign-up/schemas";
import { UserTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/db";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "../core/password-hasher";
import { createUserSession, removeUserFromSession } from "../core/session";
import { cookies } from "next/headers";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "Unable to Log in";

  const user = await db.query.UserTable.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(UserTable.email, data.email),
  });
  if (user == null || user.password == null || user.salt == null)
    return "Unable to login";

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Uncorrect password";

  await createUserSession(user, await cookies());
  redirect("/");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Unable to create account";

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null) return "Acount already exist for this email";
  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);
    const [user] = await db
      .insert(UserTable)
      .values({
        name: data.name,
        surname: data.surname,
        username: data.username,
        email: data.email,
        phone: data.phone,
        country: data.country,
        hobby: data.hobby,
        password: hashedPassword,
        role: "user",
        salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });
    if (user == null) return "Unable to Sign Up";
    await createUserSession(user, await cookies());
  } catch {
    return "Unable to Sign Up";
  }
  redirect("/");
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}
