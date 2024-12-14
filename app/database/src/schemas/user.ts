import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import role from "./role";

const user = pgTable("user", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  lastname: text("lastname").notNull(),
  password: text("password").notNull(),
  roleId: integer("role-id")
    .references(() => role.id)
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

export default user;

export type InferUser = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;