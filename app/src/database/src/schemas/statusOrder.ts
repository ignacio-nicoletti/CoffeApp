import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Tabla Roles
const statusOrder = pgTable("statusOrder", {
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

export default statusOrder;
export type InferStatusOrder = typeof statusOrder.$inferSelect;
export type InsertStatusOrder = typeof statusOrder.$inferInsert;
