"use client";

import { useEffect, useState } from "react"; // Import useState and useEffect
import { ChevronsUpDown, type LucideIcon } from "lucide-react";

import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";
import Link from "next/link";
import { SidebarGroup } from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

type SubItem = {
  title: string;
  url: string;
};

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SubItem[]; 
};

type NavMainProps = {
  items?: NavItem[]; // Update to use NavItem type
};

export function NavMain({ items }: NavMainProps) {
  const [cartCount, setCartCount] = useState(0); // State for cart item count

  useEffect(() => {
    // Function to calculate the cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]"); // Get cart from localStorage
      setCartCount(cart.length); // Update state with the number of items in the cart
    };

    updateCartCount(); // Initial load
    window.addEventListener("storage", updateCartCount); // Listen for changes to localStorage

    return () => {
      window.removeEventListener("storage", updateCartCount); // Cleanup listener
    };
  }, []);

  // If items are provided, use them; otherwise, fallback to empty array
  const filteredItems = items || [];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {filteredItems.length > 0 &&
          filteredItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {/* If the item has sub-items, render a dropdown */}
              {item.items ? (
                <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
                  <div>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="flex justify-between">
                        <div className="flex items-center gap-2">
                          {item.icon && <item.icon size={16} />}
                          <span>{item.title}</span>
                        </div>

                        <ChevronsUpDown className="h-4 w-4" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6">
                      {item.items.map((subItem) => (
                        <SidebarMenuSubButton
                          asChild
                          key={subItem.title}
                          className="text-primary-foreground"
                        >
                          <Link href={subItem.url} className="block">
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      ))}
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ) : (
                // Otherwise, render it as a plain navigation item
                <Link href={item.url}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {item.title === "Carrito" && (
                      <SidebarMenuBadge className="text-white">{cartCount}</SidebarMenuBadge>
                    )}
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
