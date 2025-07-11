"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, Home, AlertTriangle, BadgeHelp, ArrowLeft, Network } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RefreshPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(false);

  useEffect(() => {
    if (isAutoRefreshing && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isAutoRefreshing && countdown === 0) {
      router.refresh();
    }
  }, [countdown, isAutoRefreshing, router]);

  const startAutoRefresh = () => {
    setIsAutoRefreshing(true);
  };

  const cancelAutoRefresh = () => {
    setIsAutoRefreshing(false);
    setCountdown(10);
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center">
            <Network className="h-20 w-20 text-amber-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Connection Issue</CardTitle>
          <CardDescription className="mt-2 text-base text-muted-foreground">
            We encountered a temporary connection issue. This might be due to network problems or server maintenance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Quick troubleshooting steps:</p>
                  <ul className="ml-5 list-disc text-sm text-muted-foreground">
                    <li>Check your internet connection</li>
                    <li>Clear your browser cache</li>
                    <li>Try refreshing the page</li>
                  </ul>
                </div>
              </div>
            </div>

            {isAutoRefreshing && (
              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="text-primary font-medium">
                  Auto-refreshing in {countdown} seconds...
                </div>
                <Button variant="ghost" size="sm" onClick={cancelAutoRefresh}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-col gap-2 pt-4">
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Button 
              className="w-full" 
              onClick={() => router.refresh()}
            >
              <RotateCcw className="mt-0.5 h-4 w-4" />
              Refresh Now
            </Button>
            {!isAutoRefreshing && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={startAutoRefresh}
              >
                Auto-refresh
              </Button>
            )}
          </div>
          <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
            <Link href="/dashboard" className="w-full">
              <Button variant="secondary" className="w-full">
                <Home className="mt-0.5 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
            <Link href="mail:shola@nextmvp.tech" target="_blank" className="w-full">
              <Button variant="link" className="w-full">
                <BadgeHelp className="mt-0.5 h-4 w-4" />
                Get Help
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
      <Button variant="link" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </Button>
    </div>
  );
};