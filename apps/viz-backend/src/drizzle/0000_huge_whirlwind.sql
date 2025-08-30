-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."device_enum" AS ENUM('mobile', 'tablet', 'desktop');--> statement-breakpoint
CREATE TYPE "public"."language_enum" AS ENUM('en', 'es', 'fr', 'de');--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"password_hash" text NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_uuid_key" UNIQUE("uuid"),
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "hero_greetings" (
	"hero_greeting_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"footer" text NOT NULL,
	"language" "language_enum" DEFAULT 'en' NOT NULL,
	"device" "device_enum" DEFAULT 'desktop' NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hero_greetings" ADD CONSTRAINT "fk_hero_greeting_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE VIEW "public"."vw_get_hero" AS (SELECT u.name, u.email, hg.title AS greeting_title, hg.content AS greeting_content, hg.footer AS greeting_footer FROM users u JOIN hero_greetings hg ON u.user_id = hg.user_id WHERE u.uuid = 'c8988785-25db-4a86-add3-9b6873ff131b'::uuid AND u.deleted_at IS NULL AND hg.language = 'en'::language_enum);
*/