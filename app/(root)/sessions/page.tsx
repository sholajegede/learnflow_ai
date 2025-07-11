"use client";

import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserContext } from "@/contexts/user-context";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Sessions() {
  const { profile } = useUserContext();
  const recentSessionsCompanions = useQuery(
    api.sessions.getUserSessionsWithCompanions,
    profile?._id ? { userId: profile._id, limit: 10 } : "skip"
  );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">Sessions</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <section className="px-4 lg:px-6 space-y-4">
                <section className="home-section">
                  <CompanionsList
                    title="Recently completed sessions"
                    companions={recentSessionsCompanions}
                    classNames="w-2/3 max-lg:w-full"
                  />
                  <CTA />
                </section>
              </section>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};