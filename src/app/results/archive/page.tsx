"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { BarChart3, Search, Users, Vote } from "lucide-react";

import { parliamentaryVoteResults, proposals } from "@/lib/mock-data";
import { clampPercentage, formatPercentage } from "@/lib/utils";

type OutcomeFilter = "all" | "passed" | "rejected";

interface ArchiveItem {
  id: string;
  title: string;
  dateLabel: string;
  session: string;
  result: "passed" | "rejected";
  publicAlignment: number;
}

const archiveItems: ArchiveItem[] = proposals
  .filter(
    (proposal) =>
      proposal.status === "results_published" || proposal.status === "archived"
  )
  .map((proposal) => {
    const result = parliamentaryVoteResults.find(
      (entry) => entry.proposalId === proposal.id
    );
    const publicForPercentage =
      proposal.publicVoteCountFor + proposal.publicVoteCountAgainst > 0
        ? proposal.publicVoteCountFor /
          (proposal.publicVoteCountFor + proposal.publicVoteCountAgainst)
        : 0;

    const outcome = result?.result === "passed" ? "passed" : "rejected";
    const publicMajorityFor = publicForPercentage >= 0.5;
    const outcomeFor = outcome === "passed";

    return {
      id: proposal.id,
      title: proposal.officialTitle,
      dateLabel: new Intl.DateTimeFormat("da-DK", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }).format(new Date(proposal.actualVoteDate ?? proposal.updatedAt)),
      session: proposal.parliamentarySession,
      result: outcome,
      publicAlignment: publicMajorityFor === outcomeFor ? 82 : 41
    };
  });

const sessionLabels = Array.from(
  new Set(archiveItems.map((item) => item.session))
)
  .sort()
  .reverse();

export default function ArchivePage() {
  const [filter, setFilter] = useState<OutcomeFilter>("all");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(
    () =>
      archiveItems.filter((item) => {
        const matchesFilter = filter === "all" ? true : item.result === filter;
        const matchesQuery = item.title
          .toLowerCase()
          .includes(query.toLowerCase());

        return matchesFilter && matchesQuery;
      }),
    [filter, query]
  );

  const groupedItems = useMemo(
    () =>
      sessionLabels
        .map((session) => ({
          session,
          items: filteredItems.filter((item) => item.session === session)
        }))
        .filter((group) => group.items.length > 0),
    [filteredItems]
  );

  const renderBadge = (result: "passed" | "rejected") => (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${result === "passed" ? "bg-[#22A06B]/10 text-[#22A06B]" : "bg-[#E34935]/10 text-[#E34935]"}`}
    >
      {result === "passed" ? "Vedtaget" : "Forkastet"}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#FFFAF5] px-5 pb-28 pt-6 font-['Nunito']">
      <header className="sticky top-0 z-30 bg-[#FFFAF5] pb-3">
        <h1 className="mb-4 text-2xl font-bold text-[#2C2C2C]">Arkiv</h1>

        <div className="flex rounded-xl bg-[#F3F4F6] p-1">
          <Link
            className="flex-1 rounded-lg py-2.5 text-center text-sm font-bold text-[#6B7280] transition-colors hover:text-[#2C2C2C]"
            href="/results"
          >
            Dine stemmer
          </Link>
          <Link
            className="flex-1 rounded-lg bg-white py-2.5 text-center text-sm font-bold text-[#2C2C2C] shadow-sm"
            href="/results/archive"
          >
            Arkiv
          </Link>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {(
            [
              ["all", "Alle"],
              ["passed", "Vedtaget"],
              ["rejected", "Forkastet"]
            ] as const
          ).map(([value, label]) => (
            <button
              className={`whitespace-nowrap rounded-full border-2 px-4 py-1.5 text-xs font-bold transition-all ${filter === value ? "border-[#5B4FCF] bg-[#5B4FCF] text-white" : "border-[#E5E7EB] text-[#2C2C2C]"}`}
              key={value}
              onClick={() => setFilter(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative mt-3">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            className="w-full rounded-xl border-2 border-[#E5E7EB] bg-white py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:border-[#5B4FCF]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Søg i arkivet"
            value={query}
          />
        </div>
      </header>

      <main className="space-y-6">
        {groupedItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <p className="text-base font-bold text-[#2C2C2C]">
              Ingen resultater
            </p>
            <p className="mt-2 text-sm text-[#6B7280]">
              Prøv en anden søgning eller et andet filter.
            </p>
          </div>
        ) : (
          groupedItems.map((group) => (
            <section key={group.session}>
              <div className="mb-3 px-1">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#6B7280]">
                  {group.session}
                </h2>
                <div className="mt-1 h-px bg-[#E5E7EB]" />
              </div>

              <div className="space-y-3">
                {group.items.map((item) => (
                  <Link
                    className="block rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                    href={`/results/${item.id}`}
                    key={item.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="line-clamp-2 text-base font-bold text-[#2C2C2C]">
                        {item.title}
                      </h3>
                      {renderBadge(item.result)}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#6B7280]">
                      <span className="font-['Space_Grotesk']">
                        {item.dateLabel}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[#D1D5DB]" />
                      <span
                        className={`rounded-full px-2 py-0.5 font-bold ${item.publicAlignment >= 50 ? "bg-[#22A06B]/10 text-[#22A06B]" : "bg-[#E34935]/10 text-[#E34935]"}`}
                      >
                        Offentlig enighed{" "}
                        {formatPercentage(
                          clampPercentage(item.publicAlignment)
                        )}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
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
