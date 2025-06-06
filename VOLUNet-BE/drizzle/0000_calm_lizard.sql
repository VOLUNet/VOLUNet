CREATE TABLE `users_volunteers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`volunteer_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon_url` text NOT NULL,
	`comment` text NOT NULL,
	`qr_code` text NOT NULL,
	`isTeacher` integer DEFAULT false,
	`isStudent` integer DEFAULT false,
	`isOrganizer` integer DEFAULT false,
	`created_at` integer DEFAULT '"2025-06-06T01:06:08.067Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-06-06T01:06:08.067Z"' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `volunteers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`event_date` integer NOT NULL,
	`description` text NOT NULL,
	`is_shared_to_students` integer DEFAULT false,
	`created_at` integer DEFAULT '"2025-06-06T01:06:08.066Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-06-06T01:06:08.066Z"' NOT NULL
);
