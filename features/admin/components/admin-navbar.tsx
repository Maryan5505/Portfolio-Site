"use client";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isUserDetailsPage = pathname.startsWith("/admin/user/");

  function handleBack() {
    if (isUserDetailsPage) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <div className="flex items-center justify-between my-5">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleBack}
          className={buttonVariants({
            variant: "secondary",
            className: "cursor-pointer",
          })}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </motion.div>
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
      <div className="flex w-[80.52px] justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}
