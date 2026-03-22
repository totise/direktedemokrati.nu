"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { useMemo, useState } from "react";

import { ArrowLeft, Search, Share2 } from "lucide-react";

import type {
  MP,
  MPVote,
  ParliamentaryVoteResult,
  Proposal,
  UserVote
} from "@/types";

import MpAvatar from "@/components/mp-avatar";
import PartyChip from "@/components/party-chip";
import { useConstituency } from "@/hooks/use-constituency";
import { useVotes } from "@/hooks/use-votes";
import {
  mps as mockMps,
  mpVotes as mockMpVotes,
  parliamentaryVoteResults as mockResults,
  proposals as mockProposals
} from "@/lib/mock-data";
import { formatPercentage } from "@/lib/utils";

export interface ResultsViewScreenProps {
  proposalId: string;
}

interface PartyOption {
  label: string;
  color: string;
}

const PARTY_COLORS: Record<string, string> = {
  Venstre: "#00205B",
  Socialdemokratiet: "#A00000",
  "Socialistisk Folkeparti": "#AF1F2D",
  "Dansk Folkeparti": "#BF0A30",
  "Radikale Venstre": "#7B2D8E",
  Alternativet: "#2E7D32"
};

const getPartyColor = (party: string): string =>
  PARTY_COLORS[party] ?? "#5B4FCF";

const getProposal = (proposalId: string): Proposal | null =>
  mockProposals.find((proposal) => proposal.id === proposalId) ?? null;

const getResult = (proposalId: string): ParliamentaryVoteResult | null =>
  mockResults.find((result) => result.proposalId === proposalId) ?? null;

const getVoteBucket = (
  voteChoice: MPVote["voteChoice"]
): "for" | "abstain" | "against" => {
  if (voteChoice === "for") return "for";
  if (voteChoice === "abstain") return "abstain";
  return "against";
};

const getProposalMpVotes = (proposalId: string): MPVote[] =>
  mockMpVotes.filter((vote) => vote.proposalId === proposalId);

const getAgreementState = (
  userVote: UserVote | null,
  parliamentaryResult: ParliamentaryVoteResult | null
): "match" | "mismatch" | null => {
  if (!userVote || !parliamentaryResult) return null;

  const userFor = userVote.voteChoice === "for";
  const passed = parliamentaryResult.result === "passed";

  return userFor === passed ? "match" : "mismatch";
};

