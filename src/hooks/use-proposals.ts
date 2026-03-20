"use client";

import { useMemo } from "react";

import type { Proposal, ProposalStatus } from "@/types";

import { proposals } from "@/lib/mock-data";

export interface UseProposalsResult {
  proposals: Proposal[];
  proposalsByStatus: (status: ProposalStatus) => Proposal[];
}

export const useProposals = (): UseProposalsResult => {
  const proposalsByStatus = useMemo(
    () => (status: ProposalStatus): Proposal[] => proposals.filter((proposal) => proposal.status === status),
    []
  );

  return {
    proposals: [...proposals],
    proposalsByStatus
  };
};
