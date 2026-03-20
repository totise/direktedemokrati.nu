"use client";

import { useMemo } from "react";

import type { Proposal, ProposalStatus } from "@/types";

import { proposals } from "@/lib/mock-data";

export interface UseProposalsResult {
  proposals: Proposal[];
  proposalsByStatus: (status: ProposalStatus) => Proposal[];
  getProposalById: (id: string) => Proposal | null;
}

export const useProposals = (): UseProposalsResult => {
  const proposalsByStatus = useMemo(
    () => (status: ProposalStatus): Proposal[] => proposals.filter((proposal) => proposal.status === status),
    []
  );

  const getProposalById = useMemo(
    () => (id: string): Proposal | null => proposals.find((proposal) => proposal.id === id) ?? null,
    []
  );

  return {
    proposals: [...proposals],
    proposalsByStatus,
    getProposalById
  };
};
