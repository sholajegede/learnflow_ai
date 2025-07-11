"use client";

import { ReactNode, useCallback, useMemo } from "react";
import { KindeProvider, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

function useAuthFromKinde() {
  const { isLoading, isAuthenticated, getToken } = useKindeAuth();
  
  const fetchAccessToken = useCallback(async ({ forceRefreshToken }: { forceRefreshToken: boolean } = { forceRefreshToken: false }) => {
    try {
      const token = await getToken();
      console.log("Token:", token ? "Token received" : "No token");
      if (!token) {
        console.error("No token available");
        return null;
      }
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }, [getToken]);

  return useMemo(() => ({
    isLoading: Boolean(isLoading),
    isAuthenticated: Boolean(isAuthenticated),
    fetchAccessToken,
  }), [isLoading, isAuthenticated, fetchAccessToken]);
}

export function ConvexKindeProvider({ children }: { children: ReactNode }) {
  return (
    <KindeProvider
      domain={process.env.NEXT_PUBLIC_KINDE_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_KINDE_CLIENT_ID as string}
      redirectUri={process.env.NEXT_PUBLIC_KINDE_REDIRECT_URI as string}
      logoutUri={process.env.NEXT_PUBLIC_KINDE_LOGOUT_URI as string}
    >
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromKinde}>
        {children}
      </ConvexProviderWithAuth>
    </KindeProvider>
  );
}