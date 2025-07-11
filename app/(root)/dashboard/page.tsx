"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";

export default function Dashboard() {
  const result = useQuery(api.companions.search, {
    limit: 3,
  });
  const companions = result?.companions;
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
            <h1 className="text-base font-medium">Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex-1 flex flex-col py-4 md:py-6">
            <SectionCards />
            <div className="flex-1 flex flex-col">
              <div className="flex-1" />
              <section className="px-4 lg:px-6 space-y-4 mt-10 sm:mt-0">
                <h1 className="text-xl sm:text-3xl">Popular Companions</h1>
                <section className="home-section">
                  {companions?.map((companion) => (
                    <CompanionCard
                      key={companion._id as Id<"companions">}
                      {...companion}
                      color={getSubjectColor(companion.subject)}
                    />
                  ))}
                </section>
              </section>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}