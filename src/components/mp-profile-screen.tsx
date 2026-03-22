"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { useMemo } from "react";

import {
  ArrowLeft,
  Check,
  CircleSlash2,
  Share2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Users
} from "lucide-react";

import { useVotes } from "@/hooks/use-votes";
import {
  constituencies,
  parliamentaryVoteResults,
  mps,
  mpVotes,
  proposals
} from "@/lib/mock-data";
import { formatFullName } from "@/lib/utils";

import type { MP, ParliamentaryVoteChoice, ParliamentaryResult } from "@/types";

export interface MpProfileScreenProps {
  mpId: string;
}

interface HistoryItem {
  proposalId: string;
  proposalTitle: string;
  voteDate: string;
  mpVote: ParliamentaryVoteChoice;
  publicResult: ParliamentaryResult;
  userVote: "for" | "against" | null;
}

interface StatsSummary {
  history: HistoryItem[];
  matchCount: number;
  totalComparableVotes: number;
  participationRate: number;
  partyLoyaltyRate: number;
}

const PARTY_COLORS: Record<string, string> = {
  Socialdemokratiet: "#A00000",
  "Socialistisk Folkeparti": "#AF1F2D",
  Venstre: "#00205B",
  "Dansk Folkeparti": "#BF0A30",
  "Radikale Venstre": "#7B2D8E",
  Alternativet: "#2E7D32"
};

const getPartyColor = (party: string): string =>
  PARTY_COLORS[party] ?? "#5B4FCF";

const getProposalTitle = (proposalId: string): string =>
  proposals.find((proposal) => proposal.id === proposalId)?.officialTitle ??
  proposalId;

const formatDate = (value: string): string =>
  new Intl.DateTimeFormat("da-DK", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));

const getVoteLabel = (vote: ParliamentaryVoteChoice): string => {
  switch (vote) {
    case "for":
      return "For";
    case "against":
      return "Imod";
    case "abstain":
      return "Undlod";
    case "absent":
      return "Fraværende";
  }

  return "Ukendt";
};

const getVoteTone = (vote: ParliamentaryVoteChoice): string => {
  switch (vote) {
    case "for":
      return "bg-[#22A06B]/10 text-[#22A06B]";
    case "against":
      return "bg-[#E34935]/10 text-[#E34935]";
    default:
      return "bg-[#6B7280]/10 text-[#6B7280]";
  }
};

const getVoteIcon = (vote: ParliamentaryVoteChoice): ReactElement => {
  switch (vote) {
    case "for":
      return <ThumbsUp className="h-4 w-4" />;
    case "against":
      return <ThumbsDown className="h-4 w-4" />;
    default:
      return <CircleSlash2 className="h-4 w-4" />;
  }
};

const getPublicResultLabel = (result: ParliamentaryResult): string => {
  switch (result) {
    case "passed":
      return "Vedtaget";
    case "rejected":
      return "Forkastet";
    case "tied":
      return "Uafgjort";
  }

  return "Ukendt";
};

const getPartyMajorityVote = (
  mpParty: string,
  proposalId: string
): ParliamentaryVoteChoice | null => {
  const partyVotes = mpVotes.filter((vote) => {
    if (vote.proposalId !== proposalId) {
      return false;
    }

    const voter = mps.find((mp) => mp.id === vote.mpId);
    return voter?.party === mpParty;
  });

  if (partyVotes.length === 0) {
    return null;
  }

  const counts = partyVotes.reduce<
    Partial<Record<ParliamentaryVoteChoice, number>>
  >((acc, vote) => {
    acc[vote.voteChoice] = (acc[vote.voteChoice] ?? 0) + 1;
    return acc;
  }, {});

  let majorityVote: ParliamentaryVoteChoice | null = null;
  let majorityCount = -1;

  (Object.entries(counts) as Array<[ParliamentaryVoteChoice, number]>).forEach(
    ([vote, count]) => {
      if (count > majorityCount) {
        majorityVote = vote;
        majorityCount = count;
      }
    }
  );

  return majorityVote;
};

