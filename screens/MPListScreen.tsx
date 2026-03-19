import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  state: string;
}

/**
 * States:
 * - default: Displays the search bar, filter controls (showing "All" parties), and the full alphabetical list of MP cards.
 * - searchActive: The search bar contains text, and the list below is filtered to show only MPs matching the search query.
 * - partyFiltered: A specific party chip is selected (e.g., "Venstre"). The list displays only MPs belonging to that party.
 */
const MPListScreen: React.FC<ScreenProps> = ({ state }) => {
  
  const renderHeader = () => (
    <header className="bg-[#FFFAF5] px-5 pt-6 pb-2 sticky top-0 z-30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5B4FCF] rounded-lg flex items-center justify-center">
            <Icons.Users className="w-5 h-5 text-white" />
          </div>
          <span className="font-['Nunito'] font-bold text-xl text-[#2C2C2C]">MPs</span>
        </div>
        <button className="p-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
          <Icons.SlidersHorizontal className="w-6 h-6 text-[#2C2C2C]" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Icons.Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${state === 'searchActive' ? 'text-[#5B4FCF]' : 'text-[#9CA3AF]'}`} />
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={state === 'searchActive' ? 'Lars' : ''}
          className={`w-full bg-[#FFFFFF] border-2 rounded-2xl py-3 pl-12 pr-4 font-['Nunito'] text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-colors ${state === 'searchActive' ? 'border-[#5B4FCF]' : 'border-[#E5E7EB] focus:border-[#5B4FCF]'}`}
        />
        {state === 'searchActive' && (
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-[#F3F4F6] rounded-full text-[#6B7280]">
            <Icons.X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Party Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar pr-2">
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${state === 'partyFiltered' ? 'bg-[#F3F4F6] border-[#F3F4F6] text-[#6B7280]' : 'bg-[#5B4FCF] border-[#5B4FCF] text-white shadow-md shadow-[#5B4FCF]/20'}`}>
          All Parties
        </button>
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all bg-transparent border-[#E5E7EB] text-[#2C2C2C] hover:bg-[#F3F4F6]`}>
          Socialdem.
        </button>
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${state === 'partyFiltered' ? 'bg-[#00205B] border-[#00205B] text-white shadow-md' : 'bg-transparent border-[#E5E7EB] text-[#2C2C2C] hover:bg-[#F3F4F6]'}`}>
          Venstre
        </button>
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all bg-transparent border-[#E5E7EB] text-[#2C2C2C] hover:bg-[#F3F4F6]`}>
          Radikale
        </button>
        <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all bg-transparent border-[#E5E7EB] text-[#2C2C2C] hover:bg-[#F3F4F6]'`}>
          Enhedslisten
        </button>
      </div>
    </header>
  );

  const renderMPCard = (name: string, party: string, partyColor: string, constituency: string, isActive: boolean = true) => (
    <div className="bg-[#FFFFFF] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-3 flex items-center gap-4 active:scale-[0.99] transition-transform duration-200">
      <div className="relative">
         <div className="w-14 h-14 rounded-full bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
            <img 
               src={`./images/mp-${name.split(' ')[0].toLowerCase()}.jpg`} 
               alt={`Portrait of ${name}`} 
               className="w-full h-full object-cover"
               data-context={`Profile photo of MP ${name}`}
               onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* Fallback Initials if image fails (not strictly needed for mockup but good practice logic) */}
            <span className="font-['Nunito'] font-bold text-xl text-[#6B7280] absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
               {name.charAt(0)}
            </span>
         </div>
      </div>
      <div className="flex-1">
        <h3 className="font-['Nunito'] font-bold text-[#2C2C2C] text-lg leading-tight mb-1">{name}</h3>
        <div className="flex items-center gap-2 mb-1">
          <span 
            className="text-[10px] font-bold text-white px-2 py-0.5 rounded-md uppercase tracking-wide"
            style={{ backgroundColor: partyColor }}
          >
            {party}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#6B7280] text-xs">
          <Icons.MapPin className="w-3 h-3" />
          <span>{constituency}</span>
        </div>
      </div>
      <Icons.ChevronRight className="w-5 h-5 text-[#D1D5DB]" />
    </div>
  );

  const renderBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#F3F4F6] z-40">
      <div className="flex justify-around items-center py-3 pb-6">
        <button className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#2C2C2C] transition-colors">
          <Icons.Vote className="w-6 h-6" />
          <span className="text-[10px] font-bold">Vote</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#2C2C2C] transition-colors">
          <Icons.BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-bold">Results</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#5B4FCF]">
          <Icons.Users className="w-6 h-6" />
          <span className="text-[10px] font-bold">MPs</span>
        </button>
      </div>
    </nav>
  );

  return (
    <div className="font-['Nunito'] bg-[#FFFAF5] min-h-screen pb-28">
      {renderHeader()}
      
      <main className="px-5 pt-2 pb-4">
        {state === 'searchActive' ? (
           <div className="space-y-3">
             {/* Filtered list for "Lars" search */}
             {renderMPCard("Lars Løkke Rasmussen", "Moderaterne", "#6A9C3A", "Sjællands Storkreds")}
           </div>
        ) : state === 'partyFiltered' ? (
           <div className="space-y-3">
             {/* Simulated Filtered List for Venstre */}
             {renderMPCard("Jakob Ellemann-Jensen", "Venstre", "#00205B", "Fyns Storkreds")}
             {renderMPCard("Sophie Løhde", "Venstre", "#00205B", "Nordjyllands Storkreds")}
             {renderMPCard("Mads Fuglede", "Venstre", "#00205B", "Vestjyllands Storkreds")}
           </div>
        ) : (
          <div className="space-y-3">
            {renderMPCard("Mette Frederiksen", "Socialdem.", "#A00000", "Københavns Omegns Storkreds")}
            {renderMPCard("Lars Løkke Rasmussen", "Moderaterne", "#6A9C3A", "Sjællands Storkreds")}
            {renderMPCard("Alex Vanopslagh", "Liberal Alliance", "#2C5F8D", "Københavns Storkreds")}
            {renderMPCard("Sofie Carsten Nielsen", "Radikale", "#7B2D8E", "Nordjyllands Storkreds")}
            {renderMPCard("Pia Kjærsgaard", "DF", "#2C3E50", "Fyns Storkreds")}
            {renderMPCard("Mai Villadsen", "Enhedslisten", "#BF0A30", "Københavns Storkreds")}
          </div>
        )}
      </main>
      
      {renderBottomNav()}
    </div>
  );
};

export default MPListScreen;