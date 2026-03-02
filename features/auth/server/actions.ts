"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema } from "../sign-in/schemas";
import { signUpSchema } from "../sign-up/schemas";
import { UserTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { generateSalt, hashPassword } from "../core/password-hasher";
import { createUserSession } from "../core/session";
import { cookies } from "next/headers";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

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
    console.log("before hached");
    const hashedPassword = await hashPassword(data.password, salt);
    console.log(hashedPassword);
    const [user] = await db
      .insert(UserTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
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
  redirect("/");
}
