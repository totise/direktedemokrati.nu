export type ProposalStatus =
  | "draft"
  | "open_for_voting"
  | "closed_pending_result"
  | "results_published"
  | "archived";

export type VoteChoice = "for" | "against";

export type ParliamentaryVoteChoice = "for" | "against" | "abstain" | "absent";

export type ParliamentaryResult = "passed" | "rejected" | "tied";

export type MediaCitationStance = "for" | "against" | "neutral";

export type VoteSource = "mobile_web" | "desktop_web";

export interface Proposal {
  id: string;
  odaReferenceId: string;
  officialTitle: string;
  aiSummary: string;
  status: ProposalStatus;
  scheduledVoteDate: string;
  actualVoteDate: string | null;
  parliamentarySession: string;
  proposalNumber: string;
  isFeatured: boolean;
  publicVoteCountFor: number;
  publicVoteCountAgainst: number;
  curatorNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserVote {
  id: string;
  proposalId: string;
  sessionFingerprint: string;
  verifiedUserId: string | null;
  voteChoice: VoteChoice;
  constituencyId: string | null;
  timestamp: string;
  source: VoteSource;
}

export interface VerifiedUser {
  id: string;
  email: string;
  emailVerified: boolean;
  constituencyId: string | null;
  createdAt: string;
  isVerifiedVoter: boolean;
}

export interface MP {
  id: string;
  odaPersonId: string;
  firstName: string;
  lastName: string;
  party: string;
  constituencyId: string;
  photoUrl: string;
  isActive: boolean;
  electedDate: string;
  email: string;
}

export interface Constituency {
  id: string;
  name: string;
  regionCode: string;
  postcodeRanges: Array<[number, number]>;
  seatCount: number;
}

export interface ParliamentaryVoteResult {
  id: string;
  proposalId: string;
  totalFor: number;
  totalAgainst: number;
  totalAbstain: number;
  totalAbsent: number;
  result: ParliamentaryResult;
  importedAt: string;
}

export interface MPVote {
  id: string;
  proposalId: string;
  mpId: string;
  parliamentaryVoteResultId: string;
  voteChoice: ParliamentaryVoteChoice;
  odaVoteId: string;
}

export interface MediaCitation {
  id: string;
  proposalId: string;
  sourceName: string;
  sourceUrl: string;
  quoteText: string;
  stance: MediaCitationStance;
  publicationDate: string;
  addedBy: string;
}

export interface AISummary {
  id: string;
  proposalId: string;
  summaryText: string;
  modelVersion: string;
  generatedAt: string;
  regeneratedCount: number;
  language: string;
}

export interface UserSession {
  id: string;
  fingerprint: string;
  createdAt: string;
  lastActive: string;
  constituencyId: string | null;
  voteCount: number;
}
