"use client";

import Link from "next/link";
import { useMemo } from "react";

import {
  BarChart3,
  RotateCw,
  ThumbsDown,
  ThumbsUp,
  Users,
  Vote
} from "lucide-react";

import { parliamentaryVoteResults, proposals } from "@/lib/mock-data";
import { useVotes } from "@/hooks/use-votes";
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh";

export default function ResultsIndexPage() {
  const { votes } = useVotes();

  const { isRefreshing, pullDistance } = usePullToRefresh({
    onRefresh: () => window.location.reload()
  });

  const voteRows = useMemo(() => {
    return votes
      .map((vote) => {
        const proposal = proposals.find(
          (entry) => entry.id === vote.proposalId
        );
        const result =
          parliamentaryVoteResults.find(
            (entry) => entry.proposalId === vote.proposalId
          ) ?? null;

        if (!proposal) {
          return null;
        }

        return { proposal, vote, result };
      })
      .filter(Boolean)
      .sort((left, right) => {
        const a = new Date(
          right!.proposal.actualVoteDate ?? right!.proposal.scheduledVoteDate
        ).getTime();
        const b = new Date(
          left!.proposal.actualVoteDate ?? left!.proposal.scheduledVoteDate
        ).getTime();
        return a - b;
      }) as Array<{
      proposal: (typeof proposals)[number];
      vote: (typeof votes)[number];
      result: (typeof parliamentaryVoteResults)[number] | null;
    }>;
  }, [votes]);

  const awaiting = voteRows.filter((row) => !row.result);
  const concluded = voteRows.filter((row) => row.result);

  const renderVoteCard = (row: (typeof voteRows)[number]) => {
    const isFor = row.vote.voteChoice === "for";
    const userWon = row.result
      ? (isFor && row.result.result === "passed") ||
        (!isFor && row.result.result === "rejected")
      : false;

    return (
      <Link
        className="mb-3 block rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
        href={
          row.result
            ? `/results/${row.proposal.id}`
            : `/proposal/${row.proposal.id}`
        }
        key={row.proposal.id}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 flex-col items-center justify-center rounded-xl ${isFor ? "bg-[#22A06B]/10" : "bg-[#E34935]/10"}`}
          >
            {isFor ? (
              <ThumbsUp className="h-5 w-5 text-[#22A06B]" />
            ) : (
              <ThumbsDown className="h-5 w-5 text-[#E34935]" />
            )}
            <span className="mt-1 text-[9px] font-bold uppercase text-[#6B7280]">
              {isFor ? "For" : "Imod"}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-[#2C2C2C]">
              {row.proposal.officialTitle}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#6B7280]">
              <span className="font-['Space_Grotesk']">
                {new Intl.DateTimeFormat("da-DK", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }).format(
                  new Date(
                    row.proposal.actualVoteDate ??
                      row.proposal.scheduledVoteDate
                  )
                )}
              </span>
              {row.result ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-[#D1D5DB]" />
                  <span
                    className={`font-bold ${row.result.result === "passed" ? "text-[#22A06B]" : "text-[#E34935]"}`}
                  >
                    {row.result.result === "passed" ? "Vedtaget" : "Forkastet"}
                  </span>
                </>
              ) : (
                <>
                  <span className="h-1 w-1 rounded-full bg-[#D1D5DB]" />
                  <span className="rounded-full bg-[#F59E0B]/10 px-2 py-0.5 font-bold text-[#F59E0B]">
                    Afventer
                  </span>
                </>
              )}
            </div>
          </div>

          {row.result ? (
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${userWon ? "bg-[#22A06B]" : "bg-[#E34935]"}`}
            >
              {userWon ? "Du vandt" : "Du tabte"}
            </span>
          ) : (
            <span className="rounded-full bg-[#F59E0B]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#F59E0B]">
              Afventer
            </span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5] px-5 pb-28 pt-6 pt-safe font-['Nunito']">
      <header className="sticky top-0 z-30 mb-4 bg-[#FFFAF5] pb-2">
        <h1 className="mb-4 text-2xl font-bold text-[#2C2C2C]">Historik</h1>

        {pullDistance > 0 || isRefreshing ? (
          <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#5B4FCF] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <RotateCw
              className={`h-5 w-5 ${isRefreshing ? "animate-spin" : "animate-pulse"}`}
            />
            Opdaterer...
          </div>
        ) : null}

        <div className="flex rounded-xl bg-[#F3F4F6] p-1">
          <Link
            className="flex-1 rounded-lg bg-white py-2.5 text-center text-sm font-bold text-[#2C2C2C] shadow-sm"
            href="/results"
          >
            Dine stemmer
          </Link>
          <Link
            className="flex-1 rounded-lg py-2.5 text-center text-sm font-bold text-[#6B7280] transition-colors hover:text-[#2C2C2C]"
            href="/results/archive"
          >
            Arkiv
          </Link>
        </div>
      </header>

      <main>
        {voteRows.length === 0 ? (
          <div className="rounded-2xl bg-white p-5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <p className="text-base font-bold text-[#2C2C2C]">
              Ingen stemmer endnu
            </p>
            <p className="mt-2 text-sm text-[#6B7280]">
              Gå til Vote-feedet og stem på en aktiv sag.
            </p>
          </div>
        ) : (
          <>
            <section>
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-lg font-bold text-[#2C2C2C]">
                  Afventer resultat
                </h2>
                <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-xs font-bold text-[#6B7280]">
                  {awaiting.length}
                </span>
              </div>
              {awaiting.map(renderVoteCard)}
            </section>

            <section className="mt-6">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-lg font-bold text-[#2C2C2C]">Afsluttede</h2>
                <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-xs font-bold text-[#6B7280]">
                  {concluded.length}
                </span>
              </div>
              {concluded.map(renderVoteCard)}
            </section>
          </>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#F3F4F6] bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-around py-3 pb-6">
          <Link
            className="flex flex-col items-center gap-1 text-[#6B7280] transition-colors hover:text-[#2C2C2C]"
            href="/vote"
          >
            <Vote className="h-6 w-6" />
            <span className="text-[10px] font-bold">Vote</span>
          </Link>
          <Link
            className="flex flex-col items-center gap-1 text-[#5B4FCF]"
            href="/results"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-[10px] font-bold">Results</span>
          </Link>
          <Link
            className="flex flex-col items-center gap-1 text-[#6B7280] transition-colors hover:text-[#2C2C2C]"
            href="/mps"
          >
            <Users className="h-6 w-6" />
            <span className="text-[10px] font-bold">MPs</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
