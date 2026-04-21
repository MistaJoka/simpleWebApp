// Root layout: wraps every route; Server Component by default
// sets html/body, fonts, metadata SEO

// import Metadata type for title/description OpenGraph
import type { Metadata } from "next";
// import Google fonts via next/font (no layout shift)
import { Geist, Geist_Mono } from "next/font/google";
// global CSS entry (Tailwind + tokens)
import "./globals.css";

// configure sans font CSS vars
const geistSans = Geist({
  // expose as CSS var for Tailwind font-sans
  variable: "--font-geist-sans",
  // latin subset smaller download
  subsets: ["latin"],
});

// configure mono font CSS vars
const geistMono = Geist_Mono({
  // mono var for code blocks
  variable: "--font-geist-mono",
  // latin subset
  subsets: ["latin"],
});

// export metadata: static SEO for all pages unless overridden
export const metadata: Metadata = {
  // title shown tab + search
  title: "Web App Anatomy",
  // description snippet
  description: "Interactive map of frontend/backend pieces in a simple modern web app.",
};

// export RootLayout: children = page slot
export default function RootLayout({
  // children prop from router
  children,
}: Readonly<{
  // React node tree
  children: React.ReactNode;
}>) {
  // return html shell
  return (
    // lang a11y + font vars + full height
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      {/* body flex column min height */}
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
