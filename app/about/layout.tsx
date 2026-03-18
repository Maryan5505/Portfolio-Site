import { AboutNavbar } from "@/features/about/components/about-navbar";

export default async function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AboutNavbar />
      {children}
    </>
  );
}
