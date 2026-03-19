# direkteedemokrati.dk - Mowgli Spec (v13)

## 

**direkteedemokrati.dk** - Empowering Danish citizens to vote directly on parliamentary proposals.

direktedemokrati.dk is a mobile-first web application that empowers Danish citizens to engage directly with their democracy by voting on major parliamentary proposals before the Folketinget makes its final decision. The platform bridges the gap between citizens and their 179 Members of Parliament by presenting AI-generated plain-language summaries of complex legal texts, alongside balanced media citations from major Danish newspapers to provide context for the debate.

Users vote anonymously without mandatory registration, lowering barriers to civic participation. Once the official parliamentary vote concludes, the platform reveals a direct comparison between the people's predictive voice and the actual voting records of individual MPs (not just party aggregates), fostering accountability and political awareness. The app sources official data from the ODA (Open Data API) at oda.ft.dk and targets mobile users who wish to stay informed and engaged while on the go.

## User Journeys

**direkteedemokrati.dk** - Empowering Danish citizens to vote directly on parliamentary proposals.

direktedemokrati.dk is a mobile-first web application that empowers Danish citizens to engage directly with their democracy by voting on major parliamentary proposals before the Folketinget makes its final decision. The platform bridges the gap between citizens and their 179 Members of Parliament by presenting AI-generated plain-language summaries of complex legal texts, alongside balanced media citations from major Danish newspapers to provide context for the debate.

Users vote anonymously without mandatory registration, lowering barriers to civic participation. Once the official parliamentary vote concludes, the platform reveals a direct comparison between the people's predictive voice and the actual voting records of individual MPs (not just party aggregates), fostering accountability and political awareness. The app sources official data from the ODA (Open Data API) at oda.ft.dk and targets mobile users who wish to stay informed and engaged while on the go.

**direkteedemokrati.dk** - Empowering Danish citizens to vote directly on parliamentary proposals.

direktedemokrati.dk is a mobile-first web application that empowers Danish citizens to engage directly with their democracy by voting on major parliamentary proposals before the Folketinget makes its final decision. The platform bridges the gap between citizens and their 179 Members of Parliament by presenting AI-generated plain-language summaries of complex legal texts, alongside balanced media citations from major Danish newspapers to provide context for the debate.

Users vote anonymously without mandatory registration, lowering barriers to civic participation. Once the official parliamentary vote concludes, the platform reveals a direct comparison between the people's predictive voice and the actual voting records of individual MPs (not just party aggregates), fostering accountability and political awareness. The app sources official data from the ODA (Open Data API) at oda.ft.dk and targets mobile users who wish to stay informed and engaged while on the go.

**direktedemokrati.nu** - Empowering Danish citizens to vote directly on parliamentary proposals.

direktedemokrati.nu is a mobile-first web application that empowers Danish citizens to engage directly with their democracy by voting on major parliamentary proposals before the Folketinget makes its final decision. The platform bridges the gap between citizens and their 179 Members of Parliament by presenting AI-generated plain-language summaries of complex legal texts, alongside balanced media citations from major Danish newspapers to provide context for the debate.

Users vote anonymously without mandatory registration, lowering barriers to civic participation. Once the official parliamentary vote concludes, the platform reveals a direct comparison between the people's predictive voice and the actual voting records of individual MPs (not just party aggregates), fostering accountability and political awareness. The app sources official data from the ODA (Open Data API) at oda.ft.dk and targets mobile users who wish to stay informed and engaged while on the go.

### 1. Anonymous Citizen: Discovering and Casting a Predictive Vote

#### 1.1. Landing and Exploration

- 1.1.2. Citizen opens direktedemokrati.nu on mobile browser
- 1.1.2. System detects no active session and creates anonymous session identifier stored locally
- 1.1.3. Citizen lands on Vote Feed showing currently open for public voting (curated selection of major proposals awaiting parliamentary vote)
- 1.1.4. Feed displays proposal cards with: official title truncated, AI-generated summary teaser, days remaining until parliamentary vote, current public vote distribution (percentage For/Against), and source tag
- 1.1.5. Citizen scrolls through featured proposals filtered by "Trending" (default) or "Closing Soon"
- 1.1.6. Citizen selects proposal to view details

