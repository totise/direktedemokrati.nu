import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  state: string;
}

/**
 * States:
 * - default: Shows the MP's photo, details, voting statistics, and chronological voting history.
 * - comparisonBanner: The "You agreed with [MP Name]..." banner is visible at the top.
 */
const MPProfileScreen: React.FC<ScreenProps> = ({ state }) => {
  const renderHeader = () => (
    <header className="sticky top-0 z-30 bg-[#FFFAF5]/95 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-[#E5E7EB]">
      <button className="p-2 -ml-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
        <Icons.ArrowLeft className="w-6 h-6 text-[#2C2C2C]" />
      </button>
      <h1 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">
        Profile
      </h1>
      <button className="p-2 -mr-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
        <Icons.Share2 className="w-6 h-6 text-[#2C2C2C]" />
      </button>
    </header>
  );

  const renderComparisonBanner = () => (
    <div className="mx-5 mt-4 mb-2 bg-[#5B4FCF]/10 border border-[#5B4FCF]/20 rounded-xl p-4 flex items-center gap-3">
      <div className="flex-shrink-0 p-2 bg-[#5B4FCF] rounded-full">
        <Icons.Heart className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 flex items-center">
        <p className="font-['Nunito'] font-bold text-sm text-[#2C2C2C] leading-tight">
          You agreed with <span className="text-[#5B4FCF]">Mette</span> on 8 of
          10 votes
        </p>
      </div>
    </div>
  );

  const renderProfileCard = () => (
    <div className="mx-5 mb-6 bg-[#FFFFFF] rounded-3xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] text-center">
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img
          src="./images/mette-profile.jpg"
          alt="A professional portrait of Mette Frederiksen, middle-aged woman with short blonde hair smiling warmly"
          className="w-full h-full rounded-full object-cover border-4 border-[#FFFAF5] shadow-lg"
          data-context="Large profile photo of MP"
        />
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#A00000] rounded-full border-4 border-[#FFFFFF] flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">S</span>
        </div>
      </div>

      <h2 className="font-['Nunito'] font-extrabold text-2xl text-[#2C2C2C] mb-1">
        Mette Frederiksen
      </h2>
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="bg-[#A00000] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          Socialdemokratiet
        </span>
        <span className="text-[10px] text-[#6B7280]">•</span>
        <span className="text-[10px] text-[#6B7280]">
          Københavns Omegns Storkreds
        </span>
      </div>

      <button className="flex items-center justify-center gap-2 w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#2C2C2C] font-bold py-3 rounded-xl transition-colors text-sm">
        <Icons.Mail className="w-4 h-4 text-[#5B4FCF]" />
        Contact MP
      </button>
    </div>
  );

  const renderDonutChart = (
    percentage: number,
    color: string,
    label: string
  ) => (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 mb-2">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, ${color} 0%, ${color} ${percentage}%, #F3F4F6 ${percentage}%, #F3F4F6 100%)`
          }}
        ></div>
        <div className="absolute inset-2 bg-[#FFFFFF] rounded-full flex items-center justify-center">
          <span className="font-['Space_Grotesk'] font-bold text-xl text-[#2C2C2C]">
            {percentage}%
          </span>
        </div>
      </div>
      <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  const renderStats = () => (
    <div className="mx-5 mb-8 grid grid-cols-3 gap-4">
      {renderDonutChart(82, "#22A06B", "Agrees w/ Public")}
      {renderDonutChart(96, "#5B4FCF", "Participation")}
      {renderDonutChart(94, "#FF6B35", "Party Loyalty")}
    </div>
  );

  const renderVoteHistoryItem = (
    title: string,
    date: string,
    mpVote: "for" | "against",
    publicResult: "for" | "against",
    isAlt: boolean
  ) => (
    <div
      className={`p-4 rounded-2xl flex items-center justify-between ${isAlt ? "bg-[#FFFAF5]" : "bg-[#FFFFFF]"} shadow-[0_2px_8px_rgba(0,0,0,0.02)]`}
    >
      <div className="flex-1 pr-4">
        <h4 className="font-['Nunito'] font-bold text-sm text-[#2C2C2C] leading-snug mb-1">
          {title}
        </h4>
        <p className="text-[10px] text-[#6B7280] font-['Space_Grotesk']">
          {date}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* MP Vote */}
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${mpVote === "for" ? "bg-[#22A06B]/10" : "bg-[#E34935]/10"}`}
          >
            {mpVote === "for" ? (
              <Icons.Check className="w-4 h-4 text-[#22A06B]" />
            ) : (
              <Icons.X className="w-4 h-4 text-[#E34935]" />
            )}
          </div>
          <span className="text-[9px] font-bold text-[#6B7280] mt-1 uppercase">
            MP
          </span>
        </div>

        {/* Match Indicator */}
        {mpVote === publicResult ? (
          <div className="text-[#22A06B]">
            <Icons.ArrowRight className="w-4 h-4" />
          </div>
        ) : (
          <div className="text-[#E34935]">
            <Icons.ArrowRight className="w-4 h-4" />
          </div>
        )}

        {/* Public Vote */}
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${publicResult === "for" ? "bg-[#22A06B]/10" : "bg-[#E34935]/10"}`}
          >
            {publicResult === "for" ? (
              <Icons.Check className="w-4 h-4 text-[#22A06B]" />
            ) : (
              <Icons.X className="w-4 h-4 text-[#E34935]" />
            )}
          </div>
          <span className="text-[9px] font-bold text-[#6B7280] mt-1 uppercase">
            Public
          </span>
        </div>
      </div>
    </div>
  );

  const renderVotingHistory = () => (
    <div className="px-5 pb-10">
      <h3 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C] mb-4">
        Voting History
      </h3>
      <div className="space-y-3">
        {renderVoteHistoryItem(
          "Energy Transition Act",
          "Oct 24, 2023",
          "for",
          "for",
          false
        )}
        {renderVoteHistoryItem(
          "Employment Amendment",
          "Oct 20, 2023",
          "against",
          "for",
          true
        )}
        {renderVoteHistoryItem(
          "Digital Infrastructure Bill",
          "Oct 15, 2023",
          "for",
          "for",
          false
        )}
        {renderVoteHistoryItem(
          "Defense Budget Increase",
          "Oct 10, 2023",
          "for",
          "against",
          true
        )}
      </div>
    </div>
  );

  return (
    <div className="font-['Nunito'] bg-[#FFFAF5] min-h-screen">
      {renderHeader()}

      <main className="pt-2">
        {state === "comparisonBanner" && renderComparisonBanner()}
        {renderProfileCard()}
        {renderStats()}
        {renderVotingHistory()}
      </main>
    </div>
  );
};

export default MPProfileScreen;
