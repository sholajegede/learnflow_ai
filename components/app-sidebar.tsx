"use client";

import * as React from "react";
import {
  IconHelp,
  IconListDetails,
  IconLayoutCollage,
  IconHistory,
  IconProgress
} from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutCollage,
    },
    {
      title: "Sessions",
      url: "/sessions",
      icon: IconProgress,
    },
    {
      title: "Companions",
      url: "/companions",
      icon: IconListDetails,
    },
    {
      title: "History",
      url: "/history",
      icon: IconHistory,
    },
  ],
  navSecondary: [
    {
      title: "Get Help",
      url: "mailto:shola@nextmvp.tech",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                  <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={25}
                    height={25}
                    className="rounded"
                    priority
                    quality={100}
                  />
                  <span className="text-base font-semibold">LearnFlow AI</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};