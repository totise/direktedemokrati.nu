"use client";

import { useState, type ReactElement } from "react";

export interface ShareModalProps {
  shareUrl: string;
  onClose: () => void;
}

export default function ShareModal({
  shareUrl,
  onClose
}: ShareModalProps): ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    const resolvedShareUrl =
      typeof window !== "undefined" && !shareUrl.startsWith("http")
        ? `${window.location.origin}${shareUrl}`
        : shareUrl;

    await navigator.clipboard.writeText(resolvedShareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Luk deling"
        className="absolute inset-0 bg-[#2C2C2C]/40"
        onClick={onClose}
        type="button"
      />
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#2C2C2C]">Del linket</h2>
          <p className="mt-2 text-sm text-[#6B7280]">Kopiér og del direkte.</p>
        </div>

        <button
          className="mb-4 w-full rounded-xl bg-[#5B4FCF] py-3 font-bold text-white"
          onClick={() => void handleCopy()}
          type="button"
        >
          {copied ? "Link kopieret" : "Kopiér link"}
        </button>

        <div className="rounded-xl bg-[#F3F4F6] px-4 py-3 text-sm text-[#6B7280]">
          {shareUrl}
        </div>
      </div>
    </div>
  );
}