#### 1.2. Understanding the Proposal

- 1.2.1. Citizen views Proposal Detail screen
- 1.2.2. System displays full AI-generated plain-language summary explaining the practical impact of the legislation
- 1.2.3. Citizen scrolls to "Media Perspectives" section showing 2-4 citations from major Danish newspapers (e.g., Politiken, Berlingske, Jyllands-Posten), tagged as "Supporting", "Opposing", or "Neutral" based on editorial stance
- 1.2.4. Citizen taps citation to expand full quote and link to original article via a bottom sheet overlay
- 1.2.5. Citizen optionally enters 4-digit postcode in "Find Your Constituency" section to identify their local MPs (stored locally for session)
- 1.2.6. System displays names and party affiliations of MPs representing the entered constituency

#### 1.3. Casting Vote

- 1.3.1. Citizen reaches voting controls at bottom of detail view
- 1.3.2. Citizen selects "For" or "Against" (binary choice, no abstention option for predictive vote to ensure clear mandate)
- 1.3.3. System validates session has not already voted on this proposal (client-side check with server verification)
- 1.3.4. System records vote with: proposal ID, session fingerprint, timestamp, vote choice, and optional constituency ID
- 1.3.5. Citizen sees immediate confirmation with preliminary public vote statistics updated in real-time
- 1.3.6. Citizen can share vote to social media (optional) with generic message "I voted on a proposal in Folketinget - see if you agree"
- 1.3.7. System offers UI options to save vote history locally or email a non-identifiable receipt

#### 1.4. Post-Vote Engagement

- 1.4.1. Citizen returns to Vote Feed
- 1.4.2. Voted proposals marked with "You Voted" indicator
- 1.4.3. Citizen navigates to "Awaiting Results" tab showing proposals they voted on that are still pending parliamentary decision
- 1.4.4. Citizen can browse "Archive" of past concluded votes

### 2. Citizen: Reviewing Parliamentary Results

#### 2.1. Discovering Concluded Votes

- 2.1.1. Citizen revisits app after parliamentary vote has occurred (passive update, no push notification per requirements)
- 2.1.2. Citizen sees visual indicator on previously voted proposals that results are available ("See how they voted")
- 2.1.3. Citizen taps proposal to enter Results View

#### 2.2. Comparing Public vs. Parliamentary Votes

- 2.2.1. System displays comparison header: Public Vote (For/Against percentages with total vote count) vs. Parliamentary Vote (For/Against/Abstain/Absent counts)
- 2.2.2. Citizen views "Individual MP Votes" section showing three-column grid layout with columns for "For", "Abstain", and "Against" votes
- 2.2.3. Each MP is represented by a circular avatar image placed in the column corresponding to their vote choice; image border color indicates party affiliation
- 2.2.4. Citizen hovers over an MP image to reveal tooltip with MP name and party
- 2.2.5. Citizen applies party filter to highlight or dim specific parties, or searches by MP name to locate specific representatives
- 2.2.6. If citizen provided constituency earlier, their local MPs are visually highlighted with a "Your Representative" indicator on their avatar
- 2.2.7. Citizen taps an MP image to view full voting history profile

#### 2.3. Exploring Historical Data

- 2.3.1. Citizen navigates to Archive tab from main navigation
- 2.3.2. Citizen views chronological list of all curated proposals that have concluded parliamentary votes
- 2.3.3. Citizen can filter by date range, policy area, or outcome
- 2.3.4. Citizen selects historical proposal to view full results with MP breakdown as in 2.2

### 3. Citizen: Exploring MP Profiles

#### 3.1. Finding an MP

- 3.1.1. Citizen navigates to "MPs" section from bottom navigation
- 3.1.2. Citizen views alphabetical list of all 179 MPs with party and constituency filters
- 3.1.3. Citizen uses search to find specific MP by name
- 3.1.4. Citizen taps MP to view Profile Detail

