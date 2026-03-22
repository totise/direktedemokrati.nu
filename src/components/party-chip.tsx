"use client";

import type { ReactElement } from "react";

export interface PartyChipProps {
  label: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

export default function PartyChip({
  label,
  color,
  selected,
  onClick
}: PartyChipProps): ReactElement {
  return (
    <button
      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all ${selected ? "text-white shadow-md" : "bg-[#F3F4F6] text-[#2C2C2C] hover:bg-[#E5E7EB]"}`}
      onClick={onClick}
      style={{ backgroundColor: selected ? color : undefined }}
      type="button"
    >
      {label}
    </button>
  );
}
