import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/server/currentUser";
import AdminUsersTable from "@/features/admin/components/admin-users-table";
import { getAllUsers } from "@/features/admin/server/actions";

export default async function AdminPage() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  if (currentUser.role !== "admin") {
    redirect("/");
  }
  const users = await getAllUsers();

  return (
    <section className="min-h-[calc(100vh-80px)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage and review all registered users.
          </p>
        </div>

        <AdminUsersTable users={users} currentUserId={currentUser.id} />
      </div>
    </section>
  );
}
