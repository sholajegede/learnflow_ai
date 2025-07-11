"use client";

import { useRouter, useParams } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";
import { useUserContext } from "@/contexts/user-context";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect } from "react";
import PageLoader from "@/components/page-loader";

const CompanionSession = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { profile } = useUserContext();

  const companion = useQuery(api.companions.getById, {
    id: id as Id<"companions">,
  });

  useEffect(() => {
    if (companion === null) {
      router.push('/companions');
    } else if (companion && !companion.name) {
      router.push('/companions');
    }
  }, [companion, router]);

  if (!companion) {
    return <PageLoader />
  }

  const { name, subject, topic, duration } = companion;

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div 
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" 
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image 
              src={`/icons/${subject}.svg`} 
              alt={subject} 
              width={35} 
              height={35} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">
                {subject}
              </div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={id}
        userName={profile?.firstName || ''}
        userImage={profile?.imageUrl || ''}
      />
    </main>
  );
};

export default CompanionSession;