#### 3.2. Analyzing MP Record

- 3.2.1. System displays MP profile: photo, name, party, constituency, election year
- 3.2.2. Citizen views "Voting Record" tab showing all proposals this MP voted on via Direkedemokrati.dk platform
- 3.2.3. For each historical vote: proposal title, date, MP's vote, public vote result, agreement indicator
- 3.2.4. Citizen views "Statistics" section: agreement rate with public majority, participation rate (absence percentage), party loyalty rate
- 3.2.5. Citizen compares MP's pattern with their own voting history (if available locally)

### 4. Editorial Administrator: Curating Proposals [OUT OF SCOPE for public release]

#### 4.1. Content Management

- 4.1.1. Administrator accesses protected admin interface (separate from direktedemokrati.nu public app)
- 4.1.2. System displays queue of all incoming proposals from ODA API integration
- 4.1.3. Administrator reviews proposal metadata, full text, and parliamentary significance markers
- 4.1.4. Administrator selects proposals to feature based on criteria: major legislative impact, public controversy, significant media coverage
- 4.1.5. Administrator triggers AI summary generation for selected proposals
- 4.1.6. Administrator adds media citations manually or via assisted scraping from major Danish news sources
- 4.1.7. Administrator schedules proposal to go live on public platform with expected parliamentary vote date
- 4.1.8. Administrator publishes proposal to Vote Feed

## Data Model

### Proposal

Represents a parliamentary proposal imported from ODA and curated for public voting.

**Fields:**
* `id`: Unique identifier (UUID)
* `odaReferenceId`: String, external ID from oda.ft.dk API
* `officialTitle`: String, original legislative title from Folketinget
* `aiSummary`: Text, plain-language summary generated by AI
* `status`: Enum [`draft`, `open_for_voting`, `closed_pending_result`, `results_published`, `archived`]
* `scheduledVoteDate`: Date, expected parliamentary vote date
* `actualVoteDate`: Date, when vote actually occurred (nullable)
* `parliamentarySession`: String, e.g., "2023-2024"
* `proposalNumber`: String, official proposal identifier
* `isFeatured`: Boolean, whether currently highlighted on homepage
* `curatorNotes`: Text, internal editorial notes
* `createdAt`: Timestamp
* `updatedAt`: Timestamp

**Relationships:**
* Has many `UserVote` entities
* Has many `MediaCitation` entities
* Has one `ParliamentaryVoteResult` entity (aggregated)
* Has many `MPVote` entities (individual MP votes)

### UserVote

Represents a predictive vote cast by an anonymous or verified user.

**Fields:**
* `id`: Unique identifier
* `proposalId`: FK Proposal
* `sessionFingerprint`: String, anonymous session identifier (hash of IP + user agent + timestamp salt for low-friction tracking)
* `verifiedUserId`: FK VerifiedUser, nullable for anonymous votes (future-proofing)
* `voteChoice`: Enum [`for`, `against`]
* `constituencyId`: FK Constituency, optional, based on user-provided postcode
* `timestamp`: DateTime when vote was cast
* `source`: Enum [`mobile_web`, `desktop_web`]

**Relationships:**
* Belongs to one `Proposal`
* Belongs to one `VerifiedUser` (nullable)

### VerifiedUser [Future Scope]

For potential verified accounts while maintaining low-friction option.

**Fields:**
* `id`: Unique identifier
* `email`: String, unique, verified
* `emailVerified`: Boolean
* `constituencyId`: FK Constituency, preferred constituency
* `createdAt`: Timestamp
* `isVerifiedVoter`: Boolean, whether identity verification completed (Civil Registration System integration)

**Relationships:**
* Has many `UserVote` entities
* Belongs to one `Constituency`

### MP (Member of Parliament)

Represents a Folketinget member.

