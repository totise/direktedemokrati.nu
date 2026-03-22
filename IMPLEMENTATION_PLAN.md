# Implementation Plan — direktedemokrati.nu

## User Context

- **Project type**: Standalone greenfield app
- **Technical level**: Non-technical user — sensible defaults chosen throughout
- **Domain**: Danish civic participation — anonymous predictive voting on parliamentary proposals

## Agreed Stack

| Layer         | Choice                                 |
| ------------- | -------------------------------------- |
| Framework     | Next.js 14+ (App Router)               |
| Language      | TypeScript (strict)                    |
| Styling       | Tailwind CSS 3                         |
| Fonts         | Nunito + Space Grotesk via `next/font` |
| Icons         | lucide-react                           |
| State (local) | React state + localStorage             |
| Backend / DB  | Supabase (deferred — mock data first)  |
| Auth          | Anonymous sessions (localStorage ID)   |
| Hosting       | Vercel                                 |
| PWA           | next-pwa (service worker, manifest)    |
| Linting       | ESLint (Next.js defaults) + Prettier   |
| Testing       | Vitest + React Testing Library         |

## Scope

**Phase 1 (current)**: Frontend with realistic mock data, all 9 screens fully
interactive, client-side session and vote storage in localStorage.

**Phase 2 (future)**: Supabase integration — database, real-time vote counts,
ODA API sync, server-side session verification.

---

## Planned File Structure

```
direktedemokrati.nu/
├── public/
│   ├── manifest.json
│   └── images/              # MP portraits copied from screens/images/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout: fonts, Tailwind, bottom nav, header
│   │   ├── page.tsx         # Redirect to /vote
│   │   ├── vote/
│   │   │   └── page.tsx     # VoteFeedScreen
│   │   ├── proposal/
│   │   │   └── [id]/
│   │   │       └── page.tsx # ProposalDetailScreen
│   │   ├── results/
│   │   │   ├── page.tsx     # UserVotesHistoryScreen (default tab)
│   │   │   └── archive/
│   │   │       └── page.tsx # ArchiveScreen
│   │   ├── results/[id]/
│   │   │   └── page.tsx     # ResultsViewScreen
│   │   ├── mps/
│   │   │   ├── page.tsx     # MPListScreen
│   │   │   └── [id]/
│   │   │       └── page.tsx # MPProfileScreen
│   │   ├── find-constituency/
│   │   │   └── page.tsx     # FindConstituencyScreen
│   │   └── about/
│   │       └── page.tsx     # AboutAndMethodologyScreen
│   ├── components/
│   │   ├── layout/
│   │   │   ├── bottom-nav.tsx
│   │   │   ├── header.tsx
│   │   │   └── hamburger-menu.tsx
│   │   ├── proposal-card.tsx
│   │   ├── mp-avatar.tsx
│   │   ├── vote-bar.tsx
│   │   ├── party-chip.tsx
│   │   ├── postcode-modal.tsx
│   │   ├── media-citation-sheet.tsx
│   │   ├── share-modal.tsx
│   │   ├── empty-state.tsx
│   │   └── error-message.tsx
│   ├── hooks/
│   │   ├── use-session.ts
│   │   ├── use-votes.ts
│   │   ├── use-proposals.ts
│   │   └── use-constituency.ts
│   ├── lib/
│   │   ├── api.ts           # Data fetching wrapper (mock for Phase 1)
│   │   ├── mock-data.ts     # Realistic Danish mock proposals, MPs, votes
│   │   ├── constants.ts     # Color tokens, config values
│   │   └── utils.ts         # formatCountdown, getConstituencyByPostcode, etc.
│   └── types/
│       └── index.ts         # Proposal, MP, UserVote, etc. — mirrors SPEC.md
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── IMPLEMENTATION_PLAN.md
```

---

## Implementation Tasks

### 0. Project Scaffolding

