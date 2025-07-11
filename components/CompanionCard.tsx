"use client";

import Image from "next/image";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserContext } from "@/contexts/user-context";

interface CompanionCardProps {
  _id: Id<"companions">;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  _id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  const { profile } = useUserContext();
  const bookmark = useQuery(api.bookmarks.getByCompanionId, {
    companionId: _id as Id<"companions">,
  });
  const addBookmark = useMutation(api.bookmarks.add);
  const removeBookmark = useMutation(api.bookmarks.remove);

  const handleBookmark = async () => {
    if (bookmark) {
      await removeBookmark({
        userId: profile?._id as Id<"users">,
        id: bookmark?._id as Id<"bookmarks">,
      });
    } else {
      await addBookmark({
        userId: profile?._id as Id<"users">,
        companionId: _id as Id<"companions">,
      });
    }
  };
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              bookmark ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${_id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;