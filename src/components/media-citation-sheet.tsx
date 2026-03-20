"use client";

import type { ReactElement } from "react";

import { ExternalLink, X } from "lucide-react";

import type { MediaCitation } from "@/types";

export interface MediaCitationSheetProps {
  citation: MediaCitation | null;
  onClose: () => void;
}

export default function MediaCitationSheet({ citation, onClose }: MediaCitationSheetProps): ReactElement | null {
  if (!citation) {
    return null;
  }

  const stanceLabel =
    citation.stance === "for" ? "Støttende" : citation.stance === "against" ? "Kritisk" : "Neutral";

  const stanceStyles =
    citation.stance === "for"
      ? "border-[#22A06B] text-[#22A06B] bg-[#22A06B]/10"
      : citation.stance === "against"
        ? "border-[#E34935] text-[#E34935] bg-[#E34935]/10"
        : "border-[#E5E7EB] text-[#6B7280] bg-[#F3F4F6]";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button aria-label="Luk kilde" className="absolute inset-0 bg-[#2C2C2C]/40" onClick={onClose} type="button" />
      <div className="relative z-10 w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280]">Kilde</p>
            <h2 className="text-xl font-bold text-[#2C2C2C]">{citation.sourceName}</h2>
          </div>
          <button className="rounded-full bg-[#F3F4F6] p-2 text-[#6B7280]" onClick={onClose} type="button">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${stanceStyles}`}>
          {stanceLabel}
        </div>

        <p className="mb-4 text-sm leading-relaxed text-[#2C2C2C]">{citation.quoteText}</p>

        <div className="mb-6 text-xs text-[#6B7280]">
          Publiceret {new Date(citation.publicationDate).toLocaleDateString("da-DK")}
        </div>

        <a
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B4FCF] py-3 font-bold text-white transition-colors hover:bg-[#3D329F]"
          href={citation.sourceUrl}
          rel="noreferrer"
          target="_blank"
        >
          Åbn original artikel <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
