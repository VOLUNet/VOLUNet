PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon_url` text NOT NULL,
	`comment` text NOT NULL,
	`qr_code` text NOT NULL,
	`is_teacher` integer DEFAULT false,
	`is_student` integer DEFAULT false,
	`is_organizer` integer DEFAULT false,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "icon_url", "comment", "qr_code", "is_teacher", "is_student", "is_organizer", "created_at", "updated_at") SELECT "id", "name", "icon_url", "comment", "qr_code", "is_teacher", "is_student", "is_organizer", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_volunteers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`event_date` integer NOT NULL,
	`description` text NOT NULL,
	`is_shared_to_students` integer DEFAULT false,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_volunteers`("id", "name", "location", "event_date", "description", "is_shared_to_students", "created_at", "updated_at") SELECT "id", "name", "location", "event_date", "description", "is_shared_to_students", "created_at", "updated_at" FROM `volunteers`;--> statement-breakpoint
DROP TABLE `volunteers`;--> statement-breakpoint
ALTER TABLE `__new_volunteers` RENAME TO `volunteers`;