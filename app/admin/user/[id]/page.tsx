import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/server/currentUser";
import UserProfilePage from "@/features/private/components/profile-page";
import { findUserById } from "@/features/admin/server/actions";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdminUserPage({ params }: Props) {
  const { id } = await params;
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  if (currentUser.role !== "admin") {
    redirect("/");
  }

  const user = await findUserById(id);

  if (!user) return notFound();

  return <UserProfilePage user={user} />;
}
