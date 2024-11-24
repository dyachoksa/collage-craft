import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Footer from "~/components/Footer";
import Header from "~/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Collage Generator",
  description: "Generate simple and beautiful collages",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="CollageCraft" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="bg-white text-sm text-gray-900 font-sans antialiased ">
        <Header />

        <main className="pt-16">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
