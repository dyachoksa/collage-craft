import { relations } from "drizzle-orm";
import { boolean, index, jsonb, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const collageStatus = pgEnum("collage_status", ["new", "draft", "created"]);

export const collages = pgTable(
  "collages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: varchar("user_id").notNull(),
    name: varchar("name"),
    status: collageStatus("status").notNull().default("new"),
    cloudinaryId: varchar("cloudinary_id"),
    cloudinaryUrl: varchar("cloudinary_url"),
    cloudinaryResponse: jsonb("cloudinary_response").default({}),
    lastGeneratedAt: timestamp("last_generated_at"),
    isPublic: boolean("is_public").notNull().default(false),
    publicSlug: varchar("public_slug").unique("unq_collages_public_slug"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("idx_collages_user").on(t.userId), index("idx_collages_cloudinary").on(t.cloudinaryId)]
);

export const images = pgTable(
  "images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: varchar("user_id").notNull(),
    collageId: uuid("collage_id")
      .notNull()
      .references(() => collages.id, { onDelete: "cascade" }),
    cloudinaryId: varchar("cloudinary_id").notNull(),
    cloudinaryResponse: jsonb("cloudinary_response").notNull().default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("idx_images_user").on(t.userId), index("idx_images_collage").on(t.collageId)]
);

export const collageRelations = relations(collages, ({ many }) => ({
  images: many(images),
}));

export const imageRelations = relations(images, ({ one }) => ({
  collage: one(collages, {
    fields: [images.collageId],
    references: [collages.id],
  }),
}));

export type InsertCollage = typeof collages.$inferInsert;
export type SelectCollage = typeof collages.$inferSelect;
export type InsertImage = typeof images.$inferInsert;
export type SelectImage = typeof images.$inferSelect;
