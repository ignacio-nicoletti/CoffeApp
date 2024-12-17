import { sql } from "drizzle-orm";
import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import chat from "./chat";
import user from "./user";

const message = pgTable("message", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  chatId: uuid("chat-id") // Cambiado a `uuid` para que coincida con el tipo de `chat.id`
    .references(() => chat.id)
    .notNull(),
  remitenteId: uuid("remitente-id") // Cambiado a `uuid` para que coincida con el tipo de `user.id`, asumiendo que `user.id` es `uuid`
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp("created-at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated-at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
});

export default message;

export type InferMessage = typeof message.$inferSelect;
export type InsertMessage = typeof message.$inferInsert;
