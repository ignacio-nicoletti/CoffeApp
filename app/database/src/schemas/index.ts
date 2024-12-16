import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

// First define the junction tables
const usersToOrders = pgTable("users_to_orders", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
});

const usersToMessages = pgTable("users_to_messages", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  messageId: uuid("message_id")
    .notNull()
    .references(() => message.id),
});

const usersToChats = pgTable("users_to_chats", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chat.id),
});

// Import your schemas
import users from "./user";
import chat from "./chat";
import item from "./item";
import message from "./message";
import order from "./order";
import product from "./product";
import role from "./role";

// Define relations
export const usersRelations = relations(users, ({ many, one }) => ({
  role: one(role, {
    fields: [users.roleId],
    references: [role.id],
  }),
  usersToOrders: many(usersToOrders),
  usersToMessages: many(usersToMessages),
  usersToChats: many(usersToChats),
}));

export const rolesRelations = relations(role, ({ many }) => ({
  users: many(users),
}));

export const chatRelations = relations(chat, ({ many, one }) => ({
  messages: many(message),
  userOne: one(users, {
    fields: [chat.userIdOne],
    references: [users.id],
  }),
  userTwo: one(users, {
    fields: [chat.userIdTwo],
    references: [users.id],
  }),
}));

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, {
    fields: [message.chatId],
    references: [chat.id],
  }),
  remitente: one(users, {
    fields: [message.remitenteId],
    references: [users.id],
  }),
}));

// Junction table relations
export const usersToOrdersRelations = relations(usersToOrders, ({ one }) => ({
  user: one(users, {
    fields: [usersToOrders.userId],
    references: [users.id],
  }),
  order: one(order, {
    fields: [usersToOrders.orderId],
    references: [order.id],
  }),
}));

export const usersToMessagesRelations = relations(usersToMessages, ({ one }) => ({
  user: one(users, {
    fields: [usersToMessages.userId],
    references: [users.id],
  }),
  message: one(message, {
    fields: [usersToMessages.messageId],
    references: [message.id],
  }),
}));

export const usersToChatsRelations = relations(usersToChats, ({ one }) => ({
  user: one(users, {
    fields: [usersToChats.userId],
    references: [users.id],
  }),
  chat: one(chat, {
    fields: [usersToChats.chatId],
    references: [chat.id],
  }),
}));

// Export all schemas and relations
export {
  users,
  chat,
  item,
  message,
  order,
  product,
  role,
  usersToOrders,
  usersToMessages,
  usersToChats,
};
