"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import {
  Building2,
  Calculator,
  CalendarDays,
  FilePen,
  LineChart,
  NotebookPen,
  Receipt,
  SquarePen,
  UserSearch,
  Wrench,
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
              title: "Inicio",
              url: "/dashboard/",
              icon: Building2,
            },
            {
              title: "Mi directorio",
              url: "#",
              icon: NotebookPen,
              isActive: false,
              items: [
                {
                  title: "Directorio",
                  url: "/dashboard/clientes",
                },
                {
                  title: "Cotizador",
                  url: "/dashboard/cotizador",
                },
              ],
            },
            {
              title: "Mis gestiones",
              url: "/dashboard/gestiones",
              icon: SquarePen,
            },
            {
              title: "Calendario",
              url: "/dashboard/calendario",
              icon: CalendarDays,
            },
          ],
        };
        setNavItems(navItemsData);
      } else if (session.user.role === 2) {
        const navItemsData = {
        
          navItemsMain: [
            {
              title: "Inicio",
              url: "/dashboard/",
              icon: Building2,
            },
            {
              title: "Gestiones",
              url: "/dashboard/gestiones",
              icon: SquarePen,
              isActive: false,
            },
            {
              title: "Herramientas",
              url: "#",
              icon: Wrench,
              isActive: false,
              items: [
                {
                  title: "Recibos",
                  url: "/dashboard/crear-recibo",
                },
                {
                  title: "Reservas",
                  url: "/dashboard/reserva-garantia",
                },
                {
                  title: "Contratos",
                  url: "https://pdf.trustfund.com.ar/hgc5143f5cg1f3x5df6x6d1c34h56",
                },
              ],
            },
            {
              title: "Calendario",
              url: "/dashboard/calendario",
              icon: CalendarDays,
            },
          ],
        };
        setNavItems(navItemsData);
      } else if (session.user.role === 3) {
        const navItemsData = {
        
          navItemsMain: [
            {
              title: "Inicio",
              url: "/dashboard/",
              icon: Wrench,
            },
            {
              title: "Mi directorio",
              url: "#",
              icon: SquarePen,
              isActive: true,
              items: [
                {
                  title: "Directorio",
                  url: "/dashboard/directorio",
                },
                {
                  title: "Cerradas ganadas",
                  url: "/dashboard/garantias/activas",
                },
                {
                  title: "Cerradas perdidas",
                  url: "/dashboard/garantias/cerradas",
                },
                {
                  title: "Finalizadas",
                  url: "/dashboard/garantias/finalizadas",
                },
              ],
            },
            {
              title: "Calendario",
              url: "/dashboard/calendario",
              icon: UserSearch,
            },
          ],
          toolsItems: [
            {
              title: "Simulador de garantías",
              url: "/dashboard/simulador-garantia",
              icon: Calculator,
            },
          ],
          external: [
            {
              name: "Recibos",
              url: "/dashboard/crear-recibo",
              icon: Receipt,
            },
            {
              name: "Reservas",
              url: "/dashboard/reserva-garantia",
              icon: CalendarDays,
            },
            {
              name: "Contratos",
              url: "https://pdf.trustfund.com.ar/hgc5143f5cg1f3x5df6x6d1c34h56",
              icon: FilePen,
            },
            {
              name: "Cotización directa",
              url: "https://pdf.trustfund.com.ar/ergashberthbreterta",
              icon: LineChart,
            },
            {
              name: "Cotización inmobiliaria",
              url: "https://pdf.trustfund.com.ar/gserthserthaerghae",
              icon: Building2,
            },
          ],
        };
        setNavItems(navItemsData);
      }
    }
  }, [session]);
  return { navItems };
};