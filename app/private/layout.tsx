import { PrivateNavbar } from "@/features/private/components/private-navbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      <PrivateNavbar />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
