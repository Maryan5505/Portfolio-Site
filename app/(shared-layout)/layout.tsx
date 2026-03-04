import { Navbar } from "@/components/layout/navbar";
import { getCurrentUser } from "@/features/auth/server/currentUser";

export default async function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
