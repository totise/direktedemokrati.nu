"use client";

import { useState, type ReactElement, type ReactNode } from "react";

import { usePathname } from "next/navigation";

import BottomNav from "@/components/layout/bottom-nav";
import HamburgerMenu from "@/components/layout/hamburger-menu";
import Header from "@/components/layout/header";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <main key={pathname} className="fade-in-page min-h-screen pb-24">
        {children}
      </main>
      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <BottomNav />
    </>
  );
}
