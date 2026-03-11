"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logOut } from "@/features/auth/server/actions";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UserAvatarDropdownProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
}

export function UserAvatarDropdown({ user }: UserAvatarDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initial = user.name.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full text-xl cursor-pointer bg-red-600 dark:bg-red-500 text-white font-bold flex items-center justify-center hover:bg-red-700 dark:hover:bg-red-600 transition-colors ring-1 ring-gray-300 dark:ring-gray-600"
        title={user.name}
      >
        {initial}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50 flex flex-col py-2"
          >
            <Link
              href="/private"
              className="px-4 py-2 mx-2 my-1 rounded-lg text-center font-medium dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/private/settings"
              className="px-4 py-2 mx-2 my-1 rounded-lg text-center font-medium dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
            <form action={logOut}>
              <Button
                type="submit"
                className="w-[calc(100%-16px)] mx-2 my-1 rounded-lg text-center font-medium dark:hover:bg-gray-500 hover:bg-gray-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Log out
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
