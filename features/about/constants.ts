import type { Variants } from "framer-motion";
import { ShieldCheck, LayoutDashboard, Database } from "lucide-react";

export const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "PostgreSQL",
  "Drizzle ORM",
  "Redis",
  "Zod",
];

export const goals = [
  {
    icon: ShieldCheck,
    title: "Authentication Flow",
    description:
      "I wanted to understand custom authentication more deeply: sessions, cookies, protected routes and secure access control.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Panel",
    description:
      "This project also helps me practice admin features like user tables, profile views, navigation and role-based logic.",
  },
  {
    icon: Database,
    title: "Fullstack Thinking",
    description:
      "I’m not only styling pages, but also learning how frontend, backend, database and caching work together in a real app.",
  },
];

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};
