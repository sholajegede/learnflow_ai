"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./_components/login-form";
import { SignupForm } from "./_components/signup-form";
import PageLoader from "@/components/page-loader";

export default function AuthPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthContent />
    </Suspense>
  );
}

function AuthContent() {
  const [activeTab, setActiveTab] = useState("login");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash === "signup" || hash === "login") {
      setActiveTab(hash);
    }
  }, [pathname, searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.history.replaceState({}, "", `#${value}`);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-4 p-2.5">
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-2">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={35}
              height={35}
              className="rounded-md"
              priority
              quality={100}
            />
            <span className="text-xl font-bold">LearnFlow AI</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
              defaultValue="login"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm
                />
              </TabsContent>

              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div
        className="relative hidden lg:block h-full overflow-hidden rounded-[32px] border border-purple-500/20 backdrop-blur-xl lg:col-span-2"
        style={{
          background:
            "linear-gradient(135deg, rgba(194, 65, 12, 0.95) 0%, rgba(147, 51, 234, 0.95) 100%)",
          boxShadow:
            "0 0 48px 0 rgba(194, 65, 12, 0.3), 0 4px 48px 0 rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Enhanced outer glow */}
        <div
          className="absolute -inset-3 rounded-[40px] pointer-events-none z-0"
          style={{ boxShadow: "0 0 80px 20px rgba(194, 65, 12, 0.3)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-md relative z-10">
            <h1 className="text-4xl font-bold text-white mb-6">
              Welcome to LearnFlow AI
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Transform your learning journey with our AI-powered platform. Get
              personalized courses, track your progress, and achieve your goals
              faster.
            </p>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 rounded-full bg-white/70"></div>
              <div className="h-2 w-2 rounded-full bg-white/50"></div>
              <div className="h-2 w-2 rounded-full bg-white/30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}