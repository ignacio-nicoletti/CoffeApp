import { sql } from "drizzle-orm";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";

const chat = pgTable("chat", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userIdOne: text("user-id-one").notNull(), // Corregí los nombres de columnas si es necesario
  userIdTwo: text("user-id-two").notNull(),
});

export default chat;

export type InferChat = typeof chat.$inferSelect;
export type InsertChat = typeof chat.$inferInsert;
