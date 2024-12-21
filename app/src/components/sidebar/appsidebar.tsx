"use client";

import * as React from "react";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { Separator } from "../ui/separator";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";
import { useUserRole } from "../../../../hooks/useUserRole";

type SidebarProps = {
  session: Session;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar(props: SidebarProps) {
  const { data: session } = useSession();
  const { navItems } = useUserRole();

  return (
    <>
      {navItems && (
        <Sidebar collapsible="icon" variant="inset" {...props} className="bg-red">
          <SidebarHeader></SidebarHeader>
          <Separator decorative={true} className="w-10/12 bg-primary-foreground/25 mx-auto my-5" />
          <SidebarContent>
            <NavMain items={navItems?.navItemsMain} />
          </SidebarContent>
          <SidebarFooter>
            <NavUser user={props.session.user} />
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
