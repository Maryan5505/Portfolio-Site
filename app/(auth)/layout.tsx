import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex items-center justify-between my-5">
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Port
            <span className="text-blue-500">folio</span>
          </h1>
        </Link>
        <div className="flex w-[80.52px] justify-end">
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full max-w-md mx-auto my-auto">{children}</div>
    </div>
  );
}
