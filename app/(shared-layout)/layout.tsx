import { Navbar } from "@/components/layout/navbar";

export default async function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
