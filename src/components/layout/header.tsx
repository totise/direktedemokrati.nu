"use client";

import Link from "next/link";
import type { ReactElement } from "react";

import { Bell, Menu, Vote } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps): ReactElement {
  return (
    <header className="sticky top-0 z-30 bg-[#FFFAF5]/95 px-5 pb-4 pt-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Link className="flex items-center gap-2" href="/vote" aria-label="Gå til vote-feeden">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B4FCF]">
            <Vote className="h-5 w-5 text-white" />
          </span>
          <span className="font-bold text-xl text-[#2C2C2C]">direkte</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            className="relative rounded-full p-2 transition-colors hover:bg-[#F3F4F6]"
            type="button"
            aria-label="Notifikationer"
          >
            <Bell className="h-6 w-6 text-[#2C2C2C]" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-[#FFFAF5] bg-[#FF6B35]" />
          </button>
          <button
            className="rounded-full p-2 transition-colors hover:bg-[#F3F4F6]"
            type="button"
            aria-label="Åbn menu"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6 text-[#2C2C2C]" />
          </button>
        </div>
      </div>
    </header>
  );
}
