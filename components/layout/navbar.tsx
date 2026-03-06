"use client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { FieldLabel } from "../ui/field";
import { logOut } from "@/features/auth/server/actions";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/favicon-32x32.png"
              alt="Logo"
              width={32}
              height={32}
            />

            <h1 className="text-3xl font-bold">
              Port
              <span className="text-red-600">folio</span>
            </h1>
          </Link>
        </motion.div>
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className={buttonVariants({ variant: "ghost" })}>
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
              Blog
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/create"
              className={buttonVariants({ variant: "ghost" })}
            >
              Create
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/about"
              className={buttonVariants({ variant: "ghost" })}
            >
              About
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/schedule"
              className={buttonVariants({ variant: "ghost" })}
            >
              Schedule
            </Link>
          </motion.div>
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
          <Link href="/sign-up" className={buttonVariants()}>
            Sign Up
          </Link>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "secondary" })}
          >
            Sign in
          </Link>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
