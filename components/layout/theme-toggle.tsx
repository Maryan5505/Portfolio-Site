"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, rotate: 15 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={handleThemeToggle}
        className="cursor-pointer"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
