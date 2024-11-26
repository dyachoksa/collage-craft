import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { LogInIcon, UserPlusIcon } from "lucide-react";

import { Button } from "~/components/ui/button";

export default function Header() {
  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Collage Generator" width={256} height={256} priority className="h-8 w-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-700 to-pink-500 bg-clip-text text-transparent">
              CollageCraft
            </span>
          </Link>

          <nav className="md:flex gap-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-primary-700">
              Home
            </Link>
            <Link href="/collages" className="text-gray-600 hover:text-primary-700">
              Collages
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-700">
              About
            </Link>

            <div className="flex gap-4 items-center">
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost">
                    <LogInIcon className="h-4 w-4 mr-1" />
                    Login
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button>
                    <UserPlusIcon className="h-4 w-4 mr-1" />
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
