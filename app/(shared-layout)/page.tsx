import { getCurrentUser } from "@/features/auth/server/currentUser";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        Home page
        {user?.id}
        {user?.role}
      </div>
    </>
  );
}
