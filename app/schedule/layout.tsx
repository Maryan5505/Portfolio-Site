import { ScheduleNavbar } from "@/features/schedule/components/schedule-navbar";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col ">
      <ScheduleNavbar />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
