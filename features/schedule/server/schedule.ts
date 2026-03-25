"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db/db";
import {
  ScheduleDayTable,
  ScheduleItemTable,
  scheduleWeekDays,
} from "@/lib/db/schema";
import { getCurrentUser } from "@/features/auth/server/currentUser";

export async function getCurrentUserSchedule() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  const scheduleDays = await db.query.ScheduleDayTable.findMany({
    where: eq(ScheduleDayTable.userId, currentUser.id),
    with: {
      items: {
        orderBy: [
          asc(ScheduleItemTable.startTime),
          asc(ScheduleItemTable.order),
        ],
      },
    },
  });

  return [...scheduleDays].sort(
    (a, b) =>
      scheduleWeekDays.indexOf(a.dayOfWeek) -
      scheduleWeekDays.indexOf(b.dayOfWeek)
  );
}

export async function createNextScheduleDay() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  const existingDays = await db.query.ScheduleDayTable.findMany({
    columns: {
      dayOfWeek: true,
    },
    where: eq(ScheduleDayTable.userId, currentUser.id),
  });

  const existingDaySet = new Set(existingDays.map((day) => day.dayOfWeek));
  const nextDay = scheduleWeekDays.find((day) => !existingDaySet.has(day));

  if (!nextDay) return;

  await db.insert(ScheduleDayTable).values({
    userId: currentUser.id,
    dayOfWeek: nextDay,
  });

  revalidatePath("/schedule");
}
