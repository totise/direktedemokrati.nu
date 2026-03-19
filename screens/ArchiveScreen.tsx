import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  state: string;
}

/**
 * States:
 * - default: The "Archive" tab is active. The screen displays the chronological list of concluded proposals grouped by session.
 * - filterActive: An outcome filter (e.g., "Passed") is applied, narrowing down the list.
 */
const ArchiveScreen: React.FC<ScreenProps> = ({ state }) => {

  const renderHeader = () => {
    return (
      <header className="bg-[#FFFAF5] px-5 pt-6 pb-2 sticky top-0 z-30">
        <h1 className="font-['Nunito'] font-bold text-2xl text-[#2C2C2C] mb-4">Archive</h1>
        
        {/* Tab Switcher */}
        <div className="flex bg-[#F3F4F6] p-1 rounded-xl mb-2">
          <button className="flex-1 py-2.5 rounded-lg text-sm font-bold text-[#6B7280] hover:text-[#2C2C2C] transition-colors">
            Your Votes
          </button>
          <button className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-white text-[#2C2C2C] shadow-sm transition-all">
            Archive
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mt-2">
          <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${state === 'default' ? 'bg-[#22A06B] border-[#22A06B] text-white' : 'bg-transparent border-[#E5E7EB] text-[#2C2C2C]'}`}>
            All Outcomes
          </button>
          <button className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${state === 'filterActive' ? 'bg-[#22A06B] border-[#22A06B] text-white' : 'bg-transparent border-[#E5E7EB] text-[#2C2C2C]'}`}>
            Passed
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all bg-transparent border-[#E5E7EB] text-[#2C2C2C]">
            Rejected
          </button>
        </div>
      </header>
    );
  };

  const renderArchiveItem = (title: string, date: string, result: 'passed' | 'rejected', alignment: 'aligned' | 'split') => {
    return (
      <div className="bg-[#FFFFFF] rounded-2xl p-4 mb-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-['Nunito'] font-bold text-base text-[#2C2C2C] leading-snug w-3/4">
            {title}
          </h3>
          <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${result === 'passed' ? 'bg-[#22A06B]/10 text-[#22A06B]' : 'bg-[#E34935]/10 text-[#E34935]'}`}>
            {result}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F3F4F6]">
          <span className="text-xs text-[#6B7280] font-['Space_Grotesk']">{date}</span>
          
          <div className="flex items-center gap-1.5">
            {alignment === 'aligned' ? (
              <>
                <Icons.CheckCircle className="w-4 h-4 text-[#22A06B]" />
                <span className="text-xs font-bold text-[#22A06B]">Public Aligned</span>
              </>
            ) : (
              <>
                <Icons.AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-xs font-bold text-[#F59E0B]">Split Decision</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSectionHeader = (title: string) => (
    <div className="bg-[#FFFAF5] py-2 px-5">
      <h2 className="font-['Space_Grotesk'] font-bold text-sm text-[#6B7280] uppercase tracking-widest">
        {title}
      </h2>
      <div className="h-px bg-[#E5E7EB] w-full mt-1"></div>
    </div>
  );

  const renderBottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#F3F4F6] z-40">
      <div className="flex justify-around items-center py-3 pb-6">
        <button className="flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#2C2C2C] transition-colors">
          <Icons.Vote className="w-6 h-6" />
          <span className="text-[10px] font-bold">Vote</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#5B4FCF]">
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
    <div className="font-['Nunito'] bg-[#FFFAF5] min-h-screen pb-24">
      {renderHeader()}
      
      <main className="px-5 pt-4">
        {renderSectionHeader("2023-2024 Session")}
        <div className="mt-2">
          {renderArchiveItem("Climate Action Act", "Oct 15, 2023", "passed", "aligned")}
          {state === 'default' && renderArchiveItem("Digital Tax Reform", "Oct 10, 2023", "rejected", "split")}
          {renderArchiveItem("Infrastructure Bill", "Sep 28, 2023", "passed", "aligned")}
        </div>

        {renderSectionHeader("2022-2023 Session")}
        <div className="mt-2">
          {renderArchiveItem("Defense Spending Increase", "Jun 01, 2023", "passed", "split")}
          {renderArchiveItem("Education Funding Law", "May 20, 2023", "passed", "aligned")}
        </div>
      </main>

      {renderBottomNav()}
    </div>
  );
};

export default ArchiveScreen;