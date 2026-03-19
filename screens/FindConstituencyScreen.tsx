import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  state: string;
}

/**
 * States:
 * - default: The initial state with the postcode input field empty and educational text visible.
 * - results: A valid postcode has been entered and submitted. The screen displays the constituency name and the list of representing MPs.
 */
const FindConstituencyScreen: React.FC<ScreenProps> = ({ state }) => {
  const renderHeader = () => (
    <header className="bg-[#FFFAF5] px-5 pt-6 pb-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
          <Icons.ArrowLeft className="w-6 h-6 text-[#2C2C2C]" />
        </button>
        <h1 className="font-['Nunito'] font-bold text-xl text-[#2C2C2C]">
          Find My Constituency
        </h1>
      </div>
    </header>
  );

  const renderInputSection = () => (
    <div className="px-5 pt-10 flex flex-col items-center">
      <div className="w-24 h-24 mb-6 bg-[#5B4FCF]/10 rounded-full flex items-center justify-center">
        <Icons.MapPin className="w-12 h-12 text-[#5B4FCF]" />
      </div>

      <h2 className="font-['Nunito'] font-extrabold text-2xl text-[#2C2C2C] mb-2 text-center">
        Find your voice in parliament
      </h2>
      <p className="text-[#6B7280] text-center text-sm mb-8 max-w-xs">
        Enter your 4-digit postcode to discover your local representatives and
        see how they vote.
      </p>

      <div className="w-full max-w-sm space-y-3">
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="Postcode (e.g. 2300)"
            className="w-full bg-[#FFFFFF] border-2 border-[#E5E7EB] rounded-2xl py-4 px-5 font-['Space_Grotesk'] text-xl tracking-wider focus:outline-none focus:border-[#5B4FCF] transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
          />
        </div>
        <button className="w-full bg-[#FF6B35] hover:bg-[#E85D2A] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#FF6B35]/20 transition-all active:scale-[0.98]">
          Find Representatives
        </button>
      </div>

      <div className="mt-8 px-4">
        <p className="text-xs text-[#9CA3AF] text-center leading-relaxed">
          Your postcode is used only to locate your constituency and is not
          stored personally.
        </p>
      </div>
    </div>
  );

  const renderResultSection = () => (
    <div className="px-5 pt-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#22A06B]/10 px-4 py-2 rounded-full mb-3">
          <Icons.CheckCircle className="w-5 h-5 text-[#22A06B]" />
          <span className="text-sm font-bold text-[#22A06B]">
            Constituency Found
          </span>
        </div>
        <h2 className="font-['Nunito'] font-extrabold text-2xl text-[#2C2C2C]">
          Københavns Omegns Storkreds
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">Region Hovedstaden</p>
        <button className="mt-3 text-sm font-bold text-[#5B4FCF] hover:text-[#3D329F] flex items-center gap-1 mx-auto transition-colors">
          <Icons.Edit2 className="w-4 h-4" />
          Change Postcode
        </button>
      </div>

      <h3 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C] mb-4">
        Your Representatives
      </h3>

      <div className="space-y-4 mb-24">
        {/* Rep 1 */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
          <img
            src="./images/mp-1.jpg"
            alt="A middle-aged man with glasses smiling warmly, wearing a suit jacket"
            className="w-16 h-16 rounded-full object-cover"
            data-context="Profile photo of MP"
          />
          <div className="flex-1">
            <h4 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">
              Lars Jensen
            </h4>
            <span
              className="text-[10px] font-bold text-white px-2 py-0.5 rounded-md uppercase tracking-wide"
              style={{ backgroundColor: "#00205B" }}
            >
              Venstre
            </span>
          </div>
          <Icons.ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </div>

        {/* Rep 2 */}
        <div className="bg-[#FFFFFF] rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
          <img
            src="./images/mp-2.jpg"
            alt="A woman with short red hair looking professional and friendly"
            className="w-16 h-16 rounded-full object-cover"
            data-context="Profile photo of MP"
          />
          <div className="flex-1">
            <h4 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">
              Sofie D.
            </h4>
            <span
              className="text-[10px] font-bold text-white px-2 py-0.5 rounded-md uppercase tracking-wide"
              style={{ backgroundColor: "#A00000" }}
            >
              Socialdem.
            </span>
          </div>
          <Icons.ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#FFFAF5]/90 backdrop-blur-sm border-t border-[#E5E7EB]">
        <button className="w-full bg-[#5B4FCF] hover:bg-[#3D329F] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#5B4FCF]/20 transition-colors">
          Save as My Constituency
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-['Nunito'] bg-[#FFFAF5] min-h-screen">
      {renderHeader()}
      <main>
        {state === "default" && renderInputSection()}
        {state === "results" && renderResultSection()}
      </main>
    </div>
  );
};

export default FindConstituencyScreen;
