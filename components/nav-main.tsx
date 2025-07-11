"use client"

import { usePathname } from "next/navigation";
import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react"
import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === '/') {
      return pathname === url;
    }
    return pathname.startsWith(url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="build new companion"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <Link href="/companions/new" className="flex items-center gap-2">
                <IconCirclePlusFilled />
                <span>Build New Companion</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url} className="w-full">
                <SidebarMenuButton 
                  tooltip={item.title}
                  className={`w-full ${
                    isActive(item.url) 
                      ? 'bg-muted text-foreground' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  {item.icon && <item.icon className={isActive(item.url) ? 'text-primary' : ''} />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}