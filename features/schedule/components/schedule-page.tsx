"use client";

import { motion, type Variants } from "framer-motion";
import { CalendarDays, Clock3, Plus } from "lucide-react";
import { weekDayLabels } from "../constants";

type SchedulePageProps = {
  scheduleDays: {
    id: string;
    dayOfWeek:
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday";
    items: {
      id: string;
      title: string;
      description: string | null;
      startTime: string;
      endTime: string;
      order: number;
    }[];
  }[];
  createNextScheduleDay: () => Promise<void>;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export default function SchedulePage({
  scheduleDays,
  createNextScheduleDay,
}: SchedulePageProps) {
  const hasAllDays = scheduleDays.length === 7;

  return (
    <section className="relative min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-100px] h-72 w-72 rounded-full bg-red-500/10 blur-3xl dark:bg-red-500/15" />
        <div className="absolute bottom-[-120px] right-[-80px] h-80 w-80 rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-500/15" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-7xl flex-col gap-6"
      >
        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-[32px] border border-border/50 bg-background/75 ring-1 ring-red-500/8 backdrop-blur-xl shadow-[0_14px_50px_rgba(15,23,42,0.07)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.28)]"
        >
          <div className="relative border-b border-border/50 bg-gradient-to-r from-red-500/12 via-rose-500/8 to-transparent px-6 py-12 sm:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.16),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.10),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.24),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.16),transparent_50%)]" />

            <div className="relative max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                Weekly routine
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Create your
                <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                  {" "}
                  weekly schedule
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Build your weekly routine day by day and organize your time in a
                clean, structured and flexible way.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <motion.div variants={itemVariants} className="grid gap-5">
            {scheduleDays.map((day) => (
              <div
                key={day.id}
                className="rounded-[28px] border border-border/50 bg-background/75 p-6 ring-1 ring-red-500/8 backdrop-blur-xl shadow-[0_14px_50px_rgba(15,23,42,0.07)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.28)]"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
                      <CalendarDays className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {weekDayLabels[day.dayOfWeek]}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {day.items.length} planned item
                        {day.items.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-2xl border border-border/50 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition hover:border-red-500/20 hover:bg-red-500/[0.06]"
                  >
                    Edit
                  </button>
                </div>

                {day.items.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 px-5 py-6 text-sm text-muted-foreground">
                    No activities yet. Next step is adding time-based schedule
                    items.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {day.items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-border/50 bg-background/80 px-4 py-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
                            <Clock3 className="h-3.5 w-3.5" />
                            {item.startTime} - {item.endTime}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="sticky top-6 rounded-[28px] border border-border/50 bg-background/75 p-6 ring-1 ring-red-500/8 backdrop-blur-xl shadow-[0_14px_50px_rgba(15,23,42,0.07)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.28)]">
              <h2 className="text-xl font-semibold text-foreground">
                Add next day
              </h2>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Build your week gradually. Each click adds the next available
                day in order.
              </p>

              <form action={createNextScheduleDay} className="mt-6">
                <button
                  type="submit"
                  disabled={hasAllDays}
                  className="group flex w-full flex-col items-center justify-center rounded-[28px] border border-dashed border-red-500/20 bg-gradient-to-br from-red-500/[0.08] via-rose-500/[0.04] to-transparent px-6 py-10 text-center transition-all hover:border-red-500/30 hover:from-red-500/[0.12] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 transition-transform group-hover:scale-105 dark:text-red-400">
                    <Plus className="h-6 w-6" />
                  </div>

                  <span className="text-base font-semibold text-foreground">
                    {hasAllDays ? "All days already added" : "Add next day"}
                  </span>

                  <span className="mt-2 max-w-[220px] text-sm leading-6 text-muted-foreground">
                    {hasAllDays
                      ? "Your weekly structure is complete."
                      : "Start shaping your weekly routine one day at a time."}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
