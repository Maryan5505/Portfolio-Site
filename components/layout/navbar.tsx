"use client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import Image from "next/image";
import { UserAvatarDropdown } from "./user-avatar-dropdown";
import { Shield } from "lucide-react";

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
            {user.role === "admin" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/admin"
                  className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl border border-red-500/30 bg-linear-to-r from-red-500/90 via-rose-500/90 to-red-600/90 px-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(239,68,68,0.25)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(239,68,68,0.35)] dark:border-red-400/30"
                >
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_45%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </span>
                </Link>
              </motion.div>
            )}

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
