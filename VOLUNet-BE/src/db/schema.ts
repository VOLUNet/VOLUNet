import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const volunteers = sqliteTable("volunteers", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  organizerName: text("name").notNull(),
  volunteerName: text("name").notNull(),
  eventDate: integer("event_date", { mode: "timestamp" }).notNull(),
  description: text("description").notNull(),
  isSharedToStudents: integer("is_shared_to_students", {
    mode: "boolean",
  }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const users = sqliteTable("users", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("name").notNull(),
  iconUrl: text("icon_url").notNull(),
  comment: text("comment").notNull(),
  qrCode: text("qr_code").notNull(),
  isTeacher: integer({ mode: "boolean" }).default(false),
  isStudent: integer({ mode: "boolean" }).default(false),
  isOrganizer: integer({ mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const userVolunteers = sqliteTable("users_volunteers", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  volunteerId: integer("volunteer_id")
    .notNull()
    .references(() => volunteers.id),
});
