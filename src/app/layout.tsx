import type { Metadata } from "next";
import { Nunito, Space_Grotesk } from "next/font/google";

import "./globals.css";

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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="da" className={`${nunito.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
