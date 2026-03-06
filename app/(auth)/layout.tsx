import { AuthNavbar } from "@/features/auth/components/auth-navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      <AuthNavbar />
      <div className="w-full max-w-md mx-auto my-auto">{children}</div>
    </div>
  );
}
