"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

const StoreView = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  return (
    <div className="w-full flex items-center flex-col ">
      <h1 className="text-2xl font-bold mb-4 ">Carrito</h1>
      {cartItems.length > 0 ? (
        <div className=" w-2/3 flex flex-col gap-4">
          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600">Cantidad: {item.quantity}</span>
              </li>
            ))}
          </ul>
          <Button>Confirmar Pedido</Button>
        </div>
      ) : (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default StoreView;
