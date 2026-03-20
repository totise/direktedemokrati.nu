"use client";

import { useEffect, useState } from "react";

const SESSION_STORAGE_KEY = "direktedemokrati.sessionId";

const createSessionId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `session_${Math.random().toString(36).slice(2, 11)}`;
};

export function useSession(): string | null {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const storedSessionId = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (storedSessionId) {
      setSessionId(storedSessionId);
      return;
    }

    const nextSessionId = createSessionId();
    window.localStorage.setItem(SESSION_STORAGE_KEY, nextSessionId);
    setSessionId(nextSessionId);
  }, []);

  return sessionId;
}
