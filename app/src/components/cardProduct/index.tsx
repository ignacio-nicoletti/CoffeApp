import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { PlusCircle } from "lucide-react";

const ProductComponent = ({ data }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState("");

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const product = {
      id: data.id,
      name: data.name,
      quantity,
      options,
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Producto añadido al carrito!");
    setModalOpen(false);
  };

  return (
    <div>
      <div className="w-[300px] bg-white shadow-lg rounded-lg overflow-hidden" key={data.id}>
        <div className="relative h-[200px]"></div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{data?.name}</h2>
          <Button
            onClick={() => setModalOpen(true)}
            className="w-full bg-yellow-700 hover:bg-yellow-800 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar al carrito
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar Producto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Cantidad:</label>
              <Input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            {/* Options Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Opciones:</label>
              <Input
                type="text"
                placeholder="Escribe tus opciones"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddToCart}>Añadir</Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductComponent;
