"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { VoteChoice, UserVote } from "@/types";

import { useSession } from "@/hooks/use-session";

const VOTES_STORAGE_KEY = "direkte-demokrati.user-votes";

const readVotes = (): UserVote[] => {
  try {
    const raw = window.localStorage.getItem(VOTES_STORAGE_KEY);

    return raw ? (JSON.parse(raw) as UserVote[]) : [];
  } catch {
    return [];
  }
};

const persistVotes = (votes: UserVote[]): void => {
  window.localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
};

const createVoteId = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `vote-${Math.random().toString(36).slice(2, 10)}`;

export interface CastVoteInput {
  proposalId: string;
  voteChoice: VoteChoice;
  constituencyId?: string | null;
}

export interface UseVotesResult {
  votes: UserVote[];
  isLoaded: boolean;
  getVoteForProposal: (proposalId: string) => UserVote | null;
  castVote: (input: CastVoteInput) => UserVote | null;
}

export const useVotes = (): UseVotesResult => {
  const { session, updateSession, isLoaded: isSessionLoaded } = useSession();
  const [votes, setVotes] = useState<UserVote[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setVotes(readVotes());
    setIsLoaded(true);
  }, []);

  const getVoteForProposal = useCallback(
    (proposalId: string): UserVote | null =>
      votes.find((vote) => vote.proposalId === proposalId && vote.sessionFingerprint === session?.fingerprint) ??
      null,
    [session?.fingerprint, votes]
  );

  const castVote = useCallback(
    (input: CastVoteInput): UserVote | null => {
      if (!session) {
        return null;
      }

      const existingVote = votes.find(
        (vote) => vote.proposalId === input.proposalId && vote.sessionFingerprint === session.fingerprint
      );

      if (existingVote) {
        return existingVote;
      }

      const nextVote: UserVote = {
        id: createVoteId(),
        proposalId: input.proposalId,
        sessionFingerprint: session.fingerprint,
        verifiedUserId: null,
        voteChoice: input.voteChoice,
        constituencyId: input.constituencyId ?? session.constituencyId,
        timestamp: new Date().toISOString(),
        source: "mobile_web"
      };

      const nextVotes = [...votes, nextVote];

      setVotes(nextVotes);
      persistVotes(nextVotes);
      updateSession({ voteCount: session.voteCount + 1 });

      return nextVote;
    },
    [session, updateSession, votes]
  );

  const result = useMemo(
    () => ({
      votes,
      isLoaded: isLoaded && isSessionLoaded,
      getVoteForProposal,
      castVote
    }),
    [castVote, getVoteForProposal, isLoaded, isSessionLoaded, votes]
  );

  return result;
};
