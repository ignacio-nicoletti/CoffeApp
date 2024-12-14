import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Tabla Roles
const role = pgTable("role", {
  id: serial("id").primaryKey(),
  type: text("type"), // Nombre del rol
  createdAt: timestamp("created-at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated-at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
});

export default role;
export type InferRole = typeof role.$inferSelect;
export type InsertRole = typeof role.$inferInsert;