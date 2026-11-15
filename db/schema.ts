import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  time,
  date,
  unique,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  googleId: text("google_id").notNull().unique(),
  isGuest: boolean("is_guest").notNull().default(false),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  breakMinutes: integer("break_minutes").notNull(),
});

export const schedules = pgTable(
  "schedules",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    date: date("date").notNull(),
    name: text("name"),
    startTime: time("start_time"),
    endTime: time("end_time"),
    breakMinutes: integer("break_minutes"),
    isHoliday: boolean("is_holiday").notNull().default(false),
  },
  (t) => [unique().on(t.userId, t.date)],
);

export const attendances = pgTable(
  "attendances",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    date: date("date").notNull(),
    clockIn: timestamp("clock_in", { withTimezone: true }).notNull(),
    clockOut: timestamp("clock_out", { withTimezone: true }),
    breakMinutes: integer("break_minutes"),
  },
  (t) => [unique().on(t.userId, t.date)],
);