**Fields:**
* `id`: Unique identifier
* `odaPersonId`: String, external ID from ODA API
* `firstName`: String
* `lastName`: String
* `party`: String, current party affiliation (e.g., "Socialdemokratiet", "Venstre")
* `constituencyId`: FK Constituency, primary constituency
* `photoUrl`: String, URL to official portrait
* `isActive`: Boolean, currently serving
* `electedDate`: Date
* `email`: String, public contact

**Relationships:**
* Belongs to one `Constituency`
* Has many `MPVote` entities

### Constituency

Represents a Danish electoral constituency (Valgkreds).

**Fields:**
* `id`: Unique identifier
* `name`: String, e.g., "Københavns Omegns Storkreds"
* `regionCode`: String, identifier for region
* `postcodeRanges`: JSON array of postcode ranges served by this constituency (for lookup)
* `seatCount`: Integer, number of MPs elected from this constituency

**Relationships:**
* Has many `MP` entities
* Has many `UserVote` entities (via constituency selection)

### ParliamentaryVoteResult

Aggregated official result from Folketinget.

**Fields:**
* `id`: Unique identifier
* `proposalId`: FK Proposal
* `totalFor`: Integer, number of MPs voting for
* `totalAgainst`: Integer, number of MPs voting against
* `totalAbstain`: Integer, number abstaining
* `totalAbsent`: Integer, number not present
* `result`: Enum [`passed`, `rejected`, `tied`]
* `importedAt`: Timestamp

**Relationships:**
* Belongs to one `Proposal`
* Has many `MPVote` entities

### MPVote

Individual MP's vote on a specific proposal.

**Fields:**
* `id`: Unique identifier
* `proposalId`: FK Proposal
* `mpId`: FK MP
* `parliamentaryVoteResultId`: FK ParliamentaryVoteResult
* `voteChoice`: Enum [`for`, `against`, `abstain`, `absent`]
* `odaVoteId`: String, external reference from ODA

**Relationships:**
* Belongs to one `Proposal`
* Belongs to one `MP`
* Belongs to one `ParliamentaryVoteResult`

### MediaCitation

Quotes from Danish media providing context on proposals.

**Fields:**
* `id`: Unique identifier
* `proposalId`: FK Proposal
* `sourceName`: String, e.g., "Politiken", "Berlingske", "Jyllands-Posten"
* `sourceUrl`: String, URL to article
* `quoteText`: Text, excerpt from article
* `stance`: Enum [`for`, `against`, `neutral`], editorial classification
* `publicationDate`: Date
* `addedBy`: String, editor identifier or "system"

**Relationships:**
* Belongs to one `Proposal`

### AISummary

Cache/storage for AI-generated content.

**Fields:**
* `id`: Unique identifier
* `proposalId`: FK Proposal
* `summaryText`: Text, the generated plain-language summary
* `modelVersion`: String, AI model identifier
* `generatedAt`: Timestamp
* `regeneratedCount`: Integer, number of times regenerated
* `language`: String, "da" for Danish

**Relationships:**
* Belongs to one `Proposal`

### UserSession

Tracking for anonymous voting integrity.

**Fields:**
* `id`: Unique identifier
* `fingerprint`: String, hashed identifier
* `createdAt`: Timestamp
* `lastActive`: Timestamp
* `constituencyId`: FK Constituency, optional preference
* `voteCount`: Integer, number of votes cast

**Relationships:**
* Has many `UserVote` entities
* Belongs to one `Constituency`

## Frontend

#### Mobile Navigation Structure

* Bottom tab bar with three primary destinations: "Vote" (active proposals), "Results" (user votes  archive), "MPs" (representative directory)
* Top header with direktedemokrati.nu logo and hamburger menu for "About", "Methodology", "Find My Constituency"
* Persistent "Your Votes" floating action button or top-right indicator showing count of open proposals user has voted on; tapping this button navigates directly to the UserVotesHistory view within the Results section.
* Pull-to-refresh on all list views

#### Voting Controls

* Binary choice interface with clear "For" (Ja) and "Against" (Nej) options
* Disabled state after voting with visual confirmation
* Warning modal if user attempts to leave page before submitting vote

#### Data Source Attribution

