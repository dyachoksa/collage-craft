import Image from "next/image";
import Link from "next/link";

import { LogInIcon, UserPlusIcon } from "lucide-react";

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
            <a href="#features" className="text-gray-600 hover:text-pink-700">
              Features
            </a>
            <a href="#examples" className="text-gray-600 hover:text-pink-700">
              Examples
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-pink-700">
              Pricing
            </a>

            <div className="flex gap-4 items-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-pink-700 hover:text-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                <LogInIcon className="h-4 w-4 mr-2" />
                Login
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
