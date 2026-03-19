import type { Metadata } from "next";

import "./globals.css";

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
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
