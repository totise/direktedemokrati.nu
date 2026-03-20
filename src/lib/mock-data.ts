import type {
  AISummary,
  Constituency,
  MediaCitation,
  MP,
  MPVote,
  ParliamentaryVoteResult,
  Proposal,
  UserSession,
  UserVote,
  VerifiedUser
} from "@/types";

export const constituencies: Constituency[] = [
  {
    id: "constituency-copenhagen-east",
    name: "Københavns Storkreds",
    regionCode: "HOVEDSTADEN",
    postcodeRanges: [[1000, 1299], [1300, 1499], [1500, 1999]],
    seatCount: 15
  },
  {
    id: "constituency-copenhagen-west",
    name: "Københavns Omegns Storkreds",
    regionCode: "HOVEDSTADEN",
    postcodeRanges: [[2000, 2999]],
    seatCount: 12
  },
  {
    id: "constituency-zealand",
    name: "Sjællands Storkreds",
    regionCode: "SJÆLLAND",
    postcodeRanges: [[3000, 4999]],
    seatCount: 11
  },
  {
    id: "constituency-funen",
    name: "Fyns Storkreds",
    regionCode: "SYDDANMARK",
    postcodeRanges: [[5000, 5999]],
    seatCount: 11
  },
  {
    id: "constituency-jutland-north",
    name: "Nordjyllands Storkreds",
    regionCode: "NORDJYLLAND",
    postcodeRanges: [[6000, 7999]],
    seatCount: 10
  },
  {
    id: "constituency-jutland-south",
    name: "Sydjyllands Storkreds",
    regionCode: "SYDDANMARK",
    postcodeRanges: [[8000, 9999]],
    seatCount: 12
  }
] as const;

export const proposals: Proposal[] = [
  {
    id: "proposal-climate-tax-2024",
    odaReferenceId: "ft-2024-001",
    officialTitle: "Forslag til lov om forhøjelse af klimaafgiften på industrien",
    aiSummary:
      "Forslaget hæver klimaafgiften for store industrivirksomheder for at accelerere grøn omstilling og finansiere støtteordninger til lavemissions-teknologi.",
    status: "open_for_voting",
    scheduledVoteDate: "2026-03-27T10:00:00.000Z",
    actualVoteDate: null,
    parliamentarySession: "2025-2026",
    proposalNumber: "L 14",
    isFeatured: true,
    publicVoteCountFor: 64,
    publicVoteCountAgainst: 36,
    curatorNotes: "High public interest; strong media coverage across energy and industry desks.",
    createdAt: "2026-03-14T08:30:00.000Z",
    updatedAt: "2026-03-18T14:15:00.000Z"
  },
  {
    id: "proposal-health-digital-2024",
    odaReferenceId: "ft-2024-002",
    officialTitle: "Forslag til lov om digital adgang til patientjournaler",
    aiSummary:
      "Forslaget giver borgere lettere digital adgang til egne sundhedsdata og indfører nye sikkerhedskrav for logning og datadeling.",
    status: "open_for_voting",
    scheduledVoteDate: "2026-03-24T13:00:00.000Z",
    actualVoteDate: null,
    parliamentarySession: "2025-2026",
    proposalNumber: "L 22",
    isFeatured: false,
    publicVoteCountFor: 58,
    publicVoteCountAgainst: 42,
    curatorNotes: "Likely to split parties on privacy vs access arguments.",
    createdAt: "2026-03-11T07:20:00.000Z",
    updatedAt: "2026-03-17T09:45:00.000Z"
  },
  {
    id: "proposal-education-bill-2023",
    odaReferenceId: "ft-2023-013",
    officialTitle: "Forslag til lov om flere lærere i folkeskolen",
    aiSummary:
      "En finansieringsmodel, der omdirigerer midler til ansættelse af flere lærere og reducerer klassestørrelser i udvalgte kommuner.",
    status: "closed_pending_result",
    scheduledVoteDate: "2026-03-10T11:00:00.000Z",
    actualVoteDate: null,
    parliamentarySession: "2025-2026",
    proposalNumber: "B 81",
    isFeatured: false,
    publicVoteCountFor: 71,
    publicVoteCountAgainst: 29,
    curatorNotes: "Awaiting the formal parliamentary tally.",
    createdAt: "2026-02-28T10:00:00.000Z",
    updatedAt: "2026-03-10T12:30:00.000Z"
  },
  {
    id: "proposal-rent-control-2023",
    odaReferenceId: "ft-2023-014",
    officialTitle: "Forslag til lov om huslejeregulering i de største byer",
    aiSummary:
      "Forslaget sætter et loft over huslejestigninger i byområder med højt boligpres og udvider beskyttelsen mod eksorbitante depositummer.",
    status: "results_published",
    scheduledVoteDate: "2026-02-20T10:00:00.000Z",
    actualVoteDate: "2026-02-20T12:10:00.000Z",
    parliamentarySession: "2025-2026",
    proposalNumber: "L 3",
    isFeatured: false,
    publicVoteCountFor: 49,
    publicVoteCountAgainst: 51,
    curatorNotes: "Public result published; useful for results comparison screen.",
    createdAt: "2026-02-10T08:20:00.000Z",
    updatedAt: "2026-02-21T09:40:00.000Z"
  },
  {
    id: "proposal-climate-travel-2023",
    odaReferenceId: "ft-2023-015",
    officialTitle: "Forslag til lov om begrænsning af indenrigsflyvninger",
    aiSummary:
      "Forslaget lægger op til at reducere indenrigsflyvninger til fordel for jernbaner og nattog samt tilknyttede kompensationsordninger.",
    status: "archived",
    scheduledVoteDate: "2025-11-15T14:00:00.000Z",
    actualVoteDate: "2025-11-15T15:25:00.000Z",
    parliamentarySession: "2024-2025",
    proposalNumber: "L 97",
    isFeatured: false,
    publicVoteCountFor: 33,
    publicVoteCountAgainst: 67,
    curatorNotes: "Archived historical example.",
    createdAt: "2025-11-01T09:00:00.000Z",
    updatedAt: "2025-12-01T11:00:00.000Z"
  },
  {
    id: "proposal-tax-reform-2024",
    odaReferenceId: "ft-2024-003",
    officialTitle: "Forslag til lov om ændring af skattefradrag for lavindkomstfamilier",
    aiSummary:
      "Forslaget målretter skattefradrag mod lavindkomstfamilier med børn og finansieres gennem en justering af erhvervsfradrag.",
    status: "draft",
    scheduledVoteDate: "2026-04-02T09:30:00.000Z",
    actualVoteDate: null,
    parliamentarySession: "2025-2026",
    proposalNumber: "L 31",
    isFeatured: false,
    publicVoteCountFor: 52,
    publicVoteCountAgainst: 48,
    curatorNotes: "Draft placeholder from the ODA import pipeline.",
    createdAt: "2026-03-17T06:50:00.000Z",
    updatedAt: "2026-03-18T16:25:00.000Z"
  }
] as const;

