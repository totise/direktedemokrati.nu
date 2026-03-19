import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  state: string;
}

/**
 * States:
 * - default: Displays comparison header and full MP grid. No filters applied.
 * - partyFilter: A specific party chip is selected; MP grid highlights/dims based on selection.
 * - searchActive: Search bar focused with query; grid filtered by MP name.
 * - localReps: Local representatives highlighted with "Your Representative" badge.
 */
const ResultsViewScreen: React.FC<ScreenProps> = ({ state }) => {
  // MP data structure
  const mps = [
    // For
    { id: 1, name: "Lars Løkke", party: "Venstre", partyColor: "#00205B", vote: "for" as const, isLocal: true },
    { id: 2, name: "Mette F.", party: "Socialdemokratiet", partyColor: "#A00000", vote: "for" as const, isLocal: false },
    { id: 3, name: "Sofie C.", party: "Radikale", partyColor: "#7B2D8E", vote: "for" as const, isLocal: false },
    { id: 4, name: "Jakob E.", party: "Socialdemokratiet", partyColor: "#A00000", vote: "for" as const, isLocal: false },
    { id: 5, name: "Alex V.", party: "Venstre", partyColor: "#00205B", vote: "for" as const, isLocal: true },
    // Abstain
    { id: 6, name: "Naser K.", party: "Socialdemokratiet", partyColor: "#A00000", vote: "abstain" as const, isLocal: false },
    { id: 7, name: "Søren P.", party: "Venstre", partyColor: "#00205B", vote: "abstain" as const, isLocal: false },
    // Against
    { id: 8, name: "Pia O.", party: "Dansk Folkeparti", partyColor: "#BF0A30", vote: "against" as const, isLocal: false },
    { id: 9, name: "Mikkel B.", party: "Venstre", partyColor: "#00205B", vote: "against" as const, isLocal: false },
    { id: 10, name: "Uffe E.", party: "Venstre", partyColor: "#00205B", vote: "against" as const, isLocal: false },
  ];

  // Filter logic
  const selectedParty = state === 'partyFilter' ? 'Venstre' : null;
  const searchQuery = state === 'searchActive' ? 'Lars' : '';
  const showLocalBadges = state === 'localReps';

  const shouldDimMP = (mp: typeof mps[0]) => {
    if (state === 'partyFilter' && selectedParty) {
      return mp.party !== selectedParty;
    }
    return false;
  };

  const shouldShowMP = (mp: typeof mps[0]) => {
    if (state === 'searchActive' && searchQuery) {
      return mp.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  };

  const isAllPartiesSelected = state !== 'partyFilter';
  const isVenstreSelected = state === 'partyFilter';

  const renderHeader = () => (
    <header className="sticky top-0 z-30 bg-[#FFFAF5]/95 backdrop-blur-sm px-5 py-4 border-b border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-4">
        <button className="p-2 -ml-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
          <Icons.ArrowLeft className="w-6 h-6 text-[#2C2C2C]" />
        </button>
        <h1 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">Results</h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
          <Icons.Share2 className="w-6 h-6 text-[#2C2C2C]" />
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Icons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
        <input 
          type="text" 
          placeholder="Search MP by name..." 
          value={searchQuery}
          className="w-full bg-[#FFFFFF] border-2 rounded-xl py-3 pl-12 pr-12 font-['Nunito'] text-sm transition-colors focus:border-[#5B4FCF]"
          style={{ borderColor: state === 'searchActive' ? '#5B4FCF' : undefined }}
        />
        {state === 'searchActive' && (
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-[#2C2C2C]">
            <Icons.X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Party Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 pr-2 no-scrollbar">
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isAllPartiesSelected ? 'bg-[#5B4FCF] text-white shadow-md shadow-[#5B4FCF]/20' : 'bg-[#F3F4F6] text-[#2C2C2C] hover:bg-[#E5E7EB]'}`}>
          All Parties
        </button>
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-[#F3F4F6] text-[#2C2C2C] hover:bg-[#E5E7EB]'`}>
          Socialdem.
        </button>
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isVenstreSelected ? 'bg-[#00205B] text-white shadow-md' : 'bg-[#F3F4F6] text-[#2C2C2C] hover:bg-[#E5E7EB]'}`}>
          Venstre
        </button>
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-[#F3F4F6] text-[#2C2C2C] hover:bg-[#E5E7EB]'`}>
          Radikale
        </button>
      </div>
    </header>
  );

  const renderComparisonHeader = () => (
    <div className="px-5 py-6 bg-white mb-2 shadow-sm">
      <h2 className="font-['Nunito'] font-bold text-sm text-[#6B7280] uppercase tracking-wide text-center mb-4">Final Vote Outcome</h2>
      
      <div className="flex items-center justify-center gap-6">
        {/* Public Circle */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-[#5B4FCF] flex flex-col items-center justify-center bg-[#5B4FCF]/5 relative">
            <span className="font-['Space_Grotesk'] font-bold text-2xl text-[#5B4FCF]">64%</span>
            <span className="text-[9px] uppercase font-bold text-[#5B4FCF]">For</span>
            <span className="text-[9px] text-[#6B7280]">Public</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
           <span className="text-[#22A06B] font-bold text-lg">PASSED</span>
           <span className="text-[10px] text-[#6B7280]">Parliament</span>
        </div>

        {/* Parliament Circle */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-[#22A06B] flex flex-col items-center justify-center bg-[#22A06B]/5 relative">
            <span className="font-['Space_Grotesk'] font-bold text-2xl text-[#22A06B]">72%</span>
            <span className="text-[9px] uppercase font-bold text-[#22A06B]">For</span>
            <span className="text-[9px] text-[#6B7280]">Folketinget</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-[#6B7280]">
          <span className="font-bold text-[#2C2C2C]">12,403</span> citizens voted
        </p>
      </div>
    </div>
  );

  const renderMPAvatar = (mp: typeof mps[0], isDimmed: boolean) => {
    const showLocalBadge = showLocalBadges && mp.isLocal;

    return (
      <div className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${isDimmed ? 'opacity-30' : 'hover:bg-[#F3F4F6]'}`}>
        <div className="relative mb-1">
          <div className="w-10 h-10 rounded-full p-0.5 border-2" style={{ borderColor: mp.partyColor }}>
             <div className="w-full h-full bg-[#F3F4F6] rounded-full overflow-hidden flex items-center justify-center">
               <span className="font-['Nunito'] font-bold text-xs text-[#6B7280]">{mp.name.charAt(0)}</span>
             </div>
          </div>
          {showLocalBadge && (
            <div className="absolute -top-1 -right-1 bg-[#FF6B35] text-white rounded-full p-0.5 border-2 border-[#FFFAF5]">
               <Icons.Star className="w-2.5 h-2.5" />
            </div>
          )}
          {mp.vote === 'for' && <div className="absolute -bottom-1 -right-1 bg-[#22A06B] text-white rounded-full p-0.5 border-2 border-[#FFFAF5]"><Icons.Check className="w-2.5 h-2.5"/></div>}
          {mp.vote === 'against' && <div className="absolute -bottom-1 -right-1 bg-[#E34935] text-white rounded-full p-0.5 border-2 border-[#FFFAF5]"><Icons.X className="w-2.5 h-2.5"/></div>}
        </div>
        <span className="text-[9px] font-bold text-[#2C2C2C] text-center leading-tight w-12 truncate">{mp.name}</span>
      </div>
    );
  };

  const renderMPGrid = () => {
    const filteredMPs = mps.filter(shouldShowMP);

    const forMPs = filteredMPs.filter(mp => mp.vote === 'for');
    const abstainMPs = filteredMPs.filter(mp => mp.vote === 'abstain');
    const againstMPs = filteredMPs.filter(mp => mp.vote === 'against');

    return (
      <div className="px-5 pb-10">
        <h3 className="font-['Nunito'] font-bold text-sm text-[#2C2C2C] mb-3">Individual Votes</h3>
        <div className="flex gap-2">
          {/* For Column */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="bg-[#22A06B]/10 rounded-lg p-2 text-center mb-1">
               <span className="text-xs font-bold text-[#22A06B]">For ({forMPs.length})</span>
            </div>
            {forMPs.map(mp => (
              <React.Fragment key={mp.id}>
                {renderMPAvatar(mp, shouldDimMP(mp))}
              </React.Fragment>
            ))}
          </div>

          {/* Abstain Column */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="bg-[#F59E0B]/10 rounded-lg p-2 text-center mb-1">
               <span className="text-xs font-bold text-[#F59E0B]">Abstain ({abstainMPs.length})</span>
            </div>
            {abstainMPs.map(mp => (
              <React.Fragment key={mp.id}>
                {renderMPAvatar(mp, shouldDimMP(mp))}
              </React.Fragment>
            ))}
          </div>

          {/* Against Column */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="bg-[#E34935]/10 rounded-lg p-2 text-center mb-1">
               <span className="text-xs font-bold text-[#E34935]">Against ({againstMPs.length})</span>
            </div>
            {againstMPs.map(mp => (
              <React.Fragment key={mp.id}>
                {renderMPAvatar(mp, shouldDimMP(mp))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-['Nunito'] bg-[#FFFAF5] min-h-screen">
      {renderHeader()}
      {renderComparisonHeader()}
      {renderMPGrid()}
    </div>
  );
};

export default ResultsViewScreen;