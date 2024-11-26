import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const collages = pgTable(
  "collages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: varchar("user_id").notNull(),
    name: varchar("name"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("idx_collages_user").on(t.userId)]
);
