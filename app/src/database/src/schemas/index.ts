import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

// First define the junction tables
const userToOrders = pgTable("user_to_orders", {
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
});

const userToMessages = pgTable("user_to_messages", {
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  messageId: uuid("message_id")
    .notNull()
    .references(() => message.id),
});

const userToChats = pgTable("user_to_chats", {
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => chat.id),
});

// Import your schemas
import user from "./user";
import chat from "./chat";
import item from "./item";
import message from "./message";
import order from "./order";
import product from "./product";
import role from "./role";
import statusOrder from "./statusOrder";

// Define relations
export const userRelations = relations(user, ({ many, one }) => ({
  role: one(role, {
    fields: [user.roleId],
    references: [role.id],
  }),
  userToOrders: many(userToOrders),
  userToMessages: many(userToMessages),
  userToChats: many(userToChats),
}));

export const rolesRelations = relations(role, ({ many }) => ({
  user: many(user),
}));

export const chatRelations = relations(chat, ({ many, one }) => ({
  messages: many(message),
  userOne: one(user, {
    fields: [chat.userIdOne],
    references: [user.id],
  }),
  userTwo: one(user, {
    fields: [chat.userIdTwo],
    references: [user.id],
  }),
}));

export const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, {
    fields: [message.chatId],
    references: [chat.id],
  }),
  remitente: one(user, {
    fields: [message.remitenteId],
    references: [user.id],
  }),
}));

// Junction table relations
export const userToOrdersRelations = relations(userToOrders, ({ one }) => ({
  user: one(user, {
    fields: [userToOrders.userId],
    references: [user.id],
  }),
  order: one(order, {
    fields: [userToOrders.orderId],
    references: [order.id],
  }),
}));

export const userToMessagesRelations = relations(userToMessages, ({ one }) => ({
  user: one(user, {
    fields: [userToMessages.userId],
    references: [user.id],
  }),
  message: one(message, {
    fields: [userToMessages.messageId],
    references: [message.id],
  }),
}));

export const userToChatsRelations = relations(userToChats, ({ one }) => ({
  user: one(user, {
    fields: [userToChats.userId],
    references: [user.id],
  }),
  chat: one(chat, {
    fields: [userToChats.chatId],
    references: [chat.id],
  }),
}));


export const orderRelations = relations(order, ({ one }) => ({
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  status: one(statusOrder, {
    fields: [order.statusOrderId],
    references: [statusOrder.id],
  }),
}));

export const statusOrderRelations = relations(statusOrder, ({ many }) => ({
  orders: many(order),
}));
// Export all schemas and relations
export {
  user,
  chat,
  item,
  message,
  order,
  product,
  role,
  userToOrders,
  userToMessages,
  userToChats,
};
