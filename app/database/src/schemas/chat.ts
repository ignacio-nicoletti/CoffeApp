import { sql } from "drizzle-orm";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import user from "./user";

const chat = pgTable("chat", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userIdOne: uuid("user-id-one")
    .references(() => user.id)
    .notNull(),
  userIdTwo: uuid("user-id-two")
    .references(() => user.id)
    .notNull(),
});

export default chat;

export type InferChat = typeof chat.$inferSelect;
export type InsertChat = typeof chat.$inferInsert;
