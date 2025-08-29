CREATE TABLE "waitlist" (
	"email" text PRIMARY KEY NOT NULL,
	"name" text,
	"source" text,
	"utm" json,
	"referrer" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"confirmed_at" timestamp with time zone,
	"confirm_token" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "waitlist" USING btree ("email");--> statement-breakpoint
CREATE INDEX "confirm_token_idx" ON "waitlist" USING btree ("confirm_token");