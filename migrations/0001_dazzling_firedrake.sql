CREATE TYPE "public"."collage_status" AS ENUM('new', 'draft', 'created');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"collage_id" uuid NOT NULL,
	"cloudinary_id" varchar NOT NULL,
	"cloudinary_response" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collages" ADD COLUMN "status" "collage_status" DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE "collages" ADD COLUMN "cloudinary_id" varchar;--> statement-breakpoint
ALTER TABLE "collages" ADD COLUMN "cloudinary_url" varchar;--> statement-breakpoint
ALTER TABLE "collages" ADD COLUMN "cloudinary_response" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "collages" ADD COLUMN "last_generated_at" timestamp;--> statement-breakpoint
ALTER TABLE "collages" ADD COLUMN "is_public" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "collages" ADD COLUMN "public_slug" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_collage_id_collages_id_fk" FOREIGN KEY ("collage_id") REFERENCES "public"."collages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_images_user" ON "images" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_images_collage" ON "images" USING btree ("collage_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_collages_cloudinary" ON "collages" USING btree ("cloudinary_id");--> statement-breakpoint
ALTER TABLE "collages" ADD CONSTRAINT "unq_collages_public_slug" UNIQUE("public_slug");