import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  state: string;
}

/**
 * States:
 * - default: The "Your Votes" tab is active. The list displays proposals the user has voted on, split into "Awaiting Result" and "Concluded".
 * - emptyState: The user has not voted on any proposals yet.
 */
const UserVotesHistoryScreen: React.FC<ScreenProps> = ({ state }) => {

  const renderHeader = () => (
    <header className="bg-[#FFFAF5] px-5 pt-6 pb-2 sticky top-0 z-30">
      <h1 className="font-['Nunito'] font-bold text-2xl text-[#2C2C2C] mb-4">History</h1>
      
      {/* Tab Switcher */}
      <div className="flex bg-[#F3F4F6] p-1 rounded-xl mb-2">
        <button className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-white text-[#2C2C2C] shadow-sm transition-all">
          Your Votes
        </button>
        <button className="flex-1 py-2.5 rounded-lg text-sm font-bold text-[#6B7280] hover:text-[#2C2C2C] transition-colors">
          Archive
        </button>
      </div>
    </header>
  );

  const renderSectionHeader = (title: string, count: number) => (
    <div className="flex items-center justify-between mt-6 mb-3 px-1">
      <h2 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">{title}</h2>
      <span className="text-xs font-bold text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">{count}</span>
    </div>
  );

  const renderVoteCard = (title: string, userVote: 'for' | 'against', status: 'pending' | 'passed' | 'rejected', date: string) => {
    // Calculate if user won based on their vote vs. outcome
    const userWon = status !== 'pending' && ((userVote === 'for' && status === 'passed') || (userVote === 'against' && status === 'rejected'));

    return (
      <div className="bg-[#FFFFFF] rounded-2xl p-4 mb-3 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-4">
        {/* User Vote Indicator */}
        <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl ${userVote === 'for' ? 'bg-[#22A06B]/10' : 'bg-[#E34935]/10'}`}>
           {userVote === 'for' ? <Icons.ThumbsUp className="w-6 h-6 text-[#22A06B]" /> : <Icons.ThumbsDown className="w-6 h-6 text-[#E34935]" />}
           <span className="text-[9px] font-bold uppercase mt-1 text-[#6B7280]">{userVote}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-['Nunito'] font-bold text-base text-[#2C2C2C] leading-snug mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6B7280] font-['Space_Grotesk']">{date}</span>
            {status !== 'pending' && (
              <>
                 <span className="w-1 h-1 rounded-full bg-[#D1D5DB]"></span>
                 <span className={`font-bold ${status === 'passed' ? 'text-[#22A06B]' : 'text-[#E34935]'}`}>
                   {status === 'passed' ? 'Passed' : 'Rejected'}
                 </span>
              </>
            )}
          </div>
        </div>

        {/* Result Badge (Only for concluded) */}
        {status !== 'pending' && (
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${userWon ? 'bg-[#22A06B] text-white' : 'bg-[#E34935] text-white'}`}>
            {userWon ? 'You Won' : 'You Lost'}
          </div>
        )}
        
        {status === 'pending' && (
          <div className="px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-bold uppercase tracking-wide">
            Pending
          </div>
        )}
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center pt-16 px-6">
      <div className="w-32 h-32 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-6 relative">
         <Icons.Vote className="w-16 h-16 text-[#D1D5DB]" />
         <div className="absolute -bottom-2 -right-2 bg-[#FF6B35] text-white p-2 rounded-full shadow-lg">
            <Icons.Plus className="w-6 h-6" />
         </div>
      </div>
      <h2 className="font-['Nunito'] font-bold text-xl text-[#2C2C2C] mb-2 text-center">No votes yet</h2>
      <p className="text-center text-[#6B7280] text-sm mb-8">
        You haven't cast any predictive votes. Go to the Vote feed to make your voice heard on current proposals.
      </p>
      <button className="bg-[#5B4FCF] text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-[#5B4FCF]/20">
        Start Voting
      </button>
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
      
      <main className="px-5">
        {state === 'emptyState' ? (
          renderEmptyState()
        ) : (
          <>
            <div>
              {renderSectionHeader("Awaiting Result", 1)}
              {renderVoteCard("Energy Transition Act", "for", "pending", "2 days ago")}
            </div>

            <div>
              {renderSectionHeader("Concluded", 3)}
              {renderVoteCard("Employment Amendment", "against", "passed", "Oct 20, 2023")}
              {renderVoteCard("Digital Infrastructure Bill", "for", "passed", "Oct 15, 2023")}
              {renderVoteCard("Defense Budget Increase", "for", "rejected", "Oct 10, 2023")}
            </div>
          </>
        )}
      </main>

      {renderBottomNav()}
    </div>
  );
};

export default UserVotesHistoryScreen;