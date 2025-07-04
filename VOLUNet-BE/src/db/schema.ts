import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/* ───────────────── volunteers テーブル ───────────────── */
export const volunteers = sqliteTable("volunteers", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  /* ← 列名を一意にし、enum 定義にも列名を付与 */
  organizerName: text("organizer_name").notNull(),
  category: text("category", {
    enum: ["EnvironmentProtection", "Welfare", "CommunityActivity"],
  }).notNull(),
  volunteerName: text("volunteer_name").notNull(),

  location: text("location").notNull(),
  locationImageUrl: text("location_image_url").notNull(),

  eventDate: integer("event_date", { mode: "timestamp" }).notNull(),
  currentPeople: integer("current_people").notNull(),
  maxPeople: integer("max_people").notNull(),
  description: text("description").notNull(),

  /* ← notNull() を付与して NULL 挿入を防止 */
  isSharedToStudents: integer("is_shared_to_students", {
    mode: "boolean",
  })
    .notNull()
    .default(false),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/* ───────────────── users テーブル ───────────────── */
export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),

  /* ← email に UNIQUE 制約を付与 */
  email: text("email").notNull().unique(),

  iconUrl: text("icon_url").notNull(),
  comment: text("comment").notNull(),
  qrCode: text("qr_code").notNull(),

  /* ← 3フラグとも notNull() を追加 */
  isTeacher: integer("is_teacher", { mode: "boolean" }).notNull().default(false),
  isStudent: integer("is_student", { mode: "boolean" }).notNull().default(false),
  isOrganizer: integer("is_organizer", { mode: "boolean" }).notNull().default(false),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/* ───────────────── users_volunteers テーブル ───────────────── */
export const userVolunteers = sqliteTable("users_volunteers", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  /* ← onDelete: "cascade" で整合性を強化 */
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  volunteerId: integer("volunteer_id")
    .notNull()
    .references(() => volunteers.id, { onDelete: "cascade" }),
});
