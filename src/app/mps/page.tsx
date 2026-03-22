"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Search, Users, X } from "lucide-react";

import PartyChip from "@/components/party-chip";
import { constituencies, mps } from "@/lib/mock-data";
import { formatFullName } from "@/lib/utils";

interface PartyOption {
  label: string;
  color: string;
}

const PARTY_COLORS: Record<string, string> = {
  Socialdemokratiet: "#A00000",
  "Socialistisk Folkeparti": "#AF1F2D",
  Venstre: "#00205B",
  "Dansk Folkeparti": "#BF0A30",
  "Radikale Venstre": "#7B2D8E",
  Alternativet: "#2E7D32"
};

const getPartyColor = (party: string): string =>
  PARTY_COLORS[party] ?? "#5B4FCF";

export default function MpListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParty, setSelectedParty] = useState<string | null>(null);

  const partyOptions = useMemo(() => {
    const entries = new Map<string, PartyOption>();

    mps.forEach((mp) => {
      if (!entries.has(mp.party)) {
        entries.set(mp.party, {
          label: mp.party,
          color: getPartyColor(mp.party)
        });
      }
    });

    return Array.from(entries.values()).sort((left, right) =>
      left.label.localeCompare(right.label, "da")
    );
  }, []);

  const filteredMps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...mps]
      .filter((mp) => {
        const fullName = formatFullName(
          mp.firstName,
          mp.lastName
        ).toLowerCase();
        const constituency = constituencies.find(
          (entry) => entry.id === mp.constituencyId
        );
        const searchMatch =
          query.length === 0 ||
          fullName.includes(query) ||
          constituency?.name.toLowerCase().includes(query) === true;
        const partyMatch = selectedParty ? mp.party === selectedParty : true;

        return searchMatch && partyMatch;
      })
      .sort((left, right) =>
        formatFullName(left.firstName, left.lastName).localeCompare(
          formatFullName(right.firstName, right.lastName),
          "da"
        )
      );
  }, [searchQuery, selectedParty]);

  const renderCard = (mp: (typeof mps)[number]) => {
    const initials = `${mp.firstName.charAt(0)}${mp.lastName.charAt(0)}`;

    return (
      <Link
        className="block rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-transform active:scale-[0.99]"
        href={`/mps/${mp.id}`}
        key={mp.id}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6]">
            {mp.photoUrl ? (
              <Image
                alt={formatFullName(mp.firstName, mp.lastName)}
                className="h-full w-full object-cover"
                fill
                sizes="56px"
                src={mp.photoUrl}
              />
            ) : (
              <span className="font-['Space_Grotesk'] text-base font-bold text-[#6B7280]">
                {initials}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold leading-tight text-[#2C2C2C]">
              {formatFullName(mp.firstName, mp.lastName)}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span
                className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: getPartyColor(mp.party) }}
              >
                {mp.party}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#6B7280]">
              <span>Valgkreds:</span>
              <span className="font-medium text-[#2C2C2C]">
                {constituencies.find((entry) => entry.id === mp.constituencyId)
                  ?.name ?? mp.constituencyId}
              </span>
            </div>
          </div>

          <span className="text-[#D1D5DB]">›</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5] px-5 pb-28 pt-6 font-['Nunito']">
      <header className="sticky top-0 z-30 bg-[#FFFAF5] pb-3">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B4FCF]">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#2C2C2C]">MF&apos;er</h1>
          </div>
        </div>

        <div className="relative mb-4">
          <Search
            className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${searchQuery ? "text-[#5B4FCF]" : "text-[#9CA3AF]"}`}
          />
          <input
            className={`w-full rounded-2xl border-2 bg-white py-3 pl-12 pr-11 text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none transition-colors ${searchQuery ? "border-[#5B4FCF]" : "border-[#E5E7EB] focus:border-[#5B4FCF]"}`}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Søg efter navn"
            value={searchQuery}
          />
          {searchQuery ? (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#F3F4F6] p-1 text-[#6B7280]"
              onClick={() => setSearchQuery("")}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar pr-2">
          <PartyChip
            color="#5B4FCF"
            label="Alle partier"
            onClick={() => setSelectedParty(null)}
            selected={selectedParty === null}
          />
          {partyOptions.map((party) => (
            <PartyChip
              color={party.color}
              key={party.label}
              label={party.label}
              onClick={() =>
                setSelectedParty((current) =>
                  current === party.label ? null : party.label
                )
              }
              selected={selectedParty === party.label}
            />
          ))}
        </div>
      </header>

      <main>
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="text-sm font-bold text-[#6B7280]">
            {filteredMps.length} MF&apos;er
          </span>
          {searchQuery || selectedParty ? (
            <button
              className="text-sm font-bold text-[#5B4FCF]"
              onClick={() => {
                setSearchQuery("");
                setSelectedParty(null);
              }}
              type="button"
            >
              Ryd filtre
            </button>
          ) : null}
        </div>

        <div className="space-y-3">
          {filteredMps.length === 0 ? (
            <div className="rounded-2xl bg-white p-5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <p className="text-base font-bold text-[#2C2C2C]">
                Ingen MF&apos;er fundet
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">
                Prøv en anden søgning eller vælg et andet parti.
              </p>
            </div>
          ) : (
            filteredMps.map(renderCard)
          )}
        </div>
      </main>
    </div>
  );
}
