"use client";

import { motion } from "framer-motion";

interface UserProfilePageProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
}

export default function UserProfilePage({ user }: UserProfilePageProps) {
  return <section className="h-full"></section>;
}
