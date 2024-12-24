"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import {
  Building2,
  NotebookPen,

  ShoppingBasket,
  SquarePen,
  TableProperties,

} from "lucide-react";

export const useUserRole = () => {
  const { data: session } = useSession();
  const [navItems, setNavItems] = useState<any>({});

  useEffect(() => {
    if (session) {
      if (session.user.role === 1) {
        const navItemsData = {
          navItemsMain: [
            {
              title: "Ordenar",
              url: "/dashboard/",
              icon: NotebookPen,
            },
            {
              title: "Carrito",
              url: "/dashboard/store",
              icon: ShoppingBasket,
            },
            {
              title: "Pedidos",
              url: "/dashboard/pedidos",
              icon: TableProperties,
              isActive: false,
            },
            // {
            //   title: "Herramientas",
            //   url: "#",
            //   icon: Wrench,
            //   isActive: false,
            //   items: [
            //     {
            //       title: "Recibos",
            //       url: "/dashboard/crear-recibo",
            //     },
            //     {
            //       title: "Reservas",
            //       url: "/dashboard/reserva-garantia",
            //     },
            //     {
            //       title: "Contratos",
            //       url: "https://pdf.trustfund.com.ar/hgc5143f5cg1f3x5df6x6d1c34h56",
            //     },
            //   ],
            // },
          ],
        };
        setNavItems(navItemsData);
      } else if (session.user.role === 2) {
        const navItemsData = {
          navItemsMain: [
            {
              title: "Pedidos",
              url: "/dashboard/",
              icon: Building2,
            },
            {
              title: "Mercaderia",
              url: "#",
              icon: NotebookPen,
              isActive: false,
              items: [
                {
                  title: "Productos",
                  url: "/dashboard/items",
                },
                {
                  title: "Menu",
                  url: "/dashboard/Menu",
                },
              ],
            },
            {
              title: "Mis gestiones",
              url: "/dashboard/",
              icon: SquarePen,
            },
          ],
        };
        setNavItems(navItemsData);
      }
    }
  }, [session]);
  return { navItems };
};