* Footer on Proposal Detail indicating "Data from oda.ft.dk" and "Summaries AI-generated"
* Media citations clearly labeled with source name and date

### VoteFeedScreen

Summary: The main landing screen displaying a feed of open parliamentary proposals available for public predictive voting.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | Displays the list of proposal cards under the "Current Votes" tab. The feed contains several active proposals with titles, summaries, countdowns, and vote distribution bars.
ID: closingSoon | Closing Soon Tab | The "Closing Soon" tab is active in the segmented control. The feed displays proposals filtered by those with the nearest upcoming parliamentary vote dates.
ID: emptyState | Empty State | No current votes are available. The screen displays a friendly empty state message alongside the "How It Works" educational card.

#### Contents

Primary screen displaying curated proposals open for predictive voting.

**Content Hierarchy:**
* Sticky header with "Direkedemokrati" branding and filter toggle
* Segmented control or tab switcher: "Current Votes" (default) vs "Closing Soon"
* Scrollable feed of Proposal Cards
* Each Proposal Card contains: truncated official title, AI summary teaser (2 lines), visual countdown indicator (days until parliamentary vote), horizontal bar chart showing current public For/Against distribution, and "Vote Now" action
* Empty state message when no current votes available, accompanied by a "How It Works" educational card for first-time visitors

**Interactions:**
* Tap Proposal Card navigates to ProposalDetail
* Pull down triggers refresh of proposal list
* Filter toggle switches between "All Major Proposals" and "Closing This Week"
* Tap "How It Works" educational card navigates to AboutAndMethodology screen

### ProposalDetailScreen

Summary: Comprehensive view of a specific proposal including AI summary, media context, constituency lookup, and the voting interface.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | Shows the proposal header, collapsed AI summary teaser, media citations list, collapsed constituency section, and the active voting controls (For/Against buttons) at the bottom.
ID: summaryExpanded | Summary Expanded | The AI summary section is expanded to show the full plain-language explanation text.
ID: constituencyFound | Constituency Found | The "Who Represents Me?" section is expanded or populated, displaying the names and photos of the local MPs corresponding to a previously entered postcode.
ID: postcodeModal | Postcode Input Modal Open | A bottom sheet or modal overlay is visible, prompting the user to enter a 4-digit Danish postcode to find their representatives.
ID: mediaSheet | Media Citation Sheet Open | A bottom sheet overlay is visible displaying the full details of a specific media citation, including the full quote and a link to the original article.
ID: voted | Vote Confirmation | The voting controls are replaced by a post-vote confirmation message showing the user's choice ("For" or "Against"), updated public stats, and buttons to "Save to My Votes" or "Email Receipt".
ID: shareModal | Share Modal Open | A share modal is displayed, offering options to share the vote to social media or copy a link.

#### Contents

Detailed view of a single legislative proposal with context and voting interface.

**Content Hierarchy:**
* Header section: Official proposal number and title, parliamentary status badge (e.g., "1st Reading", "Final Vote"), scheduled vote date countdown
* AI Summary section: Expandable plain-language explanation with "Read Full Summary" expansion for longer text
* Media Perspectives section: Horizontal scrollable cards or stacked list of Media Citations showing newspaper name, stance color indicator, quote excerpt, and "Read Article" link
* Constituency Input: Collapsible section "Who Represents Me?" with postcode entry field and submit button, displaying matched MPs below
* Voting Section: Fixed bottom bar or prominent card with "How would you vote?" prompt, two large touch targets for "For" and "Against", and privacy notice text ("Anonymous vote")
* Post-vote state: Replaces voting controls with confirmation message showing user's choice, updated statistics, action buttons to "Save to My Votes" and "Email Receipt", and a "View Results" button (disabled/greyed if parliament hasn't voted yet, or enabled if results available)

**Modal Overlays:**
* **Postcode Input Modal**: Full-screen or bottom-sheet input for 4-digit Danish postcode with validation and "Find My MPs" confirmation
* **Media Citation Sheet**: Bottom sheet overlay appearing when a Media Citation is tapped, displaying the full quote, publication date, and a button to "Read Full Article" (opens external link).
* **Share Modal**: Native share sheet trigger or custom modal with social sharing options and copy-link functionality

