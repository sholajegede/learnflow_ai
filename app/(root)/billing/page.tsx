"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/user-context";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import PageLoader from "@/components/page-loader";

interface Plan {
  key: string;
}

interface EntitlementsData {
  data: {
    plans: Plan[];
  };
}

export default function Billing() {
  const { profile } = useUserContext();
  const { isAuthenticated, getAccessTokenRaw } = useKindeAuth();
  const [entitlements, setEntitlements] = useState<EntitlementsData | null>(null);

  if (!isAuthenticated) {
    return <PageLoader />;
  }

  useEffect(() => {
    const fetchEntitlements = async () => {
      const accessToken = await getAccessTokenRaw();
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_KINDE_ISSUER_URL}/account_api/v1/entitlements`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });
        const data = await res.json();
        console.log("Entitlements payload:", data);
        setEntitlements(data as EntitlementsData);
      } catch (error) {
        console.error("Error fetching entitlements:", error);
      }
    };
  
    fetchEntitlements();
  }, [getAccessTokenRaw]);

  let plan: "starter" | "pro" | "plus" = "pro";

  const plans = entitlements?.data?.plans ?? [];
  console.log("Plans:", plans);

  if (plans.some((p: any) => p.key === "pro")) {
    plan = "pro";
  } else if (plans.some((p: any) => p.key === "starter")) {
    plan = "starter";
  } else if (plans.some((p: any) => p.key === "plus")) {
    plan = "plus";
  }

  console.log("Plan:", plan);

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
            <h1 className="text-base font-medium">Billing</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <section className="px-4 lg:px-6 space-y-4">
                <h1>Change Your Plan</h1>
                <p>Change your subscription plan at any time.</p>
                <div>
                  <p>{profile?.firstName}</p>
                  <p>{profile?.lastName}</p>
                  <p>{profile?.email}</p>
                  
                </div>
                
              </section>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};