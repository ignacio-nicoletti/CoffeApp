"use client";

import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";
import { MockData } from "../../server-actions/getMocks";

interface props {
  mocks: MockData;
}

const DashboardBarista = ({ mocks }: props) => {
  const products = [
    {
      name: "Capuchino",
      variant: "Con leche entera ",
      quantity: 3,
    },
    {
      name: "Cortado",
      variant: "Con leche descremada",
      quantity: 2,
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 justify-center items-center">
        {products.map((el, index) => (
          <div
            className="flex justify-evenly items-center w-full h-[100px] bg-yellow-700 text-center text-3xl text-white font-bold rounded-lg"
            key={index}
          >
            <p className="flex-1">{el.name}</p>
            <p className="flex-1">{el.variant}</p>
            <p className="flex-1">{el.quantity}</p>
            <div className="flex-1">
              <DropdownMenu key={index}>
                <DropdownMenuTrigger>
                  <Button>Pendiente</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent key={index}>
                  <DropdownMenuLabel>Estado</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {mocks.statusOrderTypes.map((el, index) => (
                    <DropdownMenuItem key={index}>{el.type}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBarista;
