ALTER TABLE `volunteers` RENAME COLUMN "name" TO "volunteer_name";--> statement-breakpoint
ALTER TABLE `volunteers` ADD `organizer_name` text NOT NULL;