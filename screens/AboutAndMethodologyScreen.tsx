import React from "react";
import * as Icons from "lucide-react";

export interface ScreenProps {
  state: string;
}

/**
 * States:
 * - default: Displays all informational sections (Mission, Data, AI, Media, Integrity) and the contact/feedback form at the bottom.
 */
const AboutAndMethodologyScreen: React.FC<ScreenProps> = ({ state }) => {
  const renderHeader = () => (
    <header className="bg-white px-5 pt-6 pb-4 sticky top-0 z-30 border-b border-[#E5E7EB] shadow-sm">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 rounded-full hover:bg-[#F3F4F6] transition-colors">
          <Icons.ArrowLeft className="w-6 h-6 text-[#2C2C2C]" />
        </button>
        <h1 className="font-['Nunito'] font-bold text-xl text-[#2C2C2C]">
          About & Methodology
        </h1>
      </div>
    </header>
  );

  const renderSectionCard = (
    icon: React.ReactElement,
    title: string,
    children: React.ReactNode,
    isFirst: boolean = false
  ) => (
    <div
      className={`bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-4 ${isFirst ? "bg-gradient-to-br from-[#5B4FCF] to-[#3D329F] text-white" : ""}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`p-2 rounded-lg ${isFirst ? "bg-white/20" : "bg-[#F3F4F6]"}`}
        >
          {React.cloneElement(
            icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
            {
              className: `w-5 h-5 ${isFirst ? "text-white" : "text-[#5B4FCF]"}`
            }
          )}
        </div>
        <h2
          className={`font-['Nunito'] font-bold text-lg ${isFirst ? "text-white" : "text-[#2C2C2C]"}`}
        >
          {title}
        </h2>
      </div>
      <div
        className={`text-sm leading-relaxed ${isFirst ? "text-white/90" : "text-[#6B7280]"}`}
      >
        {children}
      </div>
    </div>
  );

  const renderFeedbackForm = () => (
    <div className="bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Icons.MessageSquare className="w-5 h-5 text-[#FF6B35]" />
        <h2 className="font-['Nunito'] font-bold text-lg text-[#2C2C2C]">
          Feedback & Contact
        </h2>
      </div>

      <form className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-1">
            Name (Optional)
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5B4FCF] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-1">
            Email (Optional)
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5B4FCF] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-1">
            Message
          </label>
          <textarea
            rows={3}
            placeholder="How can we improve?"
            className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5B4FCF] transition-colors resize-none"
          ></textarea>
        </div>
        <button className="w-full bg-[#FF6B35] hover:bg-[#E85D2A] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#FF6B35]/20 transition-all">
          Send Feedback
        </button>
      </form>
    </div>
  );

  return (
    <div className="font-['Nunito'] bg-[#FFFAF5] min-h-screen">
      {renderHeader()}

      <main className="px-5 pt-4">
        {renderSectionCard(
          <Icons.Heart />,
          "Our Mission",
          <p>
            Direkte empowers Danish citizens to engage directly with their
            democracy. We bridge the gap between the Folketinget and the public
            by making complex legislative proposals accessible and actionable.
          </p>,
          true
        )}

        {renderSectionCard(
          <Icons.Database />,
          "Data Sources",
          <p>
            All proposal data and official voting records are sourced directly
            from the{" "}
            <a
              href="https://oda.ft.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#5B4FCF] underline underline-offset-2 hover:text-[#4A3DB8] transition-colors"
            >
              Open Data API (oda.ft.dk)
            </a>
            . We update our platform in real-time as parliamentary proceedings
            occur.
          </p>
        )}

        {renderSectionCard(
          <Icons.Sparkles />,
          "AI Summaries",
          <p>
            Complex legal texts are summarized by AI to provide plain-language
            explanations. While we strive for accuracy, AI summaries should be
            treated as guides. Always refer to the full official text for legal
            precision.
          </p>
        )}

        {renderSectionCard(
          <Icons.Newspaper />,
          "Media Perspectives",
          <p>
            To provide balanced context, we cite major Danish newspapers
            (Politiken, Berlingske, Jyllands-Posten, etc.). Editors classify
            stances as Supporting, Opposing, or Neutral to help you understand
            the debate landscape.
          </p>
        )}

        {renderSectionCard(
          <Icons.ShieldCheck />,
          "Voting Integrity",
          <p>
            Your votes are anonymous. We use session fingerprints to prevent
            duplicate voting on a single proposal without requiring login. In
            the future, verified ID options will be available for higher-stakes
            polls.
          </p>
        )}

        {renderFeedbackForm()}
      </main>
    </div>
  );
};

export default AboutAndMethodologyScreen;
