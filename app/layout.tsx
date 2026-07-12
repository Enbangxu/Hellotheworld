import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello the World | Modern Next.js Landing Page",
  description: "Hello the World — a beautiful first website built with Next.js 15, Tailwind CSS, Framer Motion, and Lucide React.",
  metadataBase: new URL("https://hellotheworld.vercel.app"),
  openGraph: {
    title: "Hello the World",
    description: "Welcome to my first website.",
    type: "website",
    url: "https://hellotheworld.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello the World",
    description: "Welcome to my first website.",
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
