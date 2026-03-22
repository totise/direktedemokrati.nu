"use client";

import { useMemo, useState } from "react";
import type { ReactElement } from "react";

import Image from "next/image";
import {
  Bookmark,
  ChevronDown,
  Clock,
  ExternalLink,
  MapPin,
  Quote,
  Share2,
  Shield,
  Sparkles,
  ThumbsDown,
  ThumbsUp
} from "lucide-react";

import type { MediaCitation } from "@/types";

import { mediaCitations, mps } from "@/lib/mock-data";
import { formatCountdown, formatFullName } from "@/lib/utils";

import { useConstituency } from "@/hooks/use-constituency";
import { useProposals } from "@/hooks/use-proposals";
import { useVotes } from "@/hooks/use-votes";

import MediaCitationSheet from "@/components/media-citation-sheet";
import PostcodeModal from "@/components/postcode-modal";
import ShareModal from "@/components/share-modal";

export interface ProposalDetailScreenProps {
  proposalId: string;
}

export default function ProposalDetailScreen({
  proposalId
}: ProposalDetailScreenProps): ReactElement {
  const { getProposalById } = useProposals();
  const proposal = getProposalById(proposalId);
  const {
    constituency,
    postcode,
    saveConstituencyByPostcode,
    clearConstituency
  } = useConstituency();
  const { getVoteForProposal, castVote } = useVotes();

  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [showPostcodeModal, setShowPostcodeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCitation, setSelectedCitation] =
    useState<MediaCitation | null>(null);

  const vote = proposal ? getVoteForProposal(proposal.id) : null;
  const isVoted = Boolean(vote);

  const linkedCitations = useMemo(() => {
    if (!proposal) {
      return [];
    }

    return mediaCitations.filter(
      (citation) => citation.proposalId === proposal.id
    );
  }, [proposal]);

  const localMps = useMemo(() => {
    if (!constituency) {
      return [];
    }

    return mps.filter((mp) => mp.constituencyId === constituency.id);
  }, [constituency]);

  if (!proposal) {
    return (
      <div className="min-h-screen bg-[#FFFAF5] p-6 text-[#2C2C2C]">
        <p className="text-lg font-bold">Forslaget blev ikke fundet.</p>
      </div>
    );
  }

  const publicFor = proposal.publicVoteCountFor;
  const publicAgainst = proposal.publicVoteCountAgainst;

  const renderProposalHeader = (): ReactElement => (
    <div className="px-5 pb-2 pt-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-[#5B4FCF]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#5B4FCF]">
          {proposal.status === "open_for_voting"
            ? "Åben for afstemning"
            : "Afsluttet"}
        </span>
        <div className="flex items-center gap-1 text-[#FF6B35]">
          <Clock className="h-3 w-3" />
          <span className="font-['Space_Grotesk'] text-xs font-bold">
            {formatCountdown(proposal.scheduledVoteDate)}
          </span>
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-extrabold leading-tight text-[#2C2C2C]">
        {proposal.officialTitle}
      </h1>
      <p className="text-sm text-[#6B7280]">
        Folketinget · {proposal.parliamentarySession}
      </p>
    </div>
  );

  const renderAISummary = (): ReactElement => (
    <div className="mx-5 my-6 rounded-2xl bg-[#FFFFFF] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="mb-3 flex items-center gap-2">
        <div className="rounded-lg bg-[#5B4FCF]/10 p-1.5">
          <Sparkles className="h-4 w-4 text-[#5B4FCF]" />
        </div>
        <h2 className="text-lg font-bold text-[#2C2C2C]">AI-resumé</h2>
        <span className="ml-auto rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-semibold text-[#6B7280]">
          PLAIN LANGUAGE
        </span>
      </div>

      <div className="space-y-3 leading-relaxed text-[#2C2C2C]">
        <p>{proposal.aiSummary}</p>
        {summaryExpanded && (
          <p className="border-t border-[#F3F4F6] pt-2">
            Forslaget er kurateret til mobilvisning, så du hurtigt kan forstå
            den praktiske betydning af lovteksten og tage stilling uden at læse
            den fulde juridiske tekst.
          </p>
        )}
      </div>

      <button
        className="mt-4 flex items-center gap-1 text-sm font-bold text-[#5B4FCF]"
        onClick={() => setSummaryExpanded((value) => !value)}
        type="button"
      >
        {summaryExpanded ? "Skjul" : "Læs mere"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${summaryExpanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );

  const renderMediaCitations = (): ReactElement => (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="text-lg font-bold text-[#2C2C2C]">Medieperspektiver</h2>
        <span className="text-xs font-semibold text-[#6B7280]">
          {linkedCitations.length} kilder
        </span>
      </div>

      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4">
        {linkedCitations.map((citation) => {
          const stanceClass =
            citation.stance === "for"
              ? "border-[#22A06B] text-[#22A06B] bg-[#22A06B]/10"
              : citation.stance === "against"
                ? "border-[#E34935] text-[#E34935] bg-[#E34935]/10"
                : "border-[#E5E7EB] text-[#6B7280] bg-[#F3F4F6]";

          return (
            <button
              className="min-w-[280px] rounded-2xl bg-[#FFFFFF] p-5 text-left shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              key={citation.id}
              onClick={() => setSelectedCitation(citation)}
              type="button"
            >
              <div className="mb-2 flex items-start justify-between">
                <span className="text-xs font-bold text-[#6B7280]">
                  {citation.sourceName}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${stanceClass}`}
                >
                  {citation.stance === "for"
                    ? "Støttende"
                    : citation.stance === "against"
                      ? "Kritisk"
                      : "Neutral"}
                </span>
              </div>
              <p className="relative mb-3 pl-7 text-sm italic text-[#2C2C2C]">
                <Quote className="absolute -left-1 -top-2 h-6 w-6 opacity-20" />
                {citation.quoteText}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5B4FCF]">
                Læs artikel <ExternalLink className="h-3 w-3" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderConstituency = (): ReactElement => (
    <div className="mx-5 mb-6 overflow-hidden rounded-2xl bg-[#FFFFFF] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#FF6B35]" />
          <h2 className="text-lg font-bold text-[#2C2C2C]">
            Hvem repræsenterer mig?
          </h2>
        </div>

        {!constituency ? (
          <>
            <p className="mb-4 text-sm text-[#6B7280]">
              Indtast dit postnummer for at se dine lokale MF&apos;er.
            </p>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F3F4F6] py-3 font-bold text-[#2C2C2C] transition-colors hover:bg-[#E5E7EB]"
              onClick={() => setShowPostcodeModal(true)}
              type="button"
            >
              Find mit postnummer <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2C2C2C]">
                  <span className="font-bold">{constituency.name}</span>
                </p>
                <p className="text-xs text-[#6B7280]">Postnummer {postcode}</p>
              </div>
              <button
                className="text-xs font-bold text-[#5B4FCF]"
                onClick={clearConstituency}
                type="button"
              >
                Ryd
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {localMps.map((mp) => (
                <div
                  className="flex min-w-[80px] flex-col items-center"
                  key={mp.id}
                >
                  <Image
                    alt={formatFullName(mp.firstName, mp.lastName)}
                    className="mb-2 h-16 w-16 rounded-full object-cover shadow-md"
                    height={64}
                    src={mp.photoUrl}
                    width={64}
                  />
                  <span className="text-center text-xs font-bold leading-tight text-[#2C2C2C]">
                    {formatFullName(mp.firstName, mp.lastName)}
                  </span>
                  <span className="text-center text-[10px] text-[#6B7280]">
                    {mp.party}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderFooterData = (): ReactElement => (
    <div className="px-5 pb-52 text-center">
      <p className="text-[10px] text-[#9CA3AF]">
        Data fra oda.ft.dk · Resuméer AI-genereret
      </p>
    </div>
  );

  const renderVotingControls = (): ReactElement => (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-50 rounded-t-3xl border-t border-[#F3F4F6] bg-[#FFFFFF]/95 p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-md">
      <div className="mx-auto max-w-md">
        <p className="mb-4 text-center font-bold text-[#2C2C2C]">
          Hvad ville du stemme?
        </p>
        <div className="mb-3 grid grid-cols-2 gap-4">
          <button
            className="rounded-2xl bg-[#22A06B] p-4 font-bold text-white shadow-lg shadow-[#22A06B]/20 transition-all duration-200 active:scale-95"
            onClick={() =>
              castVote({ proposalId: proposal.id, voteChoice: "for" })
            }
            type="button"
          >
            <div className="flex flex-col items-center gap-2">
              <ThumbsUp className="h-8 w-8" />
              <span className="text-lg">For</span>
            </div>
          </button>

          <button
            className="rounded-2xl bg-[#E34935] p-4 font-bold text-white shadow-lg shadow-[#E34935]/20 transition-all duration-200 active:scale-95"
            onClick={() =>
              castVote({ proposalId: proposal.id, voteChoice: "against" })
            }
            type="button"
          >
            <div className="flex flex-col items-center gap-2">
              <ThumbsDown className="h-8 w-8" />
              <span className="text-lg">Imod</span>
            </div>
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 text-[11px] text-[#9CA3AF]">
          <Shield className="h-3 w-3" />
          <span>Anonym stemme · Ingen login kræves</span>
        </div>
      </div>
    </div>
  );

  const renderPostVote = (): ReactElement => (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-50 rounded-t-3xl border-t border-[#F3F4F6] bg-[#FFFFFF] p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Du stemte
            </p>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#22A06B]" />
              <span className="text-lg font-bold text-[#2C2C2C]">
                {vote?.voteChoice === "for" ? "For" : "Imod"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">
              Aktuel status
            </p>
            <div className="font-['Space_Grotesk'] font-bold text-[#2C2C2C]">
              {publicFor}% <span className="text-[#22A06B]">For</span> •{" "}
              {publicAgainst}% <span className="text-[#E34935]">Imod</span>
            </div>
          </div>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-3">
          <button
            className="flex items-center justify-center gap-2 rounded-xl bg-[#F3F4F6] py-3 text-sm font-bold text-[#2C2C2C] transition-colors hover:bg-[#E5E7EB]"
            type="button"
          >
            <Bookmark className="h-4 w-4" />
            Gem afstemning
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-xl bg-[#5B4FCF] py-3 text-sm font-bold text-white transition-colors hover:bg-[#3D329F]"
            onClick={() => setShowShareModal(true)}
            type="button"
          >
            <Share2 className="h-4 w-4" />
            Del
          </button>
        </div>

        <button
          className="w-full rounded-xl border border-[#E5E7EB] py-3 text-sm font-bold text-[#6B7280] transition-colors hover:bg-[#F9FAFB]"
          type="button"
        >
          Send kvittering på e-mail
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#FFFAF5] font-['Nunito'] pb-[calc(16rem+env(safe-area-inset-bottom))]">
      <main className="pt-2">
        {renderProposalHeader()}
        {renderAISummary()}
        {renderMediaCitations()}
        {renderConstituency()}
        {renderFooterData()}
      </main>

      {isVoted ? renderPostVote() : renderVotingControls()}
      {showPostcodeModal && (
        <PostcodeModal
          defaultValue={postcode}
          onClose={() => setShowPostcodeModal(false)}
          onSubmit={(value) => {
            saveConstituencyByPostcode(value);
            setShowPostcodeModal(false);
          }}
        />
      )}
      {selectedCitation && (
        <MediaCitationSheet
          citation={selectedCitation}
          onClose={() => setSelectedCitation(null)}
        />
      )}
      {showShareModal && (
        <ShareModal
          onClose={() => setShowShareModal(false)}
          shareUrl={`https://direktedemokrati.nu/proposal/${proposal.id}`}
        />
      )}
    </div>
  );
}
