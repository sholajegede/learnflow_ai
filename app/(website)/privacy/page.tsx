import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | LearnFlow AI",
  description: "LearnFlow AI Privacy Policy",
};

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you create an account,
              use our services, or communicate with us.
            </p>
          </section>

          <section className="mt-8">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your learning experience</li>
              <li>Communicate with you about our services</li>
              <li>Analyze how users interact with our platform</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with third-party
              service providers who assist us in operating our platform.
            </p>
          </section>

          <section className="mt-8">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from
              unauthorized access, alteration, or destruction.
            </p>
          </section>

          <section className="mt-8">
            <h2>5. Your Choices</h2>
            <p>
              You may update or delete your account information at any time by accessing your account
              settings.
            </p>
          </section>

          <section className="mt-8">
            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new policy on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
