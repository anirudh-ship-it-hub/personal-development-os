
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Personal Monitoring Dashboard",
  description:
    "Track projects, focus areas, habits and personal growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    > 
      <body className="min-h-full flex flex-col">
      <nav className="border-b p-4">
        <div className="flex gap-4">

        <Link href="/">
  Command Center
</Link>

<Link href="/projects">
  Missions
</Link>

<Link href="/habits">
  Execution
</Link>
        </div>
      </nav>
      {children}</body>
    </html>
  );
}
