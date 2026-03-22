"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { useMemo, useState } from "react";

import { Plus, ThumbsDown, ThumbsUp, Vote } from "lucide-react";

import type { Proposal, UserVote } from "@/types";

import {
  parliamentaryVoteResults as mockParliamentaryResults,
  userVotes as mockUserVotes,
  proposals as mockProposals
} from "@/lib/mock-data";
import { useVotes } from "@/hooks/use-votes";

type Tab = "votes" | "archive";

const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "I dag";
  }
  if (diffDays === 1) {
    return "I går";
  }
  if (diffDays < 7) {
    return `${diffDays} dage siden`;
  }
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? "uge" : "uger"} siden`;
  }

  return date.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

const getProposal = (proposalId: string): Proposal | undefined =>
  mockProposals.find((p) => p.id === proposalId);

const getResult = (proposalId: string) =>
  mockParliamentaryResults.find((r) => r.proposalId === proposalId);

const getUserMatch = (vote: UserVote): boolean | null => {
  const result = getResult(vote.proposalId);
  if (!result) return null;

  const votedFor = vote.voteChoice === "for";
  const passed = result.result === "passed";
  return votedFor === passed;
};

const isPending = (proposalId: string): boolean => {
  const proposal = getProposal(proposalId);
  if (!proposal) return true;
  return (
    proposal.status === "open_for_voting" ||
    proposal.status === "closed_pending_result"
  );
};

interface VoteCardProps {
  vote: UserVote;
}

const VoteCard = ({ vote }: VoteCardProps): ReactElement => {
  const router = useRouter();
  const proposal = getProposal(vote.proposalId);
  const result = getResult(vote.proposalId);
  const userWon = getUserMatch(vote);
  const pending = isPending(vote.proposalId);

  const handlePress = (): void => {
    if (pending) {
      router.push(`/proposal/${vote.proposalId}`);
    } else {
      router.push(`/results/${vote.proposalId}`);
    }
  };

  if (!proposal) return <></>;

  return (
    <button
      className="mb-3 flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow active:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      onClick={handlePress}
      type="button"
    >
      <div
        className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl ${vote.voteChoice === "for" ? "bg-[#22A06B]/10" : "bg-[#E34935]/10"}`}
      >
        {vote.voteChoice === "for" ? (
          <ThumbsUp className="h-6 w-6 text-[#22A06B]" />
        ) : (
          <ThumbsDown className="h-6 w-6 text-[#E34935]" />
        )}
        <span className="mt-0.5 text-[9px] font-bold uppercase text-[#6B7280]">
          {vote.voteChoice === "for" ? "For" : "Imod"}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="mb-1 truncate text-base font-bold leading-snug text-[#2C2C2C]">
          {proposal.officialTitle}
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-['Space_Grotesk'] text-[#6B7280]">
            {formatRelativeDate(vote.timestamp)}
          </span>
          {!pending && result && (
            <>
              <span className="h-1 w-1 rounded-full bg-[#D1D5DB]" />
              <span
                className={`font-bold ${result.result === "passed" ? "text-[#22A06B]" : "text-[#E34935]"}`}
              >
                {result.result === "passed" ? "Vedtaget" : "Forkastet"}
              </span>
            </>
          )}
        </div>
      </div>

      {pending && (
        <div className="shrink-0 rounded-full bg-[#F59E0B]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#F59E0B]">
          Afventer
        </div>
      )}

      {!pending && userWon !== null && (
        <div
          className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${userWon ? "bg-[#22A06B]" : "bg-[#E34935]"}`}
        >
          {userWon ? "Korrekt" : "Forkert"}
        </div>
      )}
    </button>
  );
};

interface SectionHeaderProps {
  title: string;
  count: number;
}

const SectionHeader = ({ title, count }: SectionHeaderProps): ReactElement => (
  <div className="mb-3 flex items-center justify-between px-1">
    <h2 className="text-lg font-bold text-[#2C2C2C]">{title}</h2>
    <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-xs font-bold text-[#6B7280]">
      {count}
    </span>
  </div>
);

const EmptyState = (): ReactElement => (
  <div className="flex flex-col items-center justify-center px-6 pt-16">
    <div className="relative mb-6 h-32 w-32">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#F3F4F6]">
        <Vote className="h-16 w-16 text-[#D1D5DB]" />
      </div>
      <div className="absolute -bottom-2 -right-2 rounded-full bg-[#FF6B35] p-2 shadow-lg">
        <Plus className="h-6 w-6 text-white" />
      </div>
    </div>

    <h2 className="mb-2 text-center text-xl font-bold text-[#2C2C2C]">
      Ingen stemmer endnu
    </h2>
    <p className="mb-8 text-center text-sm text-[#6B7280]">
      Du har ikke afgivet nogen forudsigelser. Gå til stemmefeed&apos;en og giv
      din mening til kende.
    </p>

    <Link
      className="rounded-xl bg-[#5B4FCF] py-3 px-8 font-bold text-white shadow-lg shadow-[#5B4FCF]/20"
      href="/vote"
    >
      Start med at stemme
    </Link>
  </div>
);

export default function ResultsPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<Tab>("votes");
  const { votes, isLoaded } = useVotes();

  const pendingVotes = useMemo(
    () => votes.filter((v) => isPending(v.proposalId)),
    [votes]
  );

  const concludedVotes = useMemo(
    () => votes.filter((v) => !isPending(v.proposalId)),
    [votes]
  );

  const concludedDisplayVotes =
    concludedVotes.length > 0
      ? concludedVotes
      : mockUserVotes.filter((v) => !isPending(v.proposalId));

  return (
    <div className="min-h-screen bg-[#FFFAF5] font-['Nunito'] pb-28">
      <header className="sticky top-0 z-30 bg-[#FFFAF5] px-5 pt-6 pb-2">
        <h1 className="mb-4 text-2xl font-bold text-[#2C2C2C]">Resultater</h1>

        <div className="flex rounded-xl bg-[#F3F4F6] p-1">
          <button
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${activeTab === "votes" ? "bg-white text-[#2C2C2C] shadow-sm" : "text-[#6B7280] hover:text-[#2C2C2C]"}`}
            onClick={() => setActiveTab("votes")}
            type="button"
          >
            Dine stemmer
          </button>
          <button
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${activeTab === "archive" ? "bg-white text-[#2C2C2C] shadow-sm" : "text-[#6B7280] hover:text-[#2C2C2C]"}`}
            onClick={() => setActiveTab("archive")}
            type="button"
          >
            Arkiv
          </button>
        </div>
      </header>

      {activeTab === "votes" ? (
        <main className="px-5 pt-4">
          {!isLoaded ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  className="h-20 animate-pulse rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                  key={i}
                />
              ))}
            </div>
          ) : votes.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {pendingVotes.length > 0 && (
                <div className="mb-6">
                  <SectionHeader
                    title="Afventer resultat"
                    count={pendingVotes.length}
                  />
                  {pendingVotes.map((vote) => (
                    <VoteCard key={vote.id} vote={vote} />
                  ))}
                </div>
              )}

              {concludedDisplayVotes.length > 0 && (
                <div>
                  <SectionHeader
                    title="Afsluttet"
                    count={concludedDisplayVotes.length}
                  />
                  {concludedDisplayVotes.map((vote) => (
                    <VoteCard key={vote.id} vote={vote} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      ) : (
        <main className="px-5 pt-4">
          <Link
            className="flex items-center justify-center rounded-2xl border-2 border-dashed border-[#E5E7EB] py-12 text-sm font-bold text-[#6B7280]"
            href="/results/archive"
          >
            Gå til arkiv
          </Link>
        </main>
      )}
    </div>
  );
}
