import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={35}
            height={35}
            className="rounded-sm"
            priority
            quality={100}
          />
          <p className="hidden sm:inline-flex text-xl font-semibold">LearnFlow AI</p>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        {user ? (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link href="/auth#signup">
              <Button variant="ghost">Signup</Button>
            </Link>
            <Link href="/auth#login">
              <Button>Login</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}