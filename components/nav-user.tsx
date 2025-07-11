"use client"

import Link from "next/link"
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { PortalLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { useUserContext } from "@/contexts/user-context"

export function NavUser() {
  const { profile } = useUserContext();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={profile?.imageUrl as string} alt={profile?.firstName || ""} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{profile?.firstName || ""} {profile?.lastName || ""}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {profile?.email || ""}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel>
              <div className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={profile?.imageUrl as string} alt={profile?.firstName || ""} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{profile?.firstName || ""} {profile?.lastName || ""}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {profile?.email || ""}
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PortalLink className="flex items-center gap-2">
                  <IconUserCircle />
                  Account
                </PortalLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/billing" className="flex items-center gap-2">
                  <IconCreditCard />
                  Billing
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className="flex items-center gap-2">
                <IconLogout className="w-4 h-4" />
                <span>Logout</span>
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
