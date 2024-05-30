DO $$ BEGIN
 CREATE TYPE "public"."linkPrecedence" AS ENUM('primary', 'secondary');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Content" (
	"id" serial PRIMARY KEY NOT NULL,
	"phoneNumber" text,
	"email" text,
	"linkedId" integer,
	"linkPrecedence" "linkPrecedence" DEFAULT 'primary',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "Content" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "Content" ("phoneNumber");