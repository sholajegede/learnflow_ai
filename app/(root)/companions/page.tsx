"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PageLoader from "@/components/page-loader";
import { useUserContext } from "@/contexts/user-context";
import Link from "next/link";

export default function LibraryPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Library />
    </Suspense>
  );
}

function Library() {
  const { profile } = useUserContext();
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") || "";
  const topic = searchParams.get("topic") || "";

  const result = useQuery(api.companions.searchForUser, {
    userId: profile?._id as Id<"users">,
    subject,
    topic,
  });

  const companions = result?.companions;

  return (
    <section className="px-4 lg:px-6 space-y-4">
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions?.length ? (
          companions.map((companion) => (
            <CompanionCard
              key={companion._id as Id<"companions">}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">No Companions Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't created any learning companions yet. Create your first companion to get started!
              </p>
              <Link 
                href="/companions/new" 
                className="btn-primary inline-flex items-center justify-center px-6 py-3 rounded-xl"
              >
                Create New Companion
              </Link>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};