DO $$ BEGIN
 CREATE TYPE "public"."linkPrecedence" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Content" (
	"id" serial PRIMARY KEY NOT NULL,
	"phoneNumber" text,
	"email" text NOT NULL,
	"linkedId" integer,
	"linkPrecedence" "linkPrecedence",
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"deletedAt" timestamp
);
