import Link from "next/link";
import Image from "next/image";

export default async function Footer() {
  return (
    <footer className="bg-card border-t py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LearnFlow AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};