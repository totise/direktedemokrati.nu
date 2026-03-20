import type { ReactElement } from "react";

import { clampPercentage, formatPercentage } from "@/lib/utils";

export interface VoteBarProps {
  forPercentage: number;
}

export default function VoteBar({ forPercentage }: VoteBarProps): ReactElement {
  const safeForPercentage = clampPercentage(forPercentage);
  const againstPercentage = clampPercentage(100 - safeForPercentage);

  return (
    <div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-[#F3F4F6]">
        <div className="h-full rounded-l-full bg-[#22A06B]" style={{ width: `${safeForPercentage}%` }} />
        <div className="h-full rounded-r-full bg-[#E34935]" style={{ width: `${againstPercentage}%` }} />
      </div>
      <div className="mt-2 flex justify-between">
        <span className="text-[11px] font-bold text-[#22A06B]">For {formatPercentage(safeForPercentage)}</span>
        <span className="text-[11px] font-bold text-[#E34935]">Imod {formatPercentage(againstPercentage)}</span>
      </div>
    </div>
  );
}
