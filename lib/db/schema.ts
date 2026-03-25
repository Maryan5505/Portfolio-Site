import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userRoles = ["admin", "user"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_roles", userRoles);

export const UserTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  name: text().notNull(),
  surname: text(),

  username: text().notNull().unique(),

  email: text().notNull().unique(),

  phone: text(),
  country: text(),
  hobby: text(),

  password: text(),
  salt: text(),

  role: userRoleEnum().notNull().default("user"),

  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const scheduleWeekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type ScheduleWeekDay = (typeof scheduleWeekDays)[number];
export const scheduleWeekDayEnum = pgEnum(
  "schedule_week_days",
  scheduleWeekDays
);

export const ScheduleDayTable = pgTable(
  "schedule_days",
  {
    id: uuid().primaryKey().defaultRandom(),

    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),

    dayOfWeek: scheduleWeekDayEnum().notNull(),

    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userDayUnique: uniqueIndex("schedule_days_user_day_unique").on(
      table.userId,
      table.dayOfWeek
    ),
  })
);

export const ScheduleItemTable = pgTable("schedule_items", {
  id: uuid().primaryKey().defaultRandom(),

  scheduleDayId: uuid()
    .notNull()
    .references(() => ScheduleDayTable.id, { onDelete: "cascade" }),

  title: text().notNull(),
  description: text(),

  startTime: text().notNull(),
  endTime: text().notNull(),

  order: integer().notNull().default(0),

  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const UserRelations = relations(UserTable, ({ many }) => ({
  scheduleDays: many(ScheduleDayTable),
}));

export const ScheduleDayRelations = relations(
  ScheduleDayTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [ScheduleDayTable.userId],
      references: [UserTable.id],
    }),
    items: many(ScheduleItemTable),
  })
);

export const ScheduleItemRelations = relations(
  ScheduleItemTable,
  ({ one }) => ({
    scheduleDay: one(ScheduleDayTable, {
      fields: [ScheduleItemTable.scheduleDayId],
      references: [ScheduleDayTable.id],
    }),
  })
);
