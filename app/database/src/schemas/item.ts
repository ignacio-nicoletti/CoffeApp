import { sql } from "drizzle-orm";
import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";

const item = pgTable("item", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount"),
});

export default item;

export type InferItem = typeof item.$inferSelect;
export type InsertItem = typeof item.$inferInsert;
