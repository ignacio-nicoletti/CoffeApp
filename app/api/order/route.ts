import { NextRequest, NextResponse } from "next/server";
import db, { order, orderToProduct } from "../../src/database/src";

export async function POST(request: NextRequest) {
  try {
    const cartItems = await request.json(); // Recibe el carrito

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { message: "El carrito está vacío o el formato es inválido." },
        { status: 400 }
      );
    }

    // Simulación de usuario y estado inicial
    const userId = "b8d8be95-8386-4c16-90c6-821b5a0aca51"; // Reemplaza con un valor válido (ej. autenticación)
    const initialStatusOrderId = 1; // Cambia según tu sistema de estados

    // Insertar la orden
    const [newOrder] = await db
      .insert(order)
      .values({
        userId,
        statusOrderId: initialStatusOrderId,
      })
      .returning();

    // Insertar productos relacionados con la orden
    const orderProducts = cartItems.map((item) => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price, // Asegúrate de que este campo exista en el frontend
    }));

    await db.insert(orderToProduct).values(orderProducts);

    return NextResponse.json({ message: "Orden registrada con éxito" }, { status: 201 });
  } catch (error: any) {
    console.error("Error en el endpoint de registrar orden:", error.message);
    return NextResponse.json(
      { message: "Ocurrió un error inesperado" },
      { status: 500 }
    );
  }
}
