"use client";

import CompanionForm from "@/components/CompanionForm";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/contexts/user-context";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

const NewCompanion = () => {
  const { profile } = useUserContext();
  const canCreateCompanion = useQuery(api.companions.canCreateCompanion, {
    userId: profile?._id as Id<"users">,
  });

  return (
    <section className="px-4 lg:px-6 space-y-4">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="w-full mx-auto max-w-[600px] gap-4 flex flex-col items-center justify-center">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You’ve Reached Your Limit</h1>
          <p>
            You’ve reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </section>
  );
};

export default NewCompanion;