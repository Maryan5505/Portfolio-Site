import { AuthNavbar } from "@/features/auth/components/auth-navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavbar />

      <div className="w-full max-w-3xl mx-auto my-auto dark:bg-backround">
        {children}
      </div>
    </div>
  );
}
