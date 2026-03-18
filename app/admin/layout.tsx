import { AdminNavbar } from "@/features/admin/components/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      <AdminNavbar />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
