import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | LearnFlow AI",
  description: "LearnFlow AI Terms of Service",};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="prose dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the LearnFlow AI platform, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mt-8">
            <h2>2. Description of Service</h2>
            <p>
              LearnFlow AI provides an AI-powered learning platform that offers personalized educational
              experiences through interactive AI companions.
            </p>
          </section>

          <section className="mt-8">
            <h2>3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activities that occur under your account.
            </p>
          </section>

          <section className="mt-8">
            <h2>4. Privacy Policy</h2>
            <p>
              Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy
              to understand our practices.
            </p>
          </section>

          <section className="mt-8">
            <h2>5. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will provide notice of any changes
              by posting the new terms on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