export default function ResultsViewScreen({
  proposalId
}: ResultsViewScreenProps): ReactElement {
  const router = useRouter();
  const { constituency } = useConstituency();
  const { getVoteForProposal } = useVotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  const proposal = getProposal(proposalId);
  const parliamentaryResult = getResult(proposalId);
  const userVote = proposal ? getVoteForProposal(proposal.id) : null;

  const mpVotes = useMemo(() => getProposalMpVotes(proposalId), [proposalId]);

  const mpVoteRows = useMemo(
    () =>
      mpVotes
        .map((vote) => {
          const mp = mockMps.find((entry) => entry.id === vote.mpId);

          if (!mp) {
            return null;
          }

          return { vote, mp };
        })
        .filter((entry): entry is { vote: MPVote; mp: MP } => Boolean(entry))
        .filter(({ mp }) => {
          const searchMatch = `${mp.firstName} ${mp.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          const partyMatch = selectedParty ? mp.party === selectedParty : true;

          return searchMatch && partyMatch;
        }) as Array<{ vote: MPVote; mp: MP }>,
    [mpVotes, searchQuery, selectedParty]
  );

  const parties = useMemo(() => {
    const entries = new Map<string, PartyOption>();

    mpVotes.forEach((entry) => {
      const mp = mockMps.find((candidate) => candidate.id === entry.mpId);

      if (mp && !entries.has(mp.party)) {
        entries.set(mp.party, {
          label: mp.party,
          color: getPartyColor(mp.party)
        });
      }
    });

    return Array.from(entries.values());
  }, [mpVotes]);

  const groupedVotes = useMemo(() => {
    const groups = {
      for: [] as Array<{ vote: MPVote; mp: MP }>,
      abstain: [] as Array<{ vote: MPVote; mp: MP }>,
      against: [] as Array<{ vote: MPVote; mp: MP }>
    };

    mpVoteRows.forEach((entry) => {
      groups[getVoteBucket(entry.vote.voteChoice)].push(entry);
    });

    return groups;
  }, [mpVoteRows]);

  const userAgreementState = getAgreementState(userVote, parliamentaryResult);
  const totalPublicVotes =
    (proposal?.publicVoteCountFor ?? 0) +
    (proposal?.publicVoteCountAgainst ?? 0);
  const totalParliamentVotes =
    (parliamentaryResult?.totalFor ?? 0) +
    (parliamentaryResult?.totalAgainst ?? 0) +
    (parliamentaryResult?.totalAbstain ?? 0) +
    (parliamentaryResult?.totalAbsent ?? 0);

  const publicForPercentage =
    totalPublicVotes > 0
      ? (proposal!.publicVoteCountFor / totalPublicVotes) * 100
      : 0;
  const parliamentaryForPercentage =
    parliamentaryResult && totalParliamentVotes > 0
      ? (parliamentaryResult.totalFor / totalParliamentVotes) * 100
      : 0;

  if (!proposal) {
    return (
      <div className="min-h-screen bg-[#FFFAF5] p-6 text-[#2C2C2C]">
        <p className="text-lg font-bold">Forslaget blev ikke fundet.</p>
        <Link className="mt-4 inline-block text-[#5B4FCF]" href="/results">
          Tilbage til resultater
        </Link>
      </div>
    );
  }

  const renderComparisonHeader = (): ReactElement => (
    <div className="mb-4 rounded-2xl bg-white px-5 py-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <button
          className="rounded-full p-2 -ml-2 hover:bg-[#F3F4F6]"
          onClick={() => router.push("/results")}
          type="button"
        >
          <ArrowLeft className="h-6 w-6 text-[#2C2C2C]" />
        </button>
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
            Resultat sammenligning
          </div>
        </div>
        <button
          className="rounded-full p-2 -mr-2 hover:bg-[#F3F4F6]"
          type="button"
        >
          <Share2 className="h-6 w-6 text-[#2C2C2C]" />
        </button>
      </div>

      <h1 className="mb-2 text-2xl font-extrabold leading-tight text-[#2C2C2C]">
        {proposal.officialTitle}
      </h1>
      <p className="mb-4 text-sm text-[#6B7280]">
        {proposal.proposalNumber} · {proposal.parliamentarySession}
      </p>

      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-[#5B4FCF] bg-[#5B4FCF]/5">
            <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#5B4FCF]">
              {formatPercentage(publicForPercentage)}
            </span>
            <span className="text-[9px] font-bold uppercase text-[#5B4FCF]">
              For
            </span>
            <span className="text-[9px] text-[#6B7280]">Offentlig</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <span
            className={`text-lg font-bold ${parliamentaryResult?.result === "passed" ? "text-[#22A06B]" : "text-[#E34935]"}`}
          >
            {parliamentaryResult?.result === "passed"
              ? "VEDTAGET"
              : parliamentaryResult?.result === "rejected"
                ? "FORKASTET"
                : "AFVENTER"}
          </span>
          <span className="text-[10px] text-[#6B7280]">Folketinget</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-[#22A06B] bg-[#22A06B]/5">
            <span className="font-['Space_Grotesk'] text-2xl font-bold text-[#22A06B]">
              {formatPercentage(parliamentaryForPercentage)}
            </span>
            <span className="text-[9px] font-bold uppercase text-[#22A06B]">
              For
            </span>
            <span className="text-[9px] text-[#6B7280]">Parlament</span>
          </div>
        </div>
      </div>

      {parliamentaryResult && (
        <p className="mt-4 text-center text-xs text-[#6B7280]">
          <span className="font-bold text-[#2C2C2C]">
            {parliamentaryResult.totalFor}
          </span>{" "}
          for ·{" "}
          <span className="font-bold text-[#2C2C2C]">
            {parliamentaryResult.totalAgainst}
          </span>{" "}
          imod ·{" "}
          <span className="font-bold text-[#2C2C2C]">
            {parliamentaryResult.totalAbstain}
          </span>{" "}
          hverken
        </p>
      )}
    </div>
  );

  const renderAgreementBanner = (): ReactElement | null => {
    if (!userAgreementState || !parliamentaryResult) {
      return null;
    }

    return (
      <div
        className={`mb-4 rounded-2xl px-4 py-3 text-sm font-bold ${userAgreementState === "match" ? "bg-[#22A06B]/10 text-[#22A06B]" : "bg-[#E34935]/10 text-[#E34935]"}`}
      >
        {userAgreementState === "match"
          ? "Du stemte det samme som Folketinget"
          : "Du stemte anderledes end Folketinget"}
      </div>
    );
  };

  const renderSearchBar = (): ReactElement => (
    <div className="relative mb-4">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
      <input
        className="w-full rounded-xl border-2 border-[#E5E7EB] bg-white py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:border-[#5B4FCF]"
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Søg MF"
        value={searchQuery}
      />
    </div>
  );

  const renderPartyChips = (): ReactElement => (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <PartyChip
        color="#5B4FCF"
        label="Alle partier"
        onClick={() => setSelectedParty(null)}
        selected={selectedParty === null}
      />
      {parties.map((party) => (
        <PartyChip
          color={party.color}
          key={party.label}
          label={party.label}
          onClick={() =>
            setSelectedParty((current) =>
              current === party.label ? null : party.label
            )
          }
          selected={selectedParty === party.label}
        />
      ))}
    </div>
  );

  const renderPlaceholder = (): ReactElement => (
    <div className="rounded-2xl bg-white p-5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <p className="text-base font-bold text-[#2C2C2C]">
        Resultater ikke tilgængeligt endnu
      </p>
      <p className="mt-2 text-sm text-[#6B7280]">
        Der er ingen individuelle MF-stemmer for dette forslag endnu.
      </p>
    </div>
  );

  const renderGrid = (): ReactElement => {
    if (mpVotes.length === 0) {
      return renderPlaceholder();
    }

    const columns = [
      { key: "for", label: "For", color: "#22A06B", votes: groupedVotes.for },
      {
        key: "abstain",
        label: "Hverken",
        color: "#F59E0B",
        votes: groupedVotes.abstain
      },
      {
        key: "against",
        label: "Imod",
        color: "#E34935",
        votes: groupedVotes.against
      }
    ] as const;

    const currentUserVote = userVote;

    return (
      <div className="grid grid-cols-3 gap-2">
        {columns.map((column) => (
          <div className="flex flex-col gap-2" key={column.key}>
            <div
              className="rounded-lg p-2 text-center"
              style={{ backgroundColor: `${column.color}1A` }}
            >
              <span
                className="text-xs font-bold"
                style={{ color: column.color }}
              >
                {column.label} ({column.votes.length})
              </span>
            </div>
            {column.votes.map(({ mp, vote }) => {
              const isDimmed = selectedParty
                ? mp.party !== selectedParty
                : false;
              const localBadge = constituency?.id === mp.constituencyId;
              const matchState = currentUserVote
                ? currentUserVote.voteChoice === vote.voteChoice
                  ? "match"
                  : "mismatch"
                : null;

              return (
                <MpAvatar
                  isDimmed={isDimmed}
                  key={mp.id}
                  matchState={matchState}
                  mp={mp}
                  onClick={() => router.push(`/mps/${mp.id}`)}
                  partyColor={getPartyColor(mp.party)}
                  showLocalBadge={localBadge}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5] px-5 pb-28 pt-4 font-['Nunito']">
      {renderComparisonHeader()}
      {renderAgreementBanner()}
      {renderSearchBar()}
      {renderPartyChips()}

      <h2 className="mb-3 text-sm font-bold text-[#2C2C2C]">
        Individuelle stemmer
      </h2>
      {renderGrid()}
    </div>
  );
}
