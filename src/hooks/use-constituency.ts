"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Constituency } from "@/types";

import { constituencies } from "@/lib/mock-data";
import { lookupConstituencyByPostcode } from "@/lib/utils";

const CONSTITUENCY_STORAGE_KEY = "direkte-demokrati.constituency";

interface StoredConstituency {
  constituency: Constituency;
  postcode: string;
}

export interface UseConstituencyResult {
  constituency: Constituency | null;
  postcode: string;
  isLoaded: boolean;
  lookupByPostcode: (postcode: string) => Constituency | null;
  saveConstituencyByPostcode: (postcode: string) => Constituency | null;
  clearConstituency: () => void;
}

const readStoredConstituency = (): StoredConstituency | null => {
  try {
    const raw = window.localStorage.getItem(CONSTITUENCY_STORAGE_KEY);

    return raw ? (JSON.parse(raw) as StoredConstituency) : null;
  } catch {
    return null;
  }
};

export const useConstituency = (): UseConstituencyResult => {
  const [constituency, setConstituency] = useState<Constituency | null>(null);
  const [postcode, setPostcode] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = readStoredConstituency();

    if (stored) {
      setConstituency(stored.constituency);
      setPostcode(stored.postcode);
    }

    setIsLoaded(true);
  }, []);

  const lookupByPostcode = useCallback((value: string): Constituency | null => {
    const { constituency: foundConstituency, normalizedPostcode } = lookupConstituencyByPostcode(value, constituencies);

    setPostcode(normalizedPostcode);
    return foundConstituency;
  }, []);

  const saveConstituencyByPostcode = useCallback((value: string): Constituency | null => {
    const { constituency: foundConstituency, normalizedPostcode } = lookupConstituencyByPostcode(
      value,
      constituencies
    );

    setPostcode(normalizedPostcode);

    if (!foundConstituency) {
      return null;
    }

    setConstituency(foundConstituency);
    window.localStorage.setItem(
      CONSTITUENCY_STORAGE_KEY,
      JSON.stringify({ constituency: foundConstituency, postcode: normalizedPostcode })
    );

    return foundConstituency;
  }, []);

  const clearConstituency = useCallback(() => {
    setConstituency(null);
    setPostcode("");
    window.localStorage.removeItem(CONSTITUENCY_STORAGE_KEY);
  }, []);

  return useMemo(
    () => ({
      constituency,
      postcode,
      isLoaded,
      lookupByPostcode,
      saveConstituencyByPostcode,
      clearConstituency
    }),
    [clearConstituency, constituency, isLoaded, lookupByPostcode, postcode, saveConstituencyByPostcode]
  );
};