### ResultsViewScreen

Summary: Results screen comparing the public predictive vote with the actual parliamentary vote, featuring a detailed breakdown of individual MP votes.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | Displays the comparison header graphics and the full grid of MP avatars under "For", "Abstain", and "Against" columns. No filters are applied.
ID: partyFilter | Party Filter Active | A specific party chip (e.g., "Socialdemokratiet") is selected in the filter bar. The MP grid is visually updated to highlight or dim MPs based on the selected party.
ID: searchActive | MP Search Active | The search bar is focused and contains a query. The MP grid displays results filtered by the MP's name.
ID: localReps | Local Representatives Highlighted | The "Your Representative" badge is visible on the avatars of the MPs belonging to the user's saved constituency.

#### Contents

Comparison screen showing public vote against individual MP votes, displayed after parliamentary vote concludes.

**Content Hierarchy:**
* Summary Header: Large comparison visualization showing Public Vote percentage (For vs Against) alongside Parliamentary Vote outcome (Passed/Failed with vote counts)
* "The People's Voice vs. Folketinget" comparison graphics
* Individual MP Votes Section:
  * Search bar for MP name
  * Horizontal scroll of party filter chips (All, Socialdemokratiet, Venstre, etc.)
  * Three-column grid layout: "For", "Abstain", "Against" columns
  * Each MP displayed as circular avatar image with border color matching party affiliation
  * Hover tooltip on MP image shows name and party
  * Agreement indicator overlay on avatar if user voted and MP matched user's choice
  * "Your Representative" badge on avatars of user's local MPs if constituency provided
* Statistics Footer: Total public votes cast, participation metrics

**Interactions:**
* Tap MP image navigates to MPProfile
* Toggle filters update list in real-time
* Scroll loads remaining MPs (pagination or virtual scroll)

### MPListScreen

Summary: A browsable directory of all 179 Members of Parliament with search and filtering capabilities.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | Displays the search bar, filter controls (showing "All" parties), and the full alphabetical list of MP cards.
ID: searchActive | Search Active | The search bar contains text, and the list below is filtered to show only MPs matching the search query.
ID: partyFiltered | Party Filtered | A specific party chip is selected (e.g., "Venstre"). The list displays only MPs belonging to that party.

#### Contents

Directory screen for browsing all Members of Parliament.

**Content Hierarchy:**
* Search bar at top for filtering MP by name
* Filter controls: Horizontal scrollable chips for Party affiliation; dropdown or toggle for Constituency
* Alphabetical list of MP Cards representing all 179 active members
* Each MP Card contains: thumbnail photo, full name, party badge, constituency name

**Interactions:**
* Typing in search bar filters the list by name in real-time
* Selecting a party chip filters the list to show only MPs from that party
* Tapping an MP card navigates to MPProfile for that specific representative

### MPProfileScreen

