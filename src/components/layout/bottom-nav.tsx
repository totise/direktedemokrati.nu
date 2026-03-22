"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

import { BarChart3, Users, Vote } from "lucide-react";

interface BottomNavItem {
  href: string;
  label: string;
  icon: typeof Vote;
}

const NAV_ITEMS: BottomNavItem[] = [
  { href: "/vote", label: "Stemme", icon: Vote },
  { href: "/results", label: "Resultater", icon: BarChart3 },
  { href: "/mps", label: "MF'er", icon: Users }
];

export default function BottomNav(): ReactElement {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/vote") {
      return pathname === "/" || pathname.startsWith("/vote");
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#F3F4F6] bg-white/95 backdrop-blur-md">
      <div className="pb-safe flex items-center justify-around py-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);

          return (
            <Link
              key={href}
              className={`flex flex-col items-center gap-1 transition-colors ${active ? "text-[#5B4FCF]" : "text-[#6B7280] hover:text-[#2C2C2C]"}`}
              href={href}
            >
              <Icon className="h-6 w-6" />
              <span className="text-[10px] font-bold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
