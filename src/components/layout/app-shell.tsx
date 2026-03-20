"use client";

import { useState, type ReactElement, type ReactNode } from "react";

import BottomNav from "@/components/layout/bottom-nav";
import HamburgerMenu from "@/components/layout/hamburger-menu";
import Header from "@/components/layout/header";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <main className="min-h-screen pb-24">{children}</main>
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <BottomNav />
    </>
  );
}
