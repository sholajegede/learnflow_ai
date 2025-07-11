"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PageLoader from "@/components/page-loader";
import RefreshPage from "@/components/refresh-page";

type UserData = {
  _id: Id<"users">;
  kindeId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  imageStorageId?: Id<"_storage">;
  paymentId?: string;
  plan?: 'free' | 'pro' | 'enterprise';
  features?: string[];
  companionLimit?: number;
  _creationTime: number; 
};

type UserContextType = {
  user: ReturnType<typeof useKindeBrowserClient>["user"];
  profile?: UserData;
  setProfile: React.Dispatch<React.SetStateAction<UserData | undefined>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user } = useKindeBrowserClient();
  const userId = user?.id;
  
  const fetchedProfile = useQuery(
    api.users.getUserKinde,
    userId ? { kindeId: userId } : "skip"
  );

  const [profile, setProfile] = useState<UserData | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (fetchedProfile === null && userId) {
      setError("Profile not found.");
    } else if (fetchedProfile) {
      setProfile(fetchedProfile);
      setError(undefined);
    }
  }, [fetchedProfile, userId]);

  const isLoading = userId && !profile && !error;

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <RefreshPage />;
  }

  return (
    <UserContext.Provider value={{ user, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};