"use client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { FieldLabel } from "../ui/field";
import { logOut } from "@/features/auth/server/actions";

interface NavbarProps {
  user: {
    id: string;
    role: "user" | "admin";
    name: string;
    email: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Port
            <span className="text-blue-500">folio</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Blog
          </Link>
          <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
            Create
          </Link>
          <Link href="/about" className={buttonVariants({ variant: "ghost" })}>
            About
          </Link>
          <Link
            href="/schedule"
            className={buttonVariants({ variant: "ghost" })}
          >
            Schedule
          </Link>
        </div>
      </div>
      {user ? (
        <div className="flex items-center gap-2">
          <div className="flex-col">
            <FieldLabel>Name: {user.name}</FieldLabel>
            <FieldLabel>Email: {user.email}</FieldLabel>
            <FieldLabel>User id: {user.id}</FieldLabel>
            <FieldLabel>User role: {user.role}</FieldLabel>
          </div>
          <form action={logOut}>
            <Button className={buttonVariants()}>Log out</Button>
          </form>
          <ThemeToggle />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/auth/sign-up" className={buttonVariants()}>
            Sign Up
          </Link>
          <Link
            href="/auth/sign-in"
            className={buttonVariants({ variant: "secondary" })}
          >
            Log in
          </Link>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