export const aiSummaries: AISummary[] = proposals.map((proposal, index) => ({
  id: `ai-summary-${index + 1}`,
  proposalId: proposal.id,
  summaryText: proposal.aiSummary,
  modelVersion: "gpt-5.4-mini",
  generatedAt: proposal.updatedAt,
  regeneratedCount: index % 2,
  language: "da"
}));

export const mediaCitations: MediaCitation[] = [
  {
    id: "media-1",
    proposalId: "proposal-climate-tax-2024",
    sourceName: "Politiken",
    sourceUrl: "https://politiken.dk/klima/",
    quoteText: "Industrien advarer mod markante omkostninger, mens grønne organisationer kalder forslaget nødvendigt.",
    stance: "neutral",
    publicationDate: "2026-03-16T08:00:00.000Z",
    addedBy: "system"
  },
  {
    id: "media-2",
    proposalId: "proposal-climate-tax-2024",
    sourceName: "Berlingske",
    sourceUrl: "https://berlingske.dk/erhverv/",
    quoteText: "Virksomheder frygter færre investeringer, hvis afgiften hæves for hurtigt.",
    stance: "against",
    publicationDate: "2026-03-15T12:30:00.000Z",
    addedBy: "system"
  },
  {
    id: "media-3",
    proposalId: "proposal-health-digital-2024",
    sourceName: "DR Nyheder",
    sourceUrl: "https://dr.dk/nyheder/",
    quoteText: "Patientorganisationer ser flere fordele end risici, hvis sikkerheden følger med.",
    stance: "for",
    publicationDate: "2026-03-14T09:15:00.000Z",
    addedBy: "system"
  },
  {
    id: "media-4",
    proposalId: "proposal-rent-control-2023",
    sourceName: "Jyllands-Posten",
    sourceUrl: "https://jyllands-posten.dk/debat/",
    quoteText: "Økonomer er delte om, hvorvidt reguleringen vil dæmpe eller forværre boligmarkedet.",
    stance: "neutral",
    publicationDate: "2026-02-19T07:45:00.000Z",
    addedBy: "system"
  }
] as const;