- [x] 0.1 Initialize Next.js project with TypeScript, Tailwind CSS, App Router
- [x] 0.2 Configure `tailwind.config.ts` with custom color palette, fonts, shadows from design mockups
- [x] 0.3 Load Nunito and Space Grotesk via `next/font/google` in root layout
- [x] 0.4 Set up ESLint + Prettier with project conventions
- [x] 0.5 Configure path aliases (`@/components`, `@/lib`, `@/hooks`, `@/types`)
- [x] 0.6 Create TypeScript interfaces in `src/types/index.ts` mirroring the SPEC.md data model (Proposal, UserVote, MP, Constituency, ParliamentaryVoteResult, MPVote, MediaCitation, AISummary, UserSession)
- [x] 0.7 Create `src/lib/constants.ts` with color tokens and config values
- [x] 0.8 Create `src/lib/utils.ts` with helper functions (formatCountdown, formatPercentage, etc.)
- [x] 0.9 Create `src/lib/mock-data.ts` with realistic Danish mock data (5–8 proposals, 20+ MPs, constituencies, media citations, vote results)
- [x] 0.10 Copy MP portrait images to `public/images/`

### 1. User Journey: Anonymous Citizen — Discovering and Casting a Predictive Vote

#### 1.1 Shell Layout & Navigation

- [x] 1.1.1 Build root layout (`src/app/layout.tsx`) with warm background, font classes, viewport meta
- [x] 1.1.2 Build bottom tab navigation (`src/components/layout/bottom-nav.tsx`) — Vote, Results, MPs tabs with active state
- [x] 1.1.3 Build top header (`src/components/layout/header.tsx`) — logo, notification indicator, hamburger menu
- [x] 1.1.4 Build hamburger menu drawer (`src/components/layout/hamburger-menu.tsx`) — links to About, Find Constituency
- [x] 1.1.5 Implement anonymous session hook (`src/hooks/use-session.ts`) — generate/persist session ID in localStorage

#### 1.2 Vote Feed Screen

- [x] 1.2.1 Build `src/app/vote/page.tsx` — VoteFeedScreen with sticky header and segmented control (Current Votes / Closing Soon)
- [x] 1.2.2 Build `src/components/proposal-card.tsx` — reusable card with title, summary teaser, countdown, vote distribution bar, "Vote Now" action
- [x] 1.2.3 Build `src/components/vote-bar.tsx` — horizontal For/Against percentage bar
- [x] 1.2.4 Implement tab filtering logic (Current Votes vs Closing Soon)
- [x] 1.2.5 Implement empty state with "How It Works" educational card
- [x] 1.2.6 Wire proposal card tap to navigate to `/proposal/[id]`
- [x] 1.2.7 Implement redirect from `/` to `/vote`

#### 1.3 Proposal Detail Screen

- [x] 1.3.1 Build `src/app/proposal/[id]/page.tsx` — ProposalDetailScreen with header, status badge, countdown
- [x] 1.3.2 Build expandable AI Summary section (collapsed teaser → full text)
- [x] 1.3.3 Build Media Perspectives section with citation cards (source name, stance indicator, quote excerpt)
- [x] 1.3.4 Build `src/components/media-citation-sheet.tsx` — bottom sheet with full quote, date, external link
- [x] 1.3.5 Build "Who Represents Me?" collapsible section with postcode entry
- [x] 1.3.6 Build `src/components/postcode-modal.tsx` — bottom sheet for 4-digit postcode input with validation
- [x] 1.3.7 Build voting controls — For/Against buttons with anonymous vote privacy notice
- [x] 1.3.8 Implement vote submission logic — store vote in localStorage via `use-votes` hook, show confirmation state
- [x] 1.3.9 Build post-vote confirmation state — user's choice, updated stats, "Save to My Votes", "Email Receipt" buttons
- [x] 1.3.10 Build `src/components/share-modal.tsx` — share to social / copy link
- [x] 1.3.11 Build data source attribution footer ("Data from oda.ft.dk", "Summaries AI-generated")

#### 1.4 Vote Storage & Session

- [x] 1.4.1 Implement `src/hooks/use-votes.ts` — CRUD for votes in localStorage, duplicate vote prevention
- [x] 1.4.2 Implement `src/hooks/use-constituency.ts` — postcode lookup, save/load constituency preference
- [x] 1.4.3 Implement `src/hooks/use-proposals.ts` — fetch proposals from mock data, filter by status

### 2. User Journey: Citizen — Reviewing Parliamentary Results

#### 2.1 User Votes History Screen

