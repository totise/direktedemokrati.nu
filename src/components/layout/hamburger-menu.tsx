"use client";

import Link from "next/link";
import type { ReactElement } from "react";

import { X } from "lucide-react";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps): ReactElement | null {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Luk menu"
        className="fixed inset-0 z-40 cursor-default bg-black/25"
        type="button"
        onClick={onClose}
      />
      <aside className="fixed right-0 top-0 z-50 h-full w-[min(20rem,85vw)] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between border-b border-[#F3F4F6] px-5 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">Menu</p>
            <p className="mt-1 font-bold text-lg text-[#2C2C2C]">direktedemokrati.nu</p>
          </div>
          <button
            aria-label="Luk menu"
            className="rounded-full p-2 transition-colors hover:bg-[#F3F4F6]"
            type="button"
            onClick={onClose}
          >
            <X className="h-6 w-6 text-[#2C2C2C]" />
          </button>
        </div>

        <nav className="px-5 py-4">
          <Link
            className="block rounded-2xl px-4 py-3 text-base font-semibold text-[#2C2C2C] transition-colors hover:bg-[#F3F4F6]"
            href="/about"
            onClick={onClose}
          >
            Om appen
          </Link>
          <Link
            className="mt-2 block rounded-2xl px-4 py-3 text-base font-semibold text-[#2C2C2C] transition-colors hover:bg-[#F3F4F6]"
            href="/find-constituency"
            onClick={onClose}
          >
            Find min kreds
          </Link>
        </nav>
      </aside>
    </>
  );
}
