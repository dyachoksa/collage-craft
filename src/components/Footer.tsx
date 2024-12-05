import Image from "next/image";
import Link from "next/link";

import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="py-12 section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Collage Generator" width={256} height={256} priority className="h-8 w-8" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-700 to-pink-500 bg-clip-text text-transparent">
                CollageCraft
              </span>
            </div>
            <p className="mt-4 text-gray-500 text-sm">Creating beautiful memories, one collage at a time.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/#features" className="text-base text-gray-500 hover:text-pink-700">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#examples" className="text-base text-gray-500 hover:text-pink-700">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-pink-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/collages" className="text-base text-gray-500 hover:text-pink-700">
                  Collages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
            <div className="flex space-x-6 mt-4">
              <a href="#" className="text-gray-400 hover:text-pink-700">
                <SiX className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-700">
                <SiInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-700">
                <SiFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} CollageCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
