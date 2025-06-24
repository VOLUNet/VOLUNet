ALTER TABLE `volunteers` RENAME COLUMN "num_people" TO "max_people";--> statement-breakpoint
ALTER TABLE `volunteers` ADD `current_people` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email` text NOT NULL;