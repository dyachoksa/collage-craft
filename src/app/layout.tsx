import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Collage Generator",
  description: "Generate simple and beautiful collages",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-white text-base text-gray-900 antialiased">{children}</body>
    </html>
  );
}