export default function MpProfileScreen({ mpId }: MpProfileScreenProps) {
  const { votes, isLoaded, getVoteForProposal } = useVotes();

  const mp = useMemo<MP | null>(
    () => mps.find((entry) => entry.id === mpId) ?? null,
    [mpId]
  );

  const constituency = useMemo(
    () =>
      mp
        ? (constituencies.find((entry) => entry.id === mp.constituencyId) ??
          null)
        : null,
    [mp]
  );

  const stats = useMemo<StatsSummary | null>(() => {
    if (!mp) {
      return null;
    }

    const history = mpVotes
      .filter((vote) => vote.mpId === mp.id)
      .map((vote) => {
        const result = parliamentaryVoteResults.find(
          (entry) => entry.proposalId === vote.proposalId
        );

        return result
          ? {
              proposalId: vote.proposalId,
              proposalTitle: getProposalTitle(vote.proposalId),
              voteDate: result.importedAt,
              mpVote: vote.voteChoice,
              publicResult: result.result,
              userVote: getVoteForProposal(vote.proposalId)?.voteChoice ?? null
            }
          : null;
      })
      .filter((item): item is HistoryItem => item !== null)
      .sort(
        (left, right) =>
          new Date(right.voteDate).getTime() - new Date(left.voteDate).getTime()
      );

    const comparableVotes = history.filter((item) => item.userVote !== null);
    const matchCount = comparableVotes.filter(
      (item) => item.userVote === item.mpVote
    ).length;
    const totalComparableVotes = comparableVotes.length;
    const totalHistoricalVotes = history.length;

    const partyLoyaltyVotes = history.filter((item) => {
      const majorityVote = getPartyMajorityVote(mp.party, item.proposalId);
      return majorityVote !== null && majorityVote === item.mpVote;
    }).length;

    return {
      history,
      matchCount,
      totalComparableVotes,
      participationRate: totalHistoricalVotes > 0 ? 100 : 0,
      partyLoyaltyRate:
        totalHistoricalVotes > 0
          ? Math.round((partyLoyaltyVotes / totalHistoricalVotes) * 100)
          : 0
    };
  }, [getVoteForProposal, mp]);

  const renderHeader = () => (
    <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-[#FFFAF5]/95 px-5 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Link
          className="-ml-2 rounded-full p-2 transition-colors hover:bg-[#F3F4F6]"
          href="/mps"
        >
          <ArrowLeft className="h-6 w-6 text-[#2C2C2C]" />
        </Link>
        <h1 className="text-lg font-bold text-[#2C2C2C]">Profil</h1>
        <button
          className="-mr-2 rounded-full p-2 transition-colors hover:bg-[#F3F4F6]"
          type="button"
        >
          <Share2 className="h-6 w-6 text-[#2C2C2C]" />
        </button>
      </div>
    </header>
  );

  const renderComparisonBanner = () => {
    if (!mp || !stats || stats.totalComparableVotes === 0) {
      return null;
    }

    return (
      <div className="mx-5 mt-4 mb-2 flex items-center gap-3 rounded-xl border border-[#5B4FCF]/20 bg-[#5B4FCF]/10 p-4">
        <div className="flex-shrink-0 rounded-full bg-[#5B4FCF] p-2 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <p className="text-sm font-bold leading-tight text-[#2C2C2C]">
          Du stemte det samme som {formatFullName(mp.firstName, mp.lastName)} på{" "}
          {stats.matchCount} af {stats.totalComparableVotes} afstemninger.
        </p>
      </div>
    );
  };

  const renderProfileCard = () => {
    if (!mp) {
      return null;
    }

    const initials = `${mp.firstName.charAt(0)}${mp.lastName.charAt(0)}`;

    return (
      <div className="mx-5 mb-6 rounded-3xl bg-white p-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <div className="relative mx-auto mb-4 h-28 w-28">
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#FFFAF5] shadow-lg">
            {mp.photoUrl ? (
              <Image
                alt={formatFullName(mp.firstName, mp.lastName)}
                fill
                className="object-cover"
                sizes="112px"
                src={mp.photoUrl}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#F3F4F6]">
                <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#6B7280]">
                  {initials}
                </span>
              </div>
            )}
          </div>
          <div
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white"
            style={{ backgroundColor: getPartyColor(mp.party) }}
          >
            <span className="text-[10px] font-bold text-white">
              {mp.party.charAt(0)}
            </span>
          </div>
        </div>

        <h2 className="mb-1 text-2xl font-extrabold text-[#2C2C2C]">
          {formatFullName(mp.firstName, mp.lastName)}
        </h2>
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-[10px] text-[#6B7280]">
          <span
            className="rounded-full px-3 py-1 font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: getPartyColor(mp.party) }}
          >
            {mp.party}
          </span>
          <span>•</span>
          <span>{constituency?.name ?? mp.constituencyId}</span>
          <span>•</span>
          <span className="rounded-full bg-[#F3F4F6] px-3 py-1 font-bold uppercase tracking-wide text-[#2C2C2C]">
            {mp.isActive ? "Aktiv" : "Inaktiv"}
          </span>
        </div>

        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F3F4F6] py-3 text-sm font-bold text-[#2C2C2C] transition-colors hover:bg-[#E5E7EB]"
          type="button"
        >
          <Users className="h-4 w-4 text-[#5B4FCF]" />
          Vis parti og kontakt
        </button>
      </div>
    );
  };

  const renderStat = (
    value: number,
    color: string,
    label: string,
    note: string
  ) => (
    <div className="flex flex-col items-center rounded-2xl bg-white p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="relative mb-2 h-20 w-20">
        <div
          className="h-full w-full rounded-full"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${color} ${value}%, #F3F4F6 ${value}%, #F3F4F6 100%)`
          }}
        />
        <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white">
          <span className="text-xl font-bold text-[#2C2C2C]">{value}%</span>
        </div>
      </div>
      <span className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
        {label}
      </span>
      <span className="mt-1 text-[11px] text-[#6B7280]">{note}</span>
    </div>
  );

  const renderStats = () => {
    if (!stats) {
      return null;
    }

    return (
      <div className="mx-5 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {renderStat(
          stats.totalComparableVotes > 0
            ? Math.round((stats.matchCount / stats.totalComparableVotes) * 100)
            : 0,
          "#22A06B",
          "Enighed med dig",
          `${stats.matchCount} af ${stats.totalComparableVotes} stemmer`
        )}
        {renderStat(
          stats.participationRate,
          "#5B4FCF",
          "Deltagelse",
          `${stats.history.length} afstemninger med resultat`
        )}
        {renderStat(
          stats.partyLoyaltyRate,
          "#FF6B35",
          "Partilinje",
          `Baseret på partiets flertal`
        )}
      </div>
    );
  };

  const renderVoteHistoryItem = (entry: HistoryItem, isAlt: boolean) => {
    const userMatched =
      entry.userVote !== null && entry.userVote === entry.mpVote;

    return (
      <Link
        className={`block rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform active:scale-[0.99] ${isAlt ? "bg-[#FFFAF5]" : "bg-white"}`}
        href={`/results/${entry.proposalId}`}
        key={entry.proposalId}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h4 className="mb-1 text-sm font-bold leading-snug text-[#2C2C2C]">
              {entry.proposalTitle}
            </h4>
            <p className="text-[10px] text-[#6B7280]">
              {formatDate(entry.voteDate)}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${getVoteTone(entry.mpVote)}`}
            >
              {getVoteIcon(entry.mpVote)}
              {getVoteLabel(entry.mpVote)}
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-[#F3F4F6] px-2 py-1 text-[10px] font-bold text-[#2C2C2C]">
              <TrendingUp className="h-3 w-3" />
              {getPublicResultLabel(entry.publicResult)}
            </div>
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${userMatched ? "bg-[#22A06B]/10 text-[#22A06B]" : "bg-[#E34935]/10 text-[#E34935]"}`}
            >
              <Check className="h-3 w-3" />
              {entry.userVote
                ? userMatched
                  ? "Matchede din stemme"
                  : "Matchede ikke din stemme"
                : "Ingen brugerstemme"}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const renderVotingHistory = () => {
    if (!stats) {
      return null;
    }

    return (
      <div className="px-5 pb-10">
        <h3 className="mb-4 text-lg font-bold text-[#2C2C2C]">
          Afstemningshistorik
        </h3>
        <div className="space-y-3">
          {stats.history.length === 0 ? (
            <div className="rounded-2xl bg-white p-5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <p className="text-base font-bold text-[#2C2C2C]">
                Ingen historiske afstemninger endnu
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">
                Der er endnu ikke offentliggjort resultater for denne
                MF&apos;er.
              </p>
            </div>
          ) : (
            stats.history.map((entry, index) =>
              renderVoteHistoryItem(entry, index % 2 === 1)
            )
          )}
        </div>
      </div>
    );
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#FFFAF5] font-['Nunito']">
        {renderHeader()}
        <main className="px-5 py-8 text-sm text-[#6B7280]">
          Indlæser profil...
        </main>
      </div>
    );
  }

  if (!mp) {
    return (
      <div className="min-h-screen bg-[#FFFAF5] font-['Nunito']">
        {renderHeader()}
        <main className="px-5 py-8">
          <div className="rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <p className="text-base font-bold text-[#2C2C2C]">
              MF&apos;er blev ikke fundet
            </p>
            <p className="mt-2 text-sm text-[#6B7280]">
              Prøv at gå tilbage til listen og vælg en anden profil.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF5] font-['Nunito']">
      {renderHeader()}
      <main className="pt-2">
        {renderComparisonBanner()}
        {renderProfileCard()}
        {renderStats()}
        {renderVotingHistory()}
      </main>
    </div>
  );
}
