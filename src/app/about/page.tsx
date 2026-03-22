"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Database,
  Heart,
  MessageSquare,
  Newspaper,
  Send,
  ShieldCheck,
  Sparkles
} from "lucide-react";

interface FeedbackSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const FEEDBACK_STORAGE_KEY = "direkte-demokrati.feedback-submissions";

const readFeedbackSubmissions = (): FeedbackSubmission[] => {
  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);

    return raw ? (JSON.parse(raw) as FeedbackSubmission[]) : [];
  } catch {
    return [];
  }
};

const createSubmissionId = (): string =>
  globalThis.crypto?.randomUUID?.() ??
  `feedback-${Math.random().toString(36).slice(2, 10)}`;

const formatSectionBody = (children: React.ReactNode): React.ReactNode =>
  children;

export default function AboutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = useMemo(
    () => [
      {
        icon: <Heart className="h-5 w-5" />,
        title: "Vores mission",
        body: formatSectionBody(
          <p>
            Vi gør Folketingets arbejde lettere at følge, så flere kan forstå
            forslagene og tage del i den demokratiske samtale.
          </p>
        ),
        accent: true
      },
      {
        icon: <Database className="h-5 w-5" />,
        title: "Datakilder",
        body: formatSectionBody(
          <p>
            Lovforslag og officielle stemmer hentes fra{" "}
            <a
              className="font-bold text-[#5B4FCF] underline underline-offset-2"
              href="https://oda.ft.dk"
              target="_blank"
              rel="noreferrer"
            >
              oda.ft.dk
            </a>
            . Vi bruger de offentlige data som grundlag for hele appen.
          </p>
        )
      },
      {
        icon: <Sparkles className="h-5 w-5" />,
        title: "AI-metode",
        body: formatSectionBody(
          <p>
            Forklaringer og resuméer er AI-genererede og skrevet i almindeligt
            dansk. De hjælper med overblik, men er ikke juridisk bindende.
          </p>
        )
      },
      {
        icon: <Newspaper className="h-5 w-5" />,
        title: "Mediedækning",
        body: formatSectionBody(
          <p>
            Vi citerer danske medier for at vise forskellige synspunkter.
            Kilderne markeres som for, imod eller neutrale.
          </p>
        )
      },
      {
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "Afstemningsintegritet",
        body: formatSectionBody(
          <p>
            Stemmer er anonyme. Vi bruger en lokal sessionsidentitet, så ingen
            behøver logge ind for at deltage.
          </p>
        )
      }
    ],
    []
  );

  const handleSubmit = (): void => {
    setError(null);

    if (message.trim().length === 0) {
      setError("Skriv venligst en besked.");
      return;
    }

    const submissions = readFeedbackSubmissions();
    submissions.push({
      id: createSubmissionId(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    });

    window.localStorage.setItem(
      FEEDBACK_STORAGE_KEY,
      JSON.stringify(submissions)
    );
    setHasSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  const renderHeader = () => (
    <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-[#FFFAF5]/95 px-5 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Link
          className="-ml-2 rounded-full p-2 transition-colors hover:bg-[#F3F4F6]"
          href="/vote"
        >
          <ArrowLeft className="h-6 w-6 text-[#2C2C2C]" />
        </Link>
        <h1 className="text-xl font-bold text-[#2C2C2C]">Om appen</h1>
      </div>
    </header>
  );

  const renderCard = (
    icon: React.ReactElement,
    title: string,
    body: React.ReactNode,
    accent = false
  ) => (
    <section
      className={`mb-4 rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] ${accent ? "bg-gradient-to-br from-[#5B4FCF] to-[#3D329F] text-white" : "bg-white"}`}
      key={title}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className={`rounded-lg p-2 ${accent ? "bg-white/20" : "bg-[#F3F4F6]"}`}
        >
          <span className={accent ? "text-white" : "text-[#5B4FCF]"}>
            {icon}
          </span>
        </div>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div
        className={`text-sm leading-relaxed ${accent ? "text-white/90" : "text-[#6B7280]"}`}
      >
        {body}
      </div>
    </section>
  );

  const renderForm = () => (
    <section className="mb-10 rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-[#FF6B35]" />
        <h2 className="text-lg font-bold text-[#2C2C2C]">
          Kontakt og feedback
        </h2>
      </div>

      {hasSubmitted ? (
        <div className="mb-4 rounded-2xl border border-[#22A06B]/20 bg-[#22A06B]/10 p-4 text-sm text-[#22A06B]">
          Tak for din besked — den er gemt lokalt.
        </div>
      ) : null}

      {error ? (
        <div className="mb-4 rounded-2xl border border-[#E34935]/20 bg-[#E34935]/10 p-4 text-sm text-[#E34935]">
          {error}
        </div>
      ) : null}

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">
            Navn (valgfrit)
          </label>
          <input
            className="w-full rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B4FCF]"
            onChange={(event) => setName(event.target.value)}
            placeholder="Dit navn"
            value={name}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">
            Email (valgfrit)
          </label>
          <input
            className="w-full rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B4FCF]"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="din@email.dk"
            type="email"
            value={email}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#6B7280]">
            Besked
          </label>
          <textarea
            className="min-h-28 w-full resize-none rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B4FCF]"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Hvad vil du gerne fortælle os?"
            value={message}
          />
        </div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] py-3 font-bold text-white transition-colors hover:bg-[#E85D2A]"
          onClick={handleSubmit}
          type="button"
        >
          <Send className="h-4 w-4" />
          Send feedback
        </button>
      </div>
    </section>
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#FFFAF5] font-['Nunito']">
        {renderHeader()}
        <main className="px-5 py-8 text-sm text-[#6B7280]">Indlæser...</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF5] font-['Nunito']">
      {renderHeader()}
      <main className="px-5 pt-4">
        {sections.map((section) =>
          renderCard(section.icon, section.title, section.body, section.accent)
        )}
        {renderForm()}
      </main>
    </div>
  );
}
