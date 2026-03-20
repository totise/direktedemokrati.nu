import Link from "next/link";
import type { ReactElement } from "react";

import { Clock } from "lucide-react";

import type { VoteChoice } from "@/types";

import { CARD_RADIUS, CARD_SHADOW } from "@/lib/constants";
import { formatCountdown } from "@/lib/utils";

import VoteBar from "@/components/vote-bar";

export interface ProposalCardProps {
  id: string;
  title: string;
  summary: string;
  scheduledVoteDate: string;
  forPercentage: number;
  voteChoice?: VoteChoice | null;
}

export default function ProposalCard({
  id,
  title,
  summary,
  scheduledVoteDate,
  forPercentage,
  voteChoice
}: ProposalCardProps): ReactElement {
  const countdown = formatCountdown(scheduledVoteDate);
  const isVoted = voteChoice !== null && voteChoice !== undefined;

  const voteLabel = voteChoice === "for" ? "Du stemte: For" : "Du stemte: Imod";

  return (
    <Link
      className={`mb-4 block bg-[#FFFFFF] p-5 ${CARD_RADIUS} ${CARD_SHADOW} transition-transform duration-200 active:scale-[0.98]`}
      href={`/proposal/${id}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="w-3/4 text-lg font-bold leading-tight text-[#2C2C2C]">{title}</h3>
        <div className="flex items-center gap-1 rounded-full bg-[#FF6B35]/10 px-2 py-1 text-[#FF6B35]">
          <Clock className="h-3 w-3" />
          <span className="text-[10px] font-bold uppercase tracking-wide">{countdown}</span>
        </div>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-[#6B7280]">{summary}</p>

      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <VoteBar forPercentage={forPercentage} />
        </div>
        <div className="shrink-0">
          {isVoted ? (
            <span className="rounded-xl bg-[#F3F4F6] px-3 py-2 text-xs font-bold text-[#2C2C2C]">{voteLabel}</span>
          ) : (
            <span className="rounded-xl bg-[#5B4FCF] px-4 py-2 text-xs font-bold text-white hover:bg-[#3D329F]">
              Stem nu
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
