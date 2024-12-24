"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { product } from "../../database/src";

const DashboardUser = () => {
  const products = [
    {
      name: "Capuchino",
      image: "",
      id: 1,
    },
    {
      name: "Cortado",
      image: "",
      id: 2,
    },
    {
      name: "Te negro",
      image: "",
      id: 3,
    },
    {
      name: "Frappe",
      image: "",
      id: 4,
    },
  ];
  const onAddToCart = (product: string) => {
    console.log(product);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {products.map((el: any) => (
          <div className="w-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-[200px]"></div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{el?.name}</h2>
              <Button
                onClick={() => onAddToCart(el?.id)}
                className="w-full bg-yellow-700 hover:bg-yellow-800 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Agregar al carrito
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardUser;