Summary: Detailed profile view for a specific MP, including their stats, voting history, and how they compare to the user's votes.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | Shows the MP's photo, details, voting statistics, and chronological voting history. The comparison banner is not visible (user hasn't voted on shared proposals).
ID: comparisonBanner | Comparison Banner Visible | The "You agreed with [MP Name]..." banner is visible at the top, indicating the user has voted on some of the same proposals.

#### Contents

Individual Member of Parliament detailed view.

**Content Hierarchy:**
* Header: Large photo, full name, party badge, constituency name, contact/email link
* Current Status: "Active Member since [Year]" or "Former Member"
* Voting Statistics: Agreement with Public Majority percentage, Participation Rate percentage, Party Loyalty percentage
* Voting History: Chronological list of proposals voted on via platform showing: proposal title, date, MP's vote (For/Against), Public vote result, match/mismatch indicator
* Comparison Banner (if user has voted on same proposals): "You agreed with [MP Name] on X of Y votes"

**Interactions:**
* Tap proposal in history navigates to that proposal's ResultsView
* Back button returns to previous screen (ResultsView or MPList)

### FindConstituencyScreen

Summary: A utility tool allowing users to find their local representatives by entering their postcode.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | The initial state with the postcode input field empty and educational text visible.
ID: results | Results Displayed | A valid postcode has been entered and submitted. The screen displays the constituency name and the list of representing MPs with a "Save as My Constituency" option.

#### Contents

Utility screen for users to identify their representatives.

**Content Hierarchy:**
* Input field for 4-digit Danish postcode with validation
* Submit action
* Results display: Constituency name, list of MPs representing that constituency with photos and party affiliations
* Option to "Save as My Constituency" for session persistence
* Educational text explaining the Danish constituency system briefly

**Interactions:**
* Postcode entry filters valid Danish postcodes in real-time
* Submit triggers lookup against Constituency database
* Save preference stores in session/local storage

### ArchiveScreen

Summary: Historical archive of all concluded parliamentary votes, grouped by session and filterable by outcome.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | The "Archive" tab is active in the top switcher. The screen displays the chronological list of concluded proposals grouped by session.
ID: filterActive | Filter Active | An outcome filter (e.g., "Passed") is applied, narrowing down the list of historical proposals.

#### Contents

Historical record of all concluded votes. This screen is accessible via a tab switcher within the "Results" section of the app.

**Content Hierarchy:**
* Tab switcher at top: "Your Votes" (default) and "Archive".
* Chronological list grouped by parliamentary session (e.g., "2023-2024 Session")
* Each entry shows: Proposal title, date of parliamentary vote, result (Passed/Failed), public vote alignment (Did public agree with outcome?), visual outcome indicator
* Search functionality by keyword
* Filter by outcome (Passed/Failed) or policy area (if tagged)

**Interactions:**
* Tap entry navigates to ResultsView for that proposal
* Scroll triggers infinite load or pagination
* Tap "Your Votes" tab switcher returns to UserVotesHistory

### AboutAndMethodologyScreen

Summary: Informational screen detailing the platform's mission, data sources, methodology for AI summaries, and voting integrity.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | Displays all informational sections (Mission, Data, AI, Media, Integrity) and the contact/feedback form at the bottom.

#### Contents

Informational screen explaining the platform.

**Content Hierarchy:**
* Mission statement about direct democracy and transparency
* Data sources section: Explanation of ODA (oda.ft.dk) integration
* AI Summaries explanation: How summaries are generated, disclaimer about potential inaccuracies
* Media Citations methodology: How sources are selected, balance policy
* Voting integrity: Explanation of anonymous voting system, session tracking, and future verification options
* Contact and feedback form: Simple form containing fields for Name (optional), Email (optional), and Message (required).

**Interactions:**
* External links open in browser
* Feedback form submits to backend endpoint (submission confirmation displayed inline)

### UserVotesHistoryScreen

Summary: Personal history of the user's votes, categorized by those awaiting results and those that are concluded.

Preview size: 390x844

#### Preview states

State | Name | Description
------|------|--------------------------------
ID: default | Default | The "Your Votes" tab is active. The list displays proposals the user has voted on, split into "Awaiting Result" and "Concluded" sections.
ID: emptyState | Empty State | The user has not voted on any proposals yet. An empty state message encourages them to explore current votes.

#### Contents

Personal record of user's engagement (stored locally). This screen serves as the default view when the "Results" tab is tapped in the bottom navigation.

**Content Hierarchy:**
* Tab switcher at top: "Your Votes" (default) and "Archive".
* List of all proposals user has voted on, divided into "Awaiting Result" and "Concluded"
* Each row: Proposal title, user's vote (For/Against), date voted, current status
* For concluded items: Result indicator showing if user's vote matched final parliamentary outcome
* Empty state encouraging exploration of current votes

**Interactions:**
* Tap item navigates to ProposalDetail (if pending) or ResultsView (if concluded)
* Swipe option to remove item from local history (not delete vote, just hide from view)
* Tap "Archive" tab switcher navigates to Archive view