"use client";

import { useEffect, useState } from "react";

import type { UserSession } from "@/types";

const SESSION_STORAGE_KEY = "direkte-demokrati.session";

const createSession = (): UserSession => {
  const now = new Date().toISOString();
  const id = globalThis.crypto?.randomUUID?.() ?? `session-${Math.random().toString(36).slice(2, 10)}`;

  return {
    id,
    fingerprint: id,
    createdAt: now,
    lastActive: now,
    constituencyId: null,
    voteCount: 0
  };
};

const readSession = (): UserSession | null => {
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);

    return raw ? (JSON.parse(raw) as UserSession) : null;
  } catch {
    return null;
  }
};

const persistSession = (session: UserSession): void => {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
};

export interface UseSessionResult {
  session: UserSession | null;
  isLoaded: boolean;
  updateSession: (patch: Partial<UserSession>) => void;
}

export const useSession = (): UseSessionResult => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existingSession = readSession();
    const nextSession = existingSession ?? createSession();

    persistSession(nextSession);
    setSession(nextSession);
    setIsLoaded(true);
  }, []);

  const updateSession = (patch: Partial<UserSession>): void => {
    setSession((current) => {
      if (!current) {
        return current;
      }

      const nextSession: UserSession = {
        ...current,
        ...patch,
        lastActive: new Date().toISOString()
      };

      persistSession(nextSession);
      return nextSession;
    });
  };

  return {
    session,
    isLoaded,
    updateSession
  };
};
