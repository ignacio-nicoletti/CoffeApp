"use client";
const DashboardBarista = () => {
  const products = [
    {
      name: "Capuchino",
      image: "",
    },
    {
      name: "Cortado",
      image: "",
    },
    {
      name: "Te negro",
      image: "",
    },
    {
      name: "Frappe",
      image: "",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {products.map((el) => (
          <div className="w-[300px] h-[400px] bg-yellow-700 text-center text-3xl text-white font-bold rounded-lg">
            <p>{el.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBarista;
