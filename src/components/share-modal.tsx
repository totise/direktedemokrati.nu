"use client";

import type { ReactElement } from "react";

import { X } from "lucide-react";

export interface ShareModalProps {
  shareUrl: string;
  onClose: () => void;
}

export default function ShareModal({ shareUrl, onClose }: ShareModalProps): ReactElement {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button aria-label="Luk deling" className="absolute inset-0 bg-[#2C2C2C]/40" onClick={onClose} type="button" />
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2C2C2C]">Del din stemme</h2>
          <button className="rounded-full bg-[#F3F4F6] p-2 text-[#6B7280]" onClick={onClose} type="button">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <button className="rounded-xl bg-[#F3F4F6] py-3 font-bold text-[#2C2C2C]" type="button">
            Kopiér link
          </button>
          <button className="rounded-xl bg-[#000000] py-3 font-bold text-white" type="button">
            Del på X
          </button>
          <button className="rounded-xl bg-[#1185fe] py-3 font-bold text-white" type="button">
            Bluesky
          </button>
          <button className="rounded-xl bg-[#6364ff] py-3 font-bold text-white" type="button">
            Mastodon
          </button>
        </div>

        <div className="rounded-xl bg-[#F3F4F6] px-4 py-3 text-sm text-[#6B7280]">
          {shareUrl}
        </div>
      </div>
    </div>
  );
}
