"use client";

import Image from "next/image";
import type { ReactElement } from "react";

import { Check, MapPin, X } from "lucide-react";

import type { MP } from "@/types";

import { formatFullName } from "@/lib/utils";

export interface MpAvatarProps {
  mp: MP;
  partyColor: string;
  isDimmed?: boolean;
  showLocalBadge?: boolean;
  matchState?: "match" | "mismatch" | null;
  onClick?: () => void;
}

export default function MpAvatar({
  mp,
  partyColor,
  isDimmed = false,
  showLocalBadge = false,
  matchState = null,
  onClick
}: MpAvatarProps): ReactElement {
  const initials = `${mp.firstName.charAt(0)}${mp.lastName.charAt(0)}`;

  const inner = (
    <>
      <div className="relative mb-1">
        <div
          className="h-14 w-14 rounded-full border-2 p-0.5"
          style={{ borderColor: partyColor }}
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6]">
            {mp.photoUrl ? (
              <Image
                alt={formatFullName(mp.firstName, mp.lastName)}
                className="object-cover"
                fill
                sizes="56px"
                src={mp.photoUrl}
              />
            ) : (
              <span className="font-['Space_Grotesk'] text-xs font-bold text-[#6B7280]">
                {initials}
              </span>
            )}
          </div>
        </div>

        {showLocalBadge && (
          <div className="absolute -top-1 -right-1 rounded-full border-2 border-[#FFFAF5] bg-[#FF6B35] p-1 text-white shadow-sm">
            <MapPin className="h-2.5 w-2.5" />
          </div>
        )}

        {matchState === "match" && (
          <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-[#FFFAF5] bg-[#22A06B] p-1 text-white shadow-sm">
            <Check className="h-2.5 w-2.5" />
          </div>
        )}

        {matchState === "mismatch" && (
          <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-[#FFFAF5] bg-[#E34935] p-1 text-white shadow-sm">
            <X className="h-2.5 w-2.5" />
          </div>
        )}
      </div>

      <span className="w-14 truncate text-center text-[9px] font-bold leading-tight text-[#2C2C2C]">
        {formatFullName(mp.firstName, mp.lastName)}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        aria-label={formatFullName(mp.firstName, mp.lastName)}
        className={`group flex flex-col items-center rounded-2xl p-2 transition-all ${isDimmed ? "opacity-30" : "hover:bg-[#F3F4F6]"}`}
        onClick={onClick}
        title={formatFullName(mp.firstName, mp.lastName)}
        type="button"
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      aria-label={formatFullName(mp.firstName, mp.lastName)}
      className={`group flex flex-col items-center rounded-2xl p-2 transition-all ${isDimmed ? "opacity-30" : "hover:bg-[#F3F4F6]"}`}
      title={formatFullName(mp.firstName, mp.lastName)}
    >
      {inner}
    </div>
  );
}
