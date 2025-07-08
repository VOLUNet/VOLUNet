import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const volunteers = sqliteTable("volunteers", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  organizerName: text("organizer_name").notNull(),
  category: text({
    enum: ["EnvironmentProtection", "Welfare", "CommunityActivity"],
  }).notNull(),
  volunteerName: text("volunteer_name").notNull(),
  location: text("location").notNull(),
  locationImageUrl: text("location_image_url").notNull(),
  eventDate: integer("event_date", { mode: "timestamp" }).notNull(),
  currentPeople: integer("current_people").notNull(),
  maxPeople: integer("max_people").notNull(),
  description: text("description").notNull(),
  isSharedToStudents: integer("is_shared_to_students", {
    mode: "boolean",
  }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const users = sqliteTable("users", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  iconUrl: text("icon_url").notNull(),
  comment: text("comment").notNull(),
  qrCode: text("qr_code").notNull(),
  isTeacher: integer("is_teacher", { mode: "boolean" }).default(false),
  isStudent: integer("is_student", { mode: "boolean" }).default(false),
  isOrganizer: integer("is_organizer", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
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