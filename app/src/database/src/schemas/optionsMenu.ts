import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

// Definición del enum para las categorías
export const categoryEnum = pgEnum("category_enum", ["cafe", "te"]);

// Tabla OptionsMenu
const optionMenu = pgTable("optionMenu", {
  id: serial("id").primaryKey(),
  type: text("type"), // Título de la opción
  categories: categoryEnum("categories"), // Enum para las categorías
  createdAt: timestamp("created-at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated-at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
});

export default optionMenu;
export type InferOptionMenu = typeof optionMenu.$inferSelect;
export type InsertOptionMenu = typeof optionMenu.$inferInsert;
