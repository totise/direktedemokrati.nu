import type { Metadata, Viewport } from "next";
import type { ReactElement, ReactNode } from "react";
import { Nunito, Space_Grotesk } from "next/font/google";

import Header from "@/components/layout/header";

import "./globals.css";
import BottomNav from "@/components/layout/bottom-nav";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "direktedemokrati.nu",
  description: "Mobile-first civic participation web app"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="da" className={`${nunito.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-[#FFFAF5] font-['Nunito'] text-[#2C2C2C] antialiased">
        <Header />
        <div className="min-h-screen pb-24">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
