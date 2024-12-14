import { sql } from "drizzle-orm";
import { pgTable, uuid, integer } from "drizzle-orm/pg-core";
import user from "./user";

const order = pgTable("order", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userId: uuid("user-id")
    .references(() => user.id)
    .notNull(),
});

export default order;

export type InferOrder = typeof order.$inferSelect;
export type InsertOrder = typeof order.$inferInsert;
