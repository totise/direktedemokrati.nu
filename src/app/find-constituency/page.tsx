"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Search,
  Save,
  Users
} from "lucide-react";

import { useConstituency } from "@/hooks/use-constituency";
import { constituencies, mps } from "@/lib/mock-data";
import {
  isValidDanishPostcode,
  lookupConstituencyByPostcode,
  normalizePostcode,
  formatFullName
} from "@/lib/utils";

const PARTY_COLORS: Record<string, string> = {
  Socialdemokratiet: "#A00000",
  "Socialistisk Folkeparti": "#AF1F2D",
  Venstre: "#00205B",
  "Dansk Folkeparti": "#BF0A30",
  "Radikale Venstre": "#7B2D8E",
  Alternativet: "#2E7D32"
};

const REGION_LABELS: Record<string, string> = {
  HOVEDSTADEN: "Region Hovedstaden",
  SJÆLLAND: "Region Sjælland",
  SYDDANMARK: "Region Syddanmark",
  NORDJYLLAND: "Region Nordjylland"
};

const getPartyColor = (party: string): string =>
  PARTY_COLORS[party] ?? "#5B4FCF";

export default function FindConstituencyPage() {
  const {
    constituency: savedConstituency,
    postcode: savedPostcode,
    isLoaded,
    saveConstituencyByPostcode
  } = useConstituency();
  const [postcode, setPostcode] = useState("");
  const [activeConstituency, setActiveConstituency] =
    useState(savedConstituency);
  const [activePostcode, setActivePostcode] = useState(savedPostcode);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    setPostcode(savedPostcode);
    setActiveConstituency(savedConstituency);
    setActivePostcode(savedPostcode);
  }, [isLoaded, savedConstituency, savedPostcode]);

  const activeMpList = useMemo(() => {
    if (!activeConstituency) {
      return [];
    }

    return mps
      .filter((mp) => mp.constituencyId === activeConstituency.id)
      .sort((left, right) =>
        formatFullName(left.firstName, left.lastName).localeCompare(
          formatFullName(right.firstName, right.lastName),
          "da"
        )
      );
  }, [activeConstituency]);

  const resultLookup = useMemo(() => {
    const normalizedPostcode = normalizePostcode(postcode);

    if (!isValidDanishPostcode(normalizedPostcode)) {
      return {
        normalizedPostcode,
        constituency: null
      };
    }

    return lookupConstituencyByPostcode(normalizedPostcode, constituencies);
  }, [postcode]);

  const handleSubmit = (): void => {
    setError(null);
    setIsSubmitted(true);

    const normalizedPostcode = normalizePostcode(postcode);

    if (!isValidDanishPostcode(normalizedPostcode)) {
      setError("Indtast et gyldigt 4-cifret postnummer.");
      setActiveConstituency(null);
      setActivePostcode(normalizedPostcode);
      return;
    }

    const found = lookupConstituencyByPostcode(
      normalizedPostcode,
      constituencies
    ).constituency;

    if (!found) {
      setError("Vi kunne ikke finde en valgkreds til det postnummer.");
      setActiveConstituency(null);
      setActivePostcode(normalizedPostcode);
      return;
    }

    setActiveConstituency(found);
    setActivePostcode(normalizedPostcode);
    saveConstituencyByPostcode(normalizedPostcode);
  };

  const handleSave = (): void => {
    if (!postcode) {
      return;
    }

    const found = saveConstituencyByPostcode(postcode);

    if (found) {
      setActiveConstituency(found);
      setActivePostcode(normalizePostcode(postcode));
      setError(null);
      setIsSubmitted(true);
    }
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
        <h1 className="text-xl font-bold text-[#2C2C2C]">Find min valgkreds</h1>
      </div>
    </header>
  );

  const renderInputSection = () => (
    <section className="px-5 pt-8">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#5B4FCF]/10">
          <MapPin className="h-12 w-12 text-[#5B4FCF]" />
        </div>

        <h2 className="mb-2 text-2xl font-extrabold text-[#2C2C2C]">
          Find dine lokale repræsentanter
        </h2>
        <p className="mb-8 text-sm text-[#6B7280]">
          Indtast dit 4-cifrede postnummer for at se din valgkreds og de
          MF&apos;er, der repræsenterer dig.
        </p>

        <div className="w-full space-y-3">
          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${postcode ? "text-[#5B4FCF]" : "text-[#9CA3AF]"}`}
            />
            <input
              className={`w-full rounded-2xl border-2 bg-white py-4 pl-12 pr-4 font-['Space_Grotesk'] text-xl tracking-wider shadow-[0_4px_12px_rgba(0,0,0,0.03)] outline-none transition-colors ${error ? "border-[#E34935]" : "border-[#E5E7EB] focus:border-[#5B4FCF]"}`}
              inputMode="numeric"
              maxLength={4}
              onChange={(event) => {
                setPostcode(normalizePostcode(event.target.value));
                setError(null);
                setIsSubmitted(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="F.eks. 2300"
              value={postcode}
            />
          </div>

          {error ? (
            <div className="flex items-start gap-2 rounded-2xl border border-[#E34935]/20 bg-[#E34935]/10 p-3 text-left text-sm text-[#E34935]">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          {isSubmitted && resultLookup.constituency === null && !error ? (
            <div className="rounded-2xl border border-[#FF6B35]/20 bg-[#FF6B35]/10 p-3 text-left text-sm text-[#2C2C2C]">
              Vi kunne ikke matche postnummeret endnu. Tjek, at det er helt
              korrekt.
            </div>
          ) : null}

          <button
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF6B35] py-4 font-bold text-white shadow-lg shadow-[#FF6B35]/20 transition-colors hover:bg-[#E85D2A] active:scale-[0.99]"
            onClick={handleSubmit}
            type="button"
          >
            <Search className="h-5 w-5" />
            Find valgkreds
          </button>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-4 text-left shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <p className="text-sm font-bold text-[#2C2C2C]">
            Sådan fungerer valgkredse
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Et postnummer peger på en storkreds, som er den valgkreds dine
            stemmer og lokale repræsentanter knytter sig til.
          </p>
        </div>
      </div>
    </section>
  );

  const renderMpCard = (mp: (typeof mps)[number]) => {
    const initials = `${mp.firstName.charAt(0)}${mp.lastName.charAt(0)}`;

    return (
      <Link
        className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-transform active:scale-[0.99]"
        href={`/mps/${mp.id}`}
        key={mp.id}
      >
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-[#F3F4F6]">
          {mp.photoUrl ? (
            <Image
              alt={formatFullName(mp.firstName, mp.lastName)}
              fill
              className="object-cover"
              sizes="64px"
              src={mp.photoUrl}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-['Space_Grotesk'] text-sm font-bold text-[#6B7280]">
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="truncate text-lg font-bold text-[#2C2C2C]">
            {formatFullName(mp.firstName, mp.lastName)}
          </h4>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: getPartyColor(mp.party) }}
            >
              {mp.party}
            </span>
            <span className="text-xs text-[#6B7280]">
              {mp.isActive ? "Aktiv MF" : "Inaktiv MF"}
            </span>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-[#9CA3AF]" />
      </Link>
    );
  };

  const renderResultSection = () => {
    if (!activeConstituency) {
      return null;
    }

    return (
      <section className="px-5 pb-32 pt-8">
        <div className="mb-6 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#22A06B]/10 px-4 py-2 text-sm font-bold text-[#22A06B]">
            <CheckCircle2 className="h-5 w-5" />
            Valgkreds fundet
          </div>
          <h2 className="text-2xl font-extrabold text-[#2C2C2C]">
            {activeConstituency.name}
          </h2>
          <p className="mt-1 text-sm text-[#6B7280]">
            {REGION_LABELS[activeConstituency.regionCode] ??
              activeConstituency.regionCode}{" "}
            · {activeConstituency.seatCount} mandater
          </p>
          <button
            className="mx-auto mt-3 flex items-center gap-1 text-sm font-bold text-[#5B4FCF] transition-colors hover:text-[#3D329F]"
            onClick={() => {
              setPostcode("");
              setActiveConstituency(null);
              setActivePostcode("");
              setError(null);
              setIsSubmitted(false);
            }}
            type="button"
          >
            <Search className="h-4 w-4" />
            Søg et andet postnummer
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#2C2C2C]">
            Dine repræsentanter
          </h3>
          <span className="text-sm text-[#6B7280]">
            {activeMpList.length} MF&apos;er
          </span>
        </div>

        <div className="space-y-3">
          {activeMpList.length === 0 ? (
            <div className="rounded-2xl bg-white p-5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <p className="text-base font-bold text-[#2C2C2C]">
                Ingen MF&apos;er fundet
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">
                Valgkredsen er fundet, men der er ikke tilknyttet nogle
                repræsentanter i mockdata.
              </p>
            </div>
          ) : (
            activeMpList.map(renderMpCard)
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <p className="text-sm text-[#6B7280]">
            Dit postnummer er{" "}
            {activePostcode || normalizePostcode(postcode) || "ikke angivet"}.
            Du kan gemme denne valgkreds som din lokale reference.
          </p>
          <button
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B4FCF] py-3 font-bold text-white transition-colors hover:bg-[#3D329F]"
            onClick={handleSave}
            type="button"
          >
            <Save className="h-4 w-4" />
            Gem som min valgkreds
          </button>
        </div>
      </section>
    );
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#FFFAF5] font-['Nunito']">
        {renderHeader()}
        <main className="px-5 py-8 text-sm text-[#6B7280]">
          Indlæser valgkreds...
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF5] font-['Nunito']">
      {renderHeader()}
      <main>
        {renderInputSection()}
        {renderResultSection()}
      </main>
    </div>
  );
}
