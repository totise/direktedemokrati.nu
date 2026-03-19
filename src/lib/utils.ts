import type { Constituency } from "@/types";

import { MAX_POSTCODE_LENGTH } from "@/lib/constants";

export interface ConstituencyLookupResult {
  constituency: Constituency | null;
  normalizedPostcode: string;
}

export const formatCountdown = (targetDate: string | Date, now: Date = new Date()): string => {
  const target = new Date(targetDate);
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (Number.isNaN(target.getTime())) {
    return "Ukendt dato";
  }

  if (diffDays > 1) {
    return `${diffDays} dage tilbage`;
  }

  if (diffDays === 1) {
    return "1 dag tilbage";
  }

  if (diffDays === 0) {
    return "I dag";
  }

  return `For ${Math.abs(diffDays)} dage siden`;
};

export const formatPercentage = (value: number): string => `${Math.round(value)}%`;

export const clampPercentage = (value: number): number => Math.min(100, Math.max(0, value));

export const normalizePostcode = (postcode: string): string => postcode.replace(/\D/g, "").slice(0, MAX_POSTCODE_LENGTH);

export const isValidDanishPostcode = (postcode: string): boolean => /^\d{4}$/.test(postcode);

export const lookupConstituencyByPostcode = (
  postcode: string,
  constituencies: Constituency[]
): ConstituencyLookupResult => {
  const normalizedPostcode = normalizePostcode(postcode);

  if (!isValidDanishPostcode(normalizedPostcode)) {
    return {
      constituency: null,
      normalizedPostcode
    };
  }

  const postcodeNumber = Number(normalizedPostcode);

  const constituency = constituencies.find((entry) =>
    entry.postcodeRanges.some(([start, end]) => postcodeNumber >= start && postcodeNumber <= end)
  ) ?? null;

  return {
    constituency,
    normalizedPostcode
  };
};

export const formatFullName = (firstName: string, lastName: string): string =>
  `${firstName} ${lastName}`.trim();
