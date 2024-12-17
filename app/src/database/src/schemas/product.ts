import { sql } from "drizzle-orm";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";

const product = pgTable("product", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
});

export default product;

export type InferProduct = typeof product.$inferSelect;
export type InserProduct = typeof product.$inferInsert;
