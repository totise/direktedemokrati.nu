import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  state: string;
}

/**
 * States:
 * - default: Displays the list of proposal cards under the "Current Votes" tab with several active proposals.
 * - closingSoon: The "Closing Soon" tab is active, filtering proposals by nearest upcoming vote dates.
 * - emptyState: No current votes available, showing a friendly empty state and "How It Works" card.
 */
const VoteFeedScreen: React.FC<ScreenProps> = ({ state }) => {
  const renderHeader = () => (
    <header className="bg-[#FFFAF5] px-5 pt-6 pb-2 sticky top-0 z-30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5B4FCF] rounded-lg flex items-center justify-center">
            <Icons.Vote className="w-5 h-5 text-white" />
          </div>
          <span className="font-['Nunito'] font-bold text-xl text-[#2C2C2C]">
            direkte
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
            <Icons.Bell className="w-6 h-6 text-[#2C2C2C]" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#FF6B35] rounded-full border-2 border-[#FFFAF5]"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
            <Icons.Menu className="w-6 h-6 text-[#2C2C2C]" />
          </button>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="bg-[#E5E7EB] p-1 rounded-xl flex mb-2">
        <button
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${state === "closingSoon" ? "text-[#6B7280] hover:text-[#2C2C2C]" : "bg-white text-[#2C2C2C] shadow-sm"}`}
        >
          Current Votes
        </button>
        <button
          className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${state === "closingSoon" ? "bg-white text-[#2C2C2C] shadow-sm" : "text-[#6B7280] hover:text-[#2C2C2C]"}`}
        >
          Closing Soon
        </button>
      </div>
    </header>
  );

  const renderProposalCard = (
    title: string,
    summary: string,
    days: number,
    forPct: number,
    isUrgent: boolean = false
  ) => (
    <div className="bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-4 active:scale-[0.98] transition-transform duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C] leading-tight w-3/4">
          {title}
        </h3>
        {isUrgent && (
          <div className="flex items-center gap-1 bg-[#FF6B35]/10 px-2 py-1 rounded-full">
            <Icons.Clock className="w-3 h-3 text-[#FF6B35]" />
            <span className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-wide">
              {days}d
            </span>
          </div>
        )}
      </div>

      <p className="text-[#6B7280] text-sm font-['Nunito'] mb-4 line-clamp-2">
        {summary}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 mr-5">
          <div className="h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden flex">
            <div
              className="bg-[#22A06B] h-full rounded-l-full"
              style={{ width: `${forPct}%` }}
            ></div>
            <div
              className="bg-[#E34935] h-full rounded-r-full"
              style={{ width: `${100 - forPct}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[11px] font-bold text-[#22A06B]">
              For {forPct}%
            </span>
            <span className="text-[11px] font-bold text-[#E34935]">
              Against {100 - forPct}%
            </span>
          </div>
        </div>
        <button className="bg-[#5B4FCF] hover:bg-[#3D329F] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap">
          Vote Now
        </button>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center pt-10 pb-6 px-6">
      <div className="w-32 h-32 mb-6 relative">
        {/* Simple abstract illustration using CSS shapes instead of external svg for inline rendering */}
        <div className="absolute inset-0 bg-[#F3F4F6] rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#5B4FCF] opacity-20">
          <Icons.FileText className="w-20 h-20" />
        </div>
        <div className="absolute bottom-2 right-4 text-[#FF6B35]">
          <Icons.CheckSquare className="w-10 h-10" />
        </div>
      </div>
      <h2 className="font-['Nunito'] font-bold text-xl text-[#2C2C2C] mb-2 text-center">
        All Caught Up!
      </h2>
      <p className="text-center text-[#6B7280] text-sm mb-6">
        There are no active proposals open for voting right now. Check back soon
        or explore past results.
      </p>
    </div>
  );

  const renderHowItWorksCard = () => (
    <div className="mx-5 mb-20 bg-gradient-to-br from-[#5B4FCF] to-[#3D329F] rounded-2xl p-6 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>

      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Icons.Lightbulb className="w-5 h-5 text-[#FFD700]" />
        <h3 className="font-['Nunito'] font-bold text-lg text-white">
          How It Works
        </h3>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold font-['Space_Grotesk']">
            1
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            Read AI summaries of complex laws.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold font-['Space_Grotesk']">
            2
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            Cast your predictive vote anonymously.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold font-['Space_Grotesk']">
            3
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            Compare your voice with Parliament.
          </p>
        </div>
      </div>

      <button className="mt-6 w-full bg-white text-[#5B4FCF] font-bold py-3 rounded-xl text-sm hover:bg-[#F3F4F6] transition-colors relative z-10">
        Learn More
      </button>
    </div>
  );

  const renderBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#F3F4F6] z-40">
      <div className="flex justify-around items-center py-3 pb-6">
        <button className="flex flex-col items-center gap-1 text-[#5B4FCF]">
          <Icons.Vote className="w-6 h-6" />
          <span className="text-[10px] font-bold">Vote</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#2C2C2C] transition-colors">
          <Icons.BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-bold">Results</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#2C2C2C] transition-colors">
          <Icons.Users className="w-6 h-6" />
          <span className="text-[10px] font-bold">MPs</span>
        </button>
      </div>
    </nav>
  );

  return (
    <div className="font-['Nunito'] bg-[#FFFAF5] min-h-screen pb-32">
      {renderHeader()}

      <main className="px-5 pt-2">
        {state === "emptyState" ? (
          <>
            {renderEmptyState()}
            {renderHowItWorksCard()}
          </>
        ) : state === "closingSoon" ? (
          <div className="space-y-4">
            {renderProposalCard(
              "Urgent Climate Action Resolution",
              "Emergency measures to reduce carbon emissions by 40% within the next 12 months through immediate industrial regulations.",
              1,
              58,
              true
            )}
            {renderProposalCard(
              "Act on Sustainable Energy Transition for Municipalities",
              "This proposal requires all Danish municipalities to transition 50% of their heating infrastructure to renewable sources by 2030.",
              2,
              64,
              true
            )}
            {renderProposalCard(
              "Healthcare Funding Amendment",
              "Immediate allocation of additional funds for hospital capacity expansion and medical staff recruitment.",
              3,
              71,
              true
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {renderProposalCard(
              "Act on Sustainable Energy Transition for Municipalities",
              "This proposal requires all Danish municipalities to transition 50% of their heating infrastructure to renewable sources by 2030.",
              5,
              64,
              false
            )}
            {renderProposalCard(
              "Amendment to the Employment Act",
              "Proposed changes to flexible working hours and overtime compensation rules for the private sector.",
              7,
              42
            )}
            {renderProposalCard(
              "Digital Infrastructure Expansion Bill",
              "Investment plan for high-speed internet coverage in rural areas, including subsidies for providers.",
              10,
              89
            )}
            {renderProposalCard(
              "Education Reform Initiative",
              "Comprehensive updates to the national curriculum focusing on digital literacy and sustainable development goals.",
              14,
              76
            )}
          </div>
        )}
      </main>

      {renderBottomNav()}
    </div>
  );
};

export default VoteFeedScreen;
