import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  // ID of the preview state that should be displayed
  state: string;
}

/**
 * States:
 * - default: Shows the proposal header, collapsed AI summary teaser, media citations list, collapsed constituency section, and the active voting controls.
 * - summaryExpanded: The AI summary section is expanded to show the full plain-language explanation text.
 * - constituencyFound: The "Who Represents Me?" section is expanded or populated, displaying the names and photos of the local MPs.
 * - postcodeModal: A bottom sheet overlay is visible, prompting the user to enter a 4-digit Danish postcode.
 * - mediaSheet: A bottom sheet overlay is visible displaying the full details of a specific media citation.
 * - voted: The voting controls are replaced by a post-vote confirmation message showing user's choice and updated stats.
 * - shareModal: A share modal is displayed, offering options to share the vote.
 */
const ProposalDetailScreen: React.FC<ScreenProps> = ({ state }) => {
  // --- Helper Functions ---

  const renderHeader = () => (
    <header className="sticky top-0 z-30 bg-[#FFFAF5]/95 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-[#E5E7EB]">
      <button className="p-2 -ml-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
        <Icons.ArrowLeft className="w-6 h-6 text-[#2C2C2C]" />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
          Proposal
        </span>
        <span className="font-['Space_Grotesk'] font-bold text-[#2C2C2C]">
          L 2024 105
        </span>
      </div>
      <button className="p-2 -mr-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
        <Icons.Menu className="w-6 h-6 text-[#2C2C2C]" />
      </button>
    </header>
  );

  const renderProposalHeader = () => (
    <div className="px-5 pt-6 pb-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-[#5B4FCF]/10 text-[#5B4FCF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          Final Vote
        </span>
        <div className="flex items-center gap-1 text-[#FF6B35]">
          <Icons.Clock className="w-3 h-3" />
          <span className="text-xs font-bold font-['Space_Grotesk']">
            3 days left
          </span>
        </div>
      </div>
      <h1 className="font-['Nunito'] font-extrabold text-2xl leading-tight text-[#2C2C2C] mb-2">
        Act on Sustainable Energy Transition for Municipalities
      </h1>
      <p className="text-[#6B7280] text-sm font-['Nunito']">
        Ministry of Climate, Energy and Utilities
      </p>
    </div>
  );

  const renderAISummary = (isExpanded: boolean) => (
    <div className="mx-5 my-6 bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-[#5B4FCF]/10 rounded-lg">
          <Icons.Sparkles className="w-4 h-4 text-[#5B4FCF]" />
        </div>
        <h2 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">
          AI Summary
        </h2>
        <span className="ml-auto text-[10px] font-semibold text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
          PLAIN LANGUAGE
        </span>
      </div>

      <div className="text-[#2C2C2C] leading-relaxed space-y-3">
        <p>
          This proposal requires all Danish municipalities to transition 50% of
          their heating infrastructure to renewable sources by 2030.
        </p>
        {isExpanded && (
          <p className="pt-2 border-t border-[#F3F4F6]">
            The government will provide a subsidy fund of 2.5 billion DKK to
            support the conversion. The act mandates that municipalities must
            report their progress annually. Failure to meet targets may result
            in reduced funding allocations from the national block grant.
            <br />
            <br />
            <strong>Key Impact:</strong> Households in rural areas may
            experience a temporary increase in heating bills during the
            transition period, estimated at 200-400 DKK annually, offset by
            long-term stability.
          </p>
        )}
      </div>

      <button className="mt-4 flex items-center gap-1 text-[#5B4FCF] font-bold text-sm hover:underline">
        {isExpanded ? "Show less" : "Read Full Summary"}
        <Icons.ChevronDown
          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );

  const renderMediaCitations = () => (
    <div className="mb-6">
      <div className="px-5 mb-3 flex items-center justify-between">
        <h2 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">
          Media Perspectives
        </h2>
        <span className="text-xs font-semibold text-[#6B7280]">3 Sources</span>
      </div>

      <div className="flex overflow-x-auto gap-4 px-5 pb-4 -mx-5 px-5">
        {/* Card 1 */}
        <div className="min-w-[280px] bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border-l-4 border-[#22A06B]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-[#6B7280]">Politiken</span>
            <span className="text-[10px] font-bold text-[#22A06B] bg-[#22A06B]/10 px-2 py-0.5 rounded-full">
              SUPPORTING
            </span>
          </div>
          <p className="text-[#2C2C2C] text-sm font-['Nunito'] italic mb-3 relative">
            <Icons.Quote className="w-6 h-6 text-[#FF6B35] absolute -top-2 -left-1 opacity-20" />
            A necessary step towards Denmark's 2040 goals, though the financial
            burden on small municipalities requires careful monitoring.
          </p>
          <div className="flex items-center gap-1 text-[#5B4FCF] text-xs font-bold cursor-pointer hover:underline">
            Read Article <Icons.ExternalLink className="w-3 h-3" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="min-w-[280px] bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border-l-4 border-[#E34935]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-[#6B7280]">
              Jyllands-Posten
            </span>
            <span className="text-[10px] font-bold text-[#E34935] bg-[#E34935]/10 px-2 py-0.5 rounded-full">
              CRITICAL
            </span>
          </div>
          <p className="text-[#2C2C2C] text-sm font-['Nunito'] italic mb-3 relative">
            The timeline is unrealistic for rural districts. The proposal
            prioritizes speed over practical feasibility.
          </p>
          <div className="flex items-center gap-1 text-[#5B4FCF] text-xs font-bold cursor-pointer hover:underline">
            Read Article <Icons.ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderConstituency = (isFound: boolean) => (
    <div className="mx-5 mb-6 bg-[#FFFFFF] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Icons.MapPin className="w-5 h-5 text-[#FF6B35]" />
          <h2 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">
            Who Represents Me?
          </h2>
        </div>

        {!isFound ? (
          <p className="text-sm text-[#6B7280] mb-4">
            Enter your postcode to see how your local representatives voted on
            similar issues.
          </p>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[#2C2C2C]">
              <span className="font-bold">Københavns Omegns Storkreds</span>
            </p>
            <button className="text-xs text-[#5B4FCF] font-bold">Edit</button>
          </div>
        )}

        {!isFound && (
          <button className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#2C2C2C] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            <span>Find My Postcode</span>
            <Icons.ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {isFound && (
        <div className="bg-[#FFFAF5] p-5 border-t border-[#F3F4F6]">
          <h3 className="text-xs font-bold uppercase text-[#6B7280] mb-3 tracking-wider">
            Your Representatives
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="flex flex-col items-center min-w-[80px]">
              <img
                src="./images/mp-1.jpg"
                alt="A middle-aged man with glasses smiling warmly, wearing a suit jacket"
                className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-[#FFFFFF] shadow-md"
                data-context="Profile photo of MP Lars Jensen"
              />
              <span className="text-xs font-bold text-[#2C2C2C] text-center leading-tight">
                Lars Jensen
              </span>
              <span className="text-[10px] text-[#6B7280] text-center">
                Venstre
              </span>
            </div>
            <div className="flex flex-col items-center min-w-[80px]">
              <img
                src="./images/mp-2.jpg"
                alt="A woman with short red hair looking professional and friendly"
                className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-[#FFFFFF] shadow-md"
                data-context="Profile photo of MP Mette Frederiksen placeholder"
              />
              <span className="text-xs font-bold text-[#2C2C2C] text-center leading-tight">
                Sofie D.
              </span>
              <span className="text-[10px] text-[#6B7280] text-center">
                Socialdem.
              </span>
            </div>
            <div className="flex flex-col items-center min-w-[80px]">
              <img
                src="./images/mp-3.jpg"
                alt="A young man with a beard wearing a casual blazer"
                className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-[#FFFFFF] shadow-md"
                data-context="Profile photo of MP Magnus Heunicke placeholder"
              />
              <span className="text-xs font-bold text-[#2C2C2C] text-center leading-tight">
                Anders B.
              </span>
              <span className="text-[10px] text-[#6B7280] text-center">
                Radikale
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFooterData = () => (
    <div className="px-5 pb-52 text-center">
      <p className="text-[10px] text-[#9CA3AF] font-['Nunito]">
        Data from oda.ft.dk • Summaries AI-generated
      </p>
    </div>
  );

  const renderVotingControls = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#F3F4F6] p-5 z-20 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto">
        <p className="text-center font-['Nunito'] font-bold text-[#2C2C2C] mb-4">
          How would you vote?
        </p>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <button className="group relative overflow-hidden bg-[#22A06B] hover:bg-[#1B865A] active:scale-95 transition-all duration-200 rounded-2xl p-4 shadow-lg shadow-[#22A06B]/20 animate-pulse">
            <div className="flex flex-col items-center gap-2 text-white">
              <Icons.ThumbsUp className="w-8 h-8" />
              <span className="font-bold text-lg">For</span>
            </div>
          </button>

          <button className="group relative overflow-hidden bg-[#E34935] hover:bg-[#C93E2D] active:scale-95 transition-all duration-200 rounded-2xl p-4 shadow-lg shadow-[#E34935]/20">
            <div className="flex flex-col items-center gap-2 text-white">
              <Icons.ThumbsDown className="w-8 h-8" />
              <span className="font-bold text-lg">Against</span>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-[#9CA3AF] font-medium">
          <Icons.Shield className="w-3 h-3" />
          <span>Anonymous vote • No login required</span>
        </div>
      </div>
    </div>
  );

  const renderPostVote = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF] border-t border-[#F3F4F6] p-5 z-20 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">
              You voted
            </p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22A06B]"></div>
              <span className="font-['Nunito'] font-bold text-[#2C2C2C] text-lg">
                For
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">
              Current Standings
            </p>
            <div className="font-['Space_Grotesk'] font-bold text-[#2C2C2C]">
              64% <span className="text-[#22A06B]">For</span> • 36%{" "}
              <span className="text-[#E34935]">Against</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <button className="flex items-center justify-center gap-2 bg-[#F3F4F6] text-[#2C2C2C] font-bold py-3 rounded-xl text-sm hover:bg-[#E5E7EB] transition-colors">
            <Icons.Bookmark className="w-4 h-4" />
            Save Vote
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#5B4FCF] text-[#FFFFFF] font-bold py-3 rounded-xl text-sm hover:bg-[#3D329F] transition-colors">
            <Icons.Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        <button className="w-full border border-[#E5E7EB] text-[#6B7280] font-bold py-3 rounded-xl text-sm hover:bg-[#F9FAFB] transition-colors">
          Email Receipt
        </button>
      </div>
    </div>
  );

  const renderPostcodeModal = () => (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-[#2C2C2C]/40 backdrop-blur-sm" />
      <div className="relative bg-[#FFFFFF] w-full max-w-md rounded-t-3xl p-6 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-['Nunito'] font-bold text-xl text-[#2C2C2C]">
            Enter Postcode
          </h2>
          <button className="p-1 rounded-full bg-[#F3F4F6] text-[#6B7280]">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-[#2C2C2C] mb-2">
            Danish Postcode
          </label>
          <input
            type="number"
            placeholder="e.g. 2300"
            className="w-full bg-[#FFFAF5] border-2 border-[#E5E7EB] rounded-xl px-4 py-3 font-['Space_Grotesk'] text-lg focus:outline-none focus:border-[#5B4FCF] transition-colors"
          />
        </div>

        <button className="w-full bg-[#5B4FCF] text-[#FFFFFF] font-bold py-4 rounded-xl hover:bg-[#3D329F] transition-colors">
          Find My Representatives
        </button>
      </div>
    </div>
  );

  const renderMediaSheet = () => (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-[#2C2C2C]/40 backdrop-blur-sm" />
      <div className="relative bg-[#FFFFFF] w-full max-w-md rounded-t-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-[#E5E7EB] rounded-full mx-auto mb-6" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#6B7280] font-bold text-xs">
            P
          </div>
          <div>
            <h3 className="font-bold text-[#2C2C2C]">Politiken</h3>
            <p className="text-xs text-[#6B7280]">Oct 12, 2023 • Opinion</p>
          </div>
        </div>

        <div className="relative mb-6">
          <Icons.Quote className="w-12 h-12 text-[#FF6B35] opacity-10 absolute -top-2 -left-2" />
          <p className="text-[#2C2C2C] font-['Nunito'] text-lg leading-relaxed italic pl-10">
            "A necessary step towards Denmark's 2040 goals, though the financial
            burden on small municipalities requires careful monitoring. We
            cannot afford to leave the rural districts behind in this green
            transition."
          </p>
        </div>

        <a
          href="#"
          className="block w-full text-center bg-[#5B4FCF] text-[#FFFFFF] font-bold py-4 rounded-xl hover:bg-[#3D329F] transition-colors"
        >
          Read Full Article
        </a>
      </div>
    </div>
  );

  const renderShareModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2C2C2C]/40 backdrop-blur-sm" />
      <div className="relative bg-[#FFFFFF] w-full max-w-sm rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-['Nunito'] font-bold text-xl text-[#2C2C2C]">
            Share Vote
          </h2>
          <button className="p-1 rounded-full bg-[#F3F4F6] text-[#6B7280]">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Icons.Facebook className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-[#2C2C2C]">
              Facebook
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-[#000000] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Icons.X className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-[#2C2C2C]">X</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-[#1185fe] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Icons.Rabbit className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-[#2C2C2C]">
              Bluesky
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-[#6364ff] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Icons.Feather className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-[#2C2C2C]">
              Mastodon
            </span>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            readOnly
            value="direktedemokrati.nu/v/L2024105"
            className="w-full bg-[#F3F4F6] text-[#6B7280] font-['Space_Grotesk'] text-sm py-3 pl-4 pr-12 rounded-xl"
          />
          <button className="absolute right-2 top-2 p-1.5 bg-[#FFFFFF] rounded-lg text-[#5B4FCF] shadow-sm">
            <Icons.Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // --- Main Render Logic ---

  const isSummaryExpanded = state === "summaryExpanded";
  const isConstituencyFound = state === "constituencyFound";
  const isVoted = state === "voted";
  const showPostcodeModal = state === "postcodeModal";
  const showMediaSheet = state === "mediaSheet";
  const showShareModal = state === "shareModal";

  return (
    <div className="font-['Nunito'] bg-[#FFFAF5] min-h-screen relative">
      {renderHeader()}

      <main className="pt-2">
        {renderProposalHeader()}
        {renderAISummary(isSummaryExpanded)}
        {renderMediaCitations()}
        {renderConstituency(isConstituencyFound)}
        {renderFooterData()}
      </main>

      {/* Bottom Controls */}
      {isVoted ? renderPostVote() : renderVotingControls()}

      {/* Overlays */}
      {showPostcodeModal && renderPostcodeModal()}
      {showMediaSheet && renderMediaSheet()}
      {showShareModal && renderShareModal()}
    </div>
  );
};

export default ProposalDetailScreen;
