"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import { useUserContext } from "@/contexts/user-context";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function History() {
  const { profile } = useUserContext();

  const companions = useQuery(api.companions.getForUser, {
    userId: profile?._id as Id<"users">,
  });

  const sessions = useQuery(api.sessions.getForUser, {
    userId: profile?._id as Id<"users">,
  });

  const bookmarks = useQuery(api.bookmarks.getForUser, {
    userId: profile?._id as Id<"users">,
  });

  const sessionCompanions = 
    useQuery(api.companions.getMultipleCompanions, {
      ids: sessions?.flatMap((session) => 
        session.companionId ? session.companionId : []
      ) || [],
  });

  const bookmarkedCompanions = 
    useQuery(api.companions.getMultipleCompanions, {
      ids: bookmarks?.flatMap((bookmark) => 
        bookmark.companionId ? bookmark.companionId : []
      ) || [],
  });

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
            <h1 className="text-base font-medium">History</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <section className="px-4 lg:px-6 space-y-4">
                <section className="w-full space-y-8">
                  <section className="flex justify-between gap-4 max-sm:flex-col items-center">
                    <div className="flex gap-4 items-center">
                      <Image
                        src={profile?.imageUrl || "/images/cta.svg"}
                        alt={profile?.firstName || ""}
                        width={110}
                        height={110}
                      />
                      <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">
                          {profile?.firstName} {profile?.lastName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          {profile?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="border border-black rouded-lg p-3 gap-2 flex flex-col h-fit">
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/icons/check.svg"
                            alt="checkmark"
                            width={22}
                            height={22}
                          />
                          <p className="text-2xl font-bold">
                            {sessionCompanions?.length || 0}
                          </p>
                        </div>
                        <div>Lessons completed</div>
                      </div>
                      <div className="border border-black rouded-lg p-3 gap-2 flex flex-col h-fit">
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/icons/cap.svg"
                            alt="cap"
                            width={22}
                            height={22}
                          />
                          <p className="text-2xl font-bold">
                            {companions?.length || 0}
                          </p>
                        </div>
                        <div>Companions created</div>
                      </div>
                    </div>
                  </section>
                  <Accordion type="multiple">
                    <AccordionItem value="bookmarks">
                      <AccordionTrigger className="text-2xl font-bold">
                        Bookmarked Companions {`(${bookmarkedCompanions?.length || 0})`}
                      </AccordionTrigger>
                      <AccordionContent>
                        <CompanionsList
                          companions={bookmarkedCompanions}
                          title="Bookmarked Companions"
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="recent">
                      <AccordionTrigger className="text-2xl font-bold">
                        Recent Sessions {`(${sessionCompanions?.length || 0})`}
                      </AccordionTrigger>
                      <AccordionContent>
                        <CompanionsList
                          title="Recent Sessions"
                          companions={sessionCompanions}
                        />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="companions">
                      <AccordionTrigger className="text-2xl font-bold">
                        My Companions {`(${companions?.length || 0})`}
                      </AccordionTrigger>
                      <AccordionContent>
                        <CompanionsList
                          title="My Companions"
                          companions={companions}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              </section>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};