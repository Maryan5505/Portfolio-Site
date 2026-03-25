import SchedulePage from "@/features/schedule/components/schedule-page";
import {
  createNextScheduleDay,
  getCurrentUserSchedule,
} from "@/features/schedule/server/schedule";

export default async function Schedule() {
  const scheduleDays = await getCurrentUserSchedule();

  return (
    <SchedulePage
      scheduleDays={scheduleDays}
      createNextScheduleDay={createNextScheduleDay}
    />
  );
}
