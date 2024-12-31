import { pgTable, uuid, integer } from "drizzle-orm/pg-core";
import order from "./order";
import product from "./product";

 const orderToProduct = pgTable("order_to_product", {
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
  productId: uuid("product_id")
    .notNull()
    .references(() => product.id),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
});
export default orderToProduct;