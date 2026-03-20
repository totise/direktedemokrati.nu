"use client";

import { useState } from "react";
import type { ReactElement } from "react";

import { ArrowRight, X } from "lucide-react";

export interface PostcodeModalProps {
  defaultValue?: string;
  onClose: () => void;
  onSubmit: (postcode: string) => void;
}

export default function PostcodeModal({ defaultValue = "", onClose, onSubmit }: PostcodeModalProps): ReactElement {
  const [postcode, setPostcode] = useState(defaultValue);
  const isValid = /^\d{4}$/.test(postcode);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button aria-label="Luk postnummer" className="absolute inset-0 bg-[#2C2C2C]/40" onClick={onClose} type="button" />
      <div className="relative z-10 w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2C2C2C]">Indtast postnummer</h2>
          <button className="rounded-full bg-[#F3F4F6] p-2 text-[#6B7280]" onClick={onClose} type="button">
            <X className="h-5 w-5" />
          </button>
        </div>

        <label className="mb-2 block text-sm font-bold text-[#2C2C2C]" htmlFor="postcode-input">
          Dansk postnummer
        </label>
        <input
          className="mb-3 w-full rounded-xl border-2 border-[#E5E7EB] bg-[#FFFAF5] px-4 py-3 text-lg font-['Space_Grotesk'] focus:border-[#5B4FCF] focus:outline-none"
          id="postcode-input"
          inputMode="numeric"
          maxLength={4}
          onChange={(event) => setPostcode(event.target.value.replace(/\D/g, "").slice(0, 4))}
          placeholder="2300"
          value={postcode}
        />

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B4FCF] py-4 font-bold text-white transition-colors hover:bg-[#3D329F] disabled:cursor-not-allowed disabled:bg-[#B8B2E4]"
          disabled={!isValid}
          onClick={() => onSubmit(postcode)}
          type="button"
        >
          Find mine repræsentanter <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
