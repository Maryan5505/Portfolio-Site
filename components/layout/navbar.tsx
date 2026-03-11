"use client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import Image from "next/image";
import { UserAvatarDropdown } from "./user-avatar-dropdown";

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
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                duration: 0.8,
              }}
            >
              <Image
                src="/icons/favicon-32x32.png"
                alt="Logo"
                width={32}
                height={32}
              />
            </motion.div>
            <motion.div>
              <h1 className="text-3xl font-bold">
                Port
                <span className="text-red-600">folio</span>
              </h1>
            </motion.div>
          </Link>
        </motion.div>
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/blog"
              className={buttonVariants({ variant: "outline" })}
            >
              Blog
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/create"
              className={buttonVariants({ variant: "outline" })}
            >
              Create
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/about"
              className={buttonVariants({ variant: "outline" })}
            >
              About
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/schedule"
              className={buttonVariants({ variant: "outline" })}
            >
              Schedule
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <UserAvatarDropdown user={user} />
            <ThemeToggle />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}
