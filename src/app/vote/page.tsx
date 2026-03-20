"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";

import { Lightbulb, Menu, Vote, Bell } from "lucide-react";

import type { Proposal } from "@/types";

import { proposals as mockProposals } from "@/lib/mock-data";

import ProposalCard from "@/components/proposal-card";
import { useVotes } from "@/hooks/use-votes";
type FeedTab = "current" | "closing";

const CLOSING_SOON_DAYS = 3;

const isClosingSoon = (proposal: Proposal): boolean => {
  const target = new Date(proposal.scheduledVoteDate).getTime();
  const now = Date.now();
  const diffDays = (target - now) / (1000 * 60 * 60 * 24);

  return diffDays >= 0 && diffDays <= CLOSING_SOON_DAYS;
};

export default function VoteFeedPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<FeedTab>("current");
  const { getVoteForProposal, isLoaded } = useVotes();

  const currentVotes = useMemo(
    () => mockProposals.filter((proposal) => proposal.status === "open_for_voting" && !isClosingSoon(proposal)),
    []
  );
  const closingSoonVotes = useMemo(
    () => mockProposals.filter((proposal) => proposal.status === "open_for_voting" && isClosingSoon(proposal)),
    []
  );

  const activeProposals = activeTab === "closing" ? closingSoonVotes : currentVotes;

  const renderEmptyState = (): React.ReactElement => (
    <div className="flex flex-col items-center justify-center px-6 pb-6 pt-10">
      <div className="relative mb-6 h-32 w-32">
        <div className="absolute inset-0 rounded-full bg-[#F3F4F6] opacity-50" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5B4FCF] opacity-20">
          <Vote className="h-20 w-20" />
        </div>
        <div className="absolute bottom-2 right-4 text-[#FF6B35]">
          <Bell className="h-10 w-10" />
        </div>
      </div>

      <h2 className="mb-2 text-center text-xl font-bold text-[#2C2C2C]">Alt er i orden!</h2>
      <p className="text-center text-sm text-[#6B7280]">
        Der er ingen aktive forslag lige nu. Kig tilbage senere eller se tidligere resultater.
      </p>
    </div>
  );

  const renderHowItWorksCard = (): React.ReactElement => (
    <div className="relative mx-5 mb-20 overflow-hidden rounded-2xl bg-gradient-to-br from-[#5B4FCF] to-[#3D329F] p-6 shadow-lg">
      <div className="absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white opacity-5 blur-2xl" />

      <div className="relative z-10 mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-[#FFD700]" />
        <h3 className="text-lg font-bold text-white">Sådan fungerer det</h3>
      </div>

      <div className="relative z-10 space-y-4">
        {[
          "Læs AI-resuméer af lovforslagene.",
          "Afgiv din forudsigelse anonymt.",
          "Sammenlign dit svar med Folketinget."
        ].map((text, index) => (
          <div key={text} className="flex gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
              {index + 1}
            </div>
            <p className="text-sm leading-relaxed text-white/90">{text}</p>
          </div>
        ))}
      </div>

      <button className="relative z-10 mt-6 w-full rounded-xl bg-white py-3 text-sm font-bold text-[#5B4FCF] transition-colors hover:bg-[#F3F4F6]">
        Læs mere
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFAF5] font-['Nunito'] pb-32">
      <header className="sticky top-0 z-30 bg-[#FFFAF5] px-5 pb-2 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B4FCF]">
              <Vote className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#2C2C2C]">direkte</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-2 transition-colors hover:bg-[#F3F4F6]">
              <Bell className="h-6 w-6 text-[#2C2C2C]" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-[#FFFAF5] bg-[#FF6B35]" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-[#F3F4F6]">
              <Menu className="h-6 w-6 text-[#2C2C2C]" />
            </button>
          </div>
        </div>

        <div className="mb-2 flex rounded-xl bg-[#E5E7EB] p-1">
          <button
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${activeTab === "current" ? "bg-white text-[#2C2C2C] shadow-sm" : "text-[#6B7280] hover:text-[#2C2C2C]"}`}
            onClick={() => setActiveTab("current")}
            type="button"
          >
            Aktuelle afstemninger
          </button>
          <button
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${activeTab === "closing" ? "bg-white text-[#2C2C2C] shadow-sm" : "text-[#6B7280] hover:text-[#2C2C2C]"}`}
            onClick={() => setActiveTab("closing")}
            type="button"
          >
            Lukker snart
          </button>
        </div>
      </header>

      <main className="px-5 pt-2">
        {!isLoaded ? (
          <div className="space-y-4">
            {mockProposals.slice(0, 2).map((proposal) => (
              <div className="h-44 animate-pulse rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]" key={proposal.id} />
            ))}
          </div>
        ) : activeProposals.length === 0 ? (
          <>
            {renderEmptyState()}
            {renderHowItWorksCard()}
          </>
        ) : (
          <div className="space-y-4">
            {activeProposals.map((proposal) => {
              const vote = getVoteForProposal(proposal.id);

              return (
                <ProposalCard
                  forPercentage={proposal.id === "proposal-climate-tax-2024" ? 58 : proposal.id === "proposal-health-digital-2024" ? 64 : 71}
                  id={proposal.id}
                  key={proposal.id}
                  scheduledVoteDate={proposal.scheduledVoteDate}
                  summary={proposal.aiSummary}
                  title={`${proposal.proposalNumber} · ${proposal.officialTitle}`}
                  voteChoice={vote?.voteChoice ?? null}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