- [x] 2.1.1 Build `src/app/results/page.tsx` — UserVotesHistoryScreen with "Your Votes" / "Archive" tab switcher
- [x] 2.1.2 Build vote history list divided into "Awaiting Result" and "Concluded" sections
- [x] 2.1.3 Each row: proposal title, user's vote badge, date, status, match/mismatch indicator for concluded items
- [x] 2.1.4 Implement empty state encouraging exploration
- [x] 2.1.5 Wire tap navigation: pending → ProposalDetail, concluded → ResultsView

#### 2.2 Results View Screen

- [x] 2.2.1 Build `src/app/results/[id]/page.tsx` — ResultsViewScreen with comparison header (Public vs Parliamentary)
- [x] 2.2.2 Build comparison visualization: public For/Against percentages vs parliamentary outcome (Passed/Failed with counts)
- [x] 2.2.3 Build `src/components/mp-avatar.tsx` — circular avatar with party-colored border, tooltip, badges
- [x] 2.2.4 Build three-column MP vote grid (For / Abstain / Against) with MP avatars
- [x] 2.2.5 Build MP name search bar filtering the grid
- [x] 2.2.6 Build `src/components/party-chip.tsx` — horizontal scrollable party filter chips
- [x] 2.2.7 Implement "Your Representative" badge on local MP avatars (from saved constituency)
- [x] 2.2.8 Implement agreement indicator overlay when user voted same as MP
- [x] 2.2.9 Wire MP avatar tap to navigate to `/mps/[id]`

#### 2.3 Archive Screen

- [x] 2.3.1 Build `src/app/results/archive/page.tsx` — ArchiveScreen with concluded proposals grouped by session
- [x] 2.3.2 Each entry: title, date, Passed/Failed badge, public alignment indicator
- [x] 2.3.3 Implement outcome filter (Passed / Failed)
- [x] 2.3.4 Implement keyword search
- [x] 2.3.5 Wire tap navigation to ResultsView

### 3. User Journey: Citizen — Exploring MP Profiles

#### 3.1 MP List Screen

- [x] 3.1.1 Build `src/app/mps/page.tsx` — MPListScreen with search bar and party filter chips
- [x] 3.1.2 Build alphabetical MP card list — photo, name, party badge, constituency
- [x] 3.1.3 Implement real-time name search filtering
- [x] 3.1.4 Implement party chip filtering
- [x] 3.1.5 Wire MP card tap to navigate to `/mps/[id]`

#### 3.2 MP Profile Screen

- [x] 3.2.1 Build `src/app/mps/[id]/page.tsx` — MPProfileScreen with photo header, party badge, constituency, status
- [x] 3.2.2 Build voting statistics section — agreement with public, participation rate, party loyalty
- [x] 3.2.3 Build chronological voting history list — proposal title, date, MP's vote, public result, match indicator
- [x] 3.2.4 Build comparison banner — "You agreed with [MP] on X of Y votes" (from localStorage)
- [x] 3.2.5 Wire proposal tap in history to ResultsView

### 4. Utility & Informational Screens

#### 4.1 Find Constituency Screen

- [ ] 4.1.1 Build `src/app/find-constituency/page.tsx` — postcode input, validation, results display
- [ ] 4.1.2 Display constituency name and list of MPs with photos/party when postcode submitted
- [ ] 4.1.3 Implement "Save as My Constituency" button persisting to localStorage
- [ ] 4.1.4 Educational text about the Danish constituency system

#### 4.2 About & Methodology Screen

- [ ] 4.2.1 Build `src/app/about/page.tsx` — mission, data sources, AI methodology, media citations policy, voting integrity
- [ ] 4.2.2 Build contact/feedback form (Name optional, Email optional, Message required)
- [ ] 4.2.3 Form submission stores locally for now (or logs to console), shows inline confirmation

### 5. Polish & PWA

- [ ] 5.1 Add PWA manifest (`public/manifest.json`) with app name, icons, theme color
- [ ] 5.2 Configure service worker via next-pwa for offline shell
- [ ] 5.3 Add viewport meta tags for mobile (status bar, safe area insets)
- [ ] 5.4 Add pull-to-refresh behavior on list views
- [ ] 5.5 Add page transition animations between screens
- [ ] 5.6 Add loading skeletons for data-fetching states
- [ ] 5.7 Test all screens at 390×844 viewport and common mobile sizes
- [ ] 5.8 Run `npm run build` and `npx tsc --noEmit` — fix any errors
- [ ] 5.9 Run `npm run lint` — fix any warnings
