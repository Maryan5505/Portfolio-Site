import { getCurrentUser } from "@/features/auth/server/currentUser";
import UserProfilePage from "@/features/private/components/profile-page";

export default async function PrivatePage() {
  const user = await getCurrentUser({ redirectIfNotFound: true });
  if (!user) return;

  return <UserProfilePage user={user} />;
}
