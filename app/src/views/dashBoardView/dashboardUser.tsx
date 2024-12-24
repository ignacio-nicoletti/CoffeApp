"use client";
import { product } from "../../database/src";
import ProductComponent from "../../components/cardProduct";

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
      name: "Frappuchino",
      image: "",
      id: 4,
    },
    {
      name: "Te saborizado",
      image: "",
      id: 5,
    },
    {
      name: "jugo de naranaja",
      image: "",
      id: 6,
    },
    {
      name: "Frappe",
      image: "",
      id: 7,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ordena tu menú</h1>

      <div className="flex flex-wrap gap-4 justify-center items-center">
        {products.map((el: any) => (
          <ProductComponent data={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};

export default DashboardUser;