export const mps: MP[] = [
  {
    id: "mp-mette-frederiksen",
    odaPersonId: "oda-person-001",
    firstName: "Mette",
    lastName: "Frederiksen",
    party: "Socialdemokratiet",
    constituencyId: "constituency-copenhagen-east",
    photoUrl: "/images/mp-mette-frederiksen.jpg",
    isActive: true,
    electedDate: "2019-06-05T00:00:00.000Z",
    email: "mette.frederiksen@ft.dk"
  },
  {
    id: "mp-pia-olsen-dyhr",
    odaPersonId: "oda-person-002",
    firstName: "Pia",
    lastName: "Olsen Dyhr",
    party: "Socialistisk Folkeparti",
    constituencyId: "constituency-copenhagen-west",
    photoUrl: "/images/mp-pia-olsen-dyhr.jpg",
    isActive: true,
    electedDate: "2015-06-18T00:00:00.000Z",
    email: "pia.olsen.dyhr@ft.dk"
  },
  {
    id: "mp-troels-lund-poulsen",
    odaPersonId: "oda-person-003",
    firstName: "Troels",
    lastName: "Lund Poulsen",
    party: "Venstre",
    constituencyId: "constituency-funen",
    photoUrl: "/images/mp-troels-lund-poulsen.jpg",
    isActive: true,
    electedDate: "2019-06-05T00:00:00.000Z",
    email: "troels.lund.poulsen@ft.dk"
  },
  {
    id: "mp-morten-messerschmidt",
    odaPersonId: "oda-person-004",
    firstName: "Morten",
    lastName: "Messerschmidt",
    party: "Dansk Folkeparti",
    constituencyId: "constituency-zealand",
    photoUrl: "/images/mp-morten-messerschmidt.jpg",
    isActive: true,
    electedDate: "2022-11-01T00:00:00.000Z",
    email: "morten.messerschmidt@ft.dk"
  },
  {
    id: "mp-emilie-engel",
    odaPersonId: "oda-person-005",
    firstName: "Emilie",
    lastName: "Engel",
    party: "Radikale Venstre",
    constituencyId: "constituency-jutland-south",
    photoUrl: "/images/mp-emilie-engel.jpg",
    isActive: true,
    electedDate: "2022-11-01T00:00:00.000Z",
    email: "emilie.engel@ft.dk"
  },
  {
    id: "mp-anne-birgitte",
    odaPersonId: "oda-person-006",
    firstName: "Anne",
    lastName: "Birgitte",
    party: "Alternativet",
    constituencyId: "constituency-jutland-north",
    photoUrl: "/images/mp-anne-birgitte.jpg",
    isActive: true,
    electedDate: "2022-11-01T00:00:00.000Z",
    email: "anne.birgitte@ft.dk"
  }
] as const;

export const parliamentaryVoteResults: ParliamentaryVoteResult[] = [
  {
    id: "vote-result-rent-control",
    proposalId: "proposal-rent-control-2023",
    totalFor: 96,
    totalAgainst: 83,
    totalAbstain: 9,
    totalAbsent: 12,
    result: "passed",
    importedAt: "2026-02-20T12:20:00.000Z"
  },
  {
    id: "vote-result-climate-travel",
    proposalId: "proposal-climate-travel-2023",
    totalFor: 78,
    totalAgainst: 91,
    totalAbstain: 8,
    totalAbsent: 23,
    result: "rejected",
    importedAt: "2025-11-15T15:35:00.000Z"
  }
] as const;

export const mpVotes: MPVote[] = [
  {
    id: "mpvote-1",
    proposalId: "proposal-rent-control-2023",
    mpId: "mp-mette-frederiksen",
    parliamentaryVoteResultId: "vote-result-rent-control",
    voteChoice: "for",
    odaVoteId: "oda-vote-1001"
  },
  {
    id: "mpvote-2",
    proposalId: "proposal-rent-control-2023",
    mpId: "mp-pia-olsen-dyhr",
    parliamentaryVoteResultId: "vote-result-rent-control",
    voteChoice: "for",
    odaVoteId: "oda-vote-1002"
  },
  {
    id: "mpvote-3",
    proposalId: "proposal-rent-control-2023",
    mpId: "mp-troels-lund-poulsen",
    parliamentaryVoteResultId: "vote-result-rent-control",
    voteChoice: "against",
    odaVoteId: "oda-vote-1003"
  },
  {
    id: "mpvote-4",
    proposalId: "proposal-climate-travel-2023",
    mpId: "mp-morten-messerschmidt",
    parliamentaryVoteResultId: "vote-result-climate-travel",
    voteChoice: "against",
    odaVoteId: "oda-vote-2001"
  }
] as const;

export const verifiedUsers: VerifiedUser[] = [
  {
    id: "verified-user-1",
    email: "eva@example.com",
    emailVerified: true,
    constituencyId: "constituency-copenhagen-east",
    createdAt: "2026-03-01T10:00:00.000Z",
    isVerifiedVoter: false
  }
] as const;

export const userVotes: UserVote[] = [
  {
    id: "user-vote-1",
    proposalId: "proposal-climate-tax-2024",
    sessionFingerprint: "session-9f2f0d",
    verifiedUserId: null,
    voteChoice: "for",
    constituencyId: "constituency-copenhagen-east",
    timestamp: "2026-03-18T18:00:00.000Z",
    source: "mobile_web"
  },
  {
    id: "user-vote-2",
    proposalId: "proposal-rent-control-2023",
    sessionFingerprint: "session-9f2f0d",
    verifiedUserId: null,
    voteChoice: "against",
    constituencyId: "constituency-copenhagen-east",
    timestamp: "2026-02-19T20:15:00.000Z",
    source: "mobile_web"
  }
] as const;

export const userSessions: UserSession[] = [
  {
    id: "session-1",
    fingerprint: "session-9f2f0d",
    createdAt: "2026-02-19T19:55:00.000Z",
    lastActive: "2026-03-18T18:00:00.000Z",
    constituencyId: "constituency-copenhagen-east",
    voteCount: 2
  }
] as const;
