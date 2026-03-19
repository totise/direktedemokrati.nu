# AI Agent Instructions

Your task is to implement **direktedemokrati.nu** — a mobile-first Danish civic
participation web app. It was specified and designed in Mowgli (https://mowgli.ai).
This directory contains the extracted Mowgli export.

## Package Contents

- `SPEC.md`: Complete application specification — user journeys, data model, and
  screen-level behavior. **This is the source of truth for behavior and requirements.**
- `screens/*.tsx`: Static React + Tailwind design mockups, one per screen. No
  real functionality. Use these as **strict visual reference** — copy classes,
  colors, and layout exactly, but wire up real data and state.
- `screens/images/`: MP portrait JPGs used in the mockups.

## How to Proceed

### If `IMPLEMENTATION_PLAN.md` does not exist

Interview the user before writing any code. Cover:

1. **Context** — standalone greenfield app, or integrating into an existing codebase?
2. **Stack preferences** — suggest Next.js (App Router) + Supabase + Vercel as a
   sensible default for a non-technical user; confirm or adjust based on their input.
3. **Scope** — frontend only, or also backend, database, auth, and deployment?
4. **Mobile target** — this is designed mobile-first; confirm React PWA (recommended)
   vs Expo vs native.
5. **Conventions** — any specific patterns, linters, or tooling they require?

Use question tools if available. After gathering requirements, create
`IMPLEMENTATION_PLAN.md` containing:
- User context and agreed stack
- Detailed implementation tasks organized by user journey (from `SPEC.md`)
- Checkboxes for each task to track progress
- Planned file/directory structure

### If `IMPLEMENTATION_PLAN.md` exists

1. Read the plan and identify the next uncompleted task.
2. Implement that chunk of work (refer to `SPEC.md` for behavior, `screens/*.tsx`
   for visual design).
3. Mark the task complete with `[x]`.
4. Move to the next task.

---

## Build / Lint / Test Commands

These apply once the project is scaffolded (expected stack: Next.js + TypeScript).
Update this section with real commands after `IMPLEMENTATION_PLAN.md` is created.

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build (must pass before committing)
npm run build

# Type-check without emitting
npx tsc --noEmit

# Lint
npm run lint

# Run all tests
npm test

# Run a single test file
npx vitest run src/path/to/file.test.ts

# Run tests matching a name pattern
npx vitest run -t "pattern"
```

If the project uses Jest instead of Vitest:
```bash
npx jest src/path/to/file.test.ts
npx jest --testNamePattern="pattern"
```

Always run `npm run build` and `npx tsc --noEmit` after significant changes to
confirm zero type errors and a clean build.

---

## Code Style Guidelines

### TypeScript

- Enable `strict: true` in `tsconfig.json` — no implicit `any`.
- Explicit return types on all exported functions and React components.
- Prefer `interface` over `type` for object shapes; use `type` for unions/aliases.
- Use `as const` for fixed union values in mock/seed data.
- Never use `// @ts-ignore` or `// @ts-expect-error` without an explanatory comment.

### Imports

- Maintain this order, separated by blank lines:
  1. React and Next.js internals (`react`, `next/*`)
  2. Third-party packages (`lucide-react`, etc.)
  3. Internal absolute imports (`@/components/...`, `@/lib/...`)
  4. Relative imports (`./foo`, `../bar`)
- Use namespace import for lucide-react in mockups: `import * as Icons from "lucide-react"`.
  In real components, prefer named imports: `import { Vote, Bell } from "lucide-react"`.
- No default exports for utilities or hooks — use named exports.
- Page/screen components use default export (required by Next.js routing).

### Component Structure

- One component per file; file name matches component name in kebab-case
  (e.g., `vote-feed-screen.tsx` exports `VoteFeedScreen`).
- Functional components only — no class components.
- Internal render helpers as named `const` functions inside the component body:
  ```tsx
  const renderHeader = () => (...)
  const renderProposalCard = (title: string, ...) => (...)
  ```
- Extract to a separate file only when a sub-component is reused across screens.
- Props interface named `{ComponentName}Props`, defined in the same file.

### Naming Conventions

- **Components**: PascalCase — `VoteFeedScreen`, `ProposalCard`
- **Hooks**: camelCase prefixed with `use` — `useProposals`, `useSession`
- **Utilities / helpers**: camelCase — `formatCountdown`, `getConstituencyByPostcode`
- **Files**: kebab-case — `proposal-detail-screen.tsx`, `use-session.ts`
- **Constants**: SCREAMING_SNAKE_CASE — `MAX_POSTCODE_LENGTH`
- **Enums / union values**: lowercase strings matching the data model —
  `"for"`, `"against"`, `"abstain"`, `"absent"`, `"open_for_voting"`, etc.

### Styling — Tailwind CSS

- Tailwind utility classes only. No CSS modules, no CSS-in-JS, no `<style>` tags.
- Use inline `style={{}}` **only** for values that cannot be expressed statically,
  e.g. dynamic widths from data: `style={{ width: \`${forPct}%\` }}`.
- Replicate the design mockup color palette exactly:

  | Token              | Value       | Usage                        |
  |--------------------|-------------|------------------------------|
  | Primary purple     | `#5B4FCF`   | Buttons, active states, icons |
  | Primary dark       | `#3D329F`   | Hover on primary             |
  | Background warm    | `#FFFAF5`   | Page/app background          |
  | Surface white      | `#FFFFFF`   | Cards                        |
  | Text dark          | `#2C2C2C`   | Headings, body text          |
  | Text muted         | `#6B7280`   | Secondary text, labels       |
  | Border / surface   | `#E5E7EB`   | Dividers, inactive tabs      |
  | Surface subtle     | `#F3F4F6`   | Hover backgrounds            |
  | Vote For (green)   | `#22A06B`   | "For" vote indicator         |
  | Vote Against (red) | `#E34935`   | "Against" vote indicator     |
  | Urgent / accent    | `#FF6B35`   | Countdown, notifications     |

- Card shadow: `shadow-[0_4px_16px_rgba(0,0,0,0.04)]`
- Card border radius: `rounded-2xl`
- Fonts (load via next/font or Google Fonts):
  - `font-['Nunito']` — headings and body text
  - `font-['Space_Grotesk']` — proposal numbers, monospaced figures

### Error Handling

- Use `try/catch` around all `async` data-fetching functions; surface errors via
  a typed `{ data, error }` return shape rather than throwing.
- Display user-facing errors inline (not `alert()`). Use a consistent error
  component or Tailwind-styled message block.
- Log unexpected errors with `console.error` in development; integrate a proper
  error reporter (e.g., Sentry) once the stack is confirmed.
- Never swallow errors silently.

### Data Fetching

- Co-locate server data fetching with the page (Next.js Server Components or
  `getServerSideProps`/`getStaticProps`) where possible.
- Client-side fetching via a thin `lib/api.ts` wrapper — no raw `fetch` calls
  scattered across components.
- Mirror the data model from `SPEC.md` exactly in TypeScript interfaces under
  `src/types/`.

---

## Important Notes

- The `screens/*.tsx` mockups use a single `state: string` prop to switch between
  visual states. When implementing, replace this with real React state and props.
- The admin interface (user journey 4) is **out of scope** for the public release.
- Anonymous voting is a core requirement — no forced registration.
- The ODA API (`oda.ft.dk`) is the upstream data source for proposals and MP votes.
- All user-facing copy is in Danish. Keep string literals in Danish in components.
- Session/vote history is stored client-side (localStorage) unless the agreed stack
  includes a backend session store.
