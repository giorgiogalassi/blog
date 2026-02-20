# Blog Stabilization And Growth Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stabilize current routes and external integrations, then add the minimum architecture needed for future features (search, RSS, analytics) without breaking current pages.

**Architecture:** Keep App Router pages as the UI boundary and move reusable logic into `lib/` and `config/`. Add typed domain utilities for external content (Medium/Sessionize), then add defensive error paths in routes and APIs. Ship in small vertical slices with lint/build checks after each task.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, ESLint, Prettier.

---

## Context Snapshot

- `docs/planning.md` is currently empty, so this plan is based on current repository state.
- README route list is out of sync with code (for example `/about` and `/go/[slug]` are documented but not present).
- External data dependencies (`lib/medium.ts`, `lib/sessionize.ts`) need explicit resilience and fallbacks.

### Task 1: Align Route Documentation With Reality

**Files:**

- Modify: `README.md`
- Verify: `app/page.tsx`, `app/articles/page.tsx`, `app/sessions/page.tsx`, `app/feedback/page.tsx`, `app/contact/page.tsx`

**Step 1: Update route list and architecture notes**

- Replace stale route references (`/about`, `/go/[slug]`, `data/articles.ts`) with current routes and actual data sources.

**Step 2: Add a short "source of truth" section**

- State that route truth lives in `app/` and integration truth in `lib/`.

**Step 3: Run formatting and lint checks**

- Run: `npm run format && npm run lint`
- Expected: no formatting/lint issues in docs or code references.

**Step 4: Commit**

- Run: `git add README.md && git commit -m "docs: align README routes and data sources"`

### Task 2: Harden Medium Integration For Failures

**Files:**

- Modify: `lib/medium.ts`
- Modify: `app/articles/page.tsx`

**Step 1: Write failing behavior checks (manual-first)**

- Define expected behavior: page renders with fallback note when Medium API fails or times out.

**Step 2: Implement resilient fetch in `lib/medium.ts`**

- Wrap `fetch` and JSON parsing in `try/catch`.
- Return `[]` on failure and keep `revalidate` caching.
- Add a request timeout via `AbortSignal.timeout(...)` to avoid hanging responses.

**Step 3: Ensure UI-level fallback remains explicit**

- Keep/adjust empty-state note in `app/articles/page.tsx` so failure is user-visible but non-breaking.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Expected: successful build with no TypeScript or lint regressions.

**Step 5: Commit**

- Run: `git add lib/medium.ts app/articles/page.tsx && git commit -m "feat: harden Medium integration fallback path"`

### Task 3: Harden Sessionize Integration And Year Selection

**Files:**

- Modify: `lib/sessionize.ts`
- Modify: `app/feedback/page.tsx`
- Modify: `app/sessions/page.tsx`

**Step 1: Define fallback contract**

- If Sessionize fails: sessions/events arrays are empty, pages still render, and UX shows clear no-data messaging.

**Step 2: Normalize invalid dates and optional fields in mapper layer**

- Guard date parsing and avoid `Invalid Date` display values.
- Keep mapping defaults centralized in `lib/sessionize.ts`.

**Step 3: Fix year selection edge case in feedback**

- If no available years are returned, default selector and queries should still work for current year without crash.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Manual check: `/sessions` and `/feedback` load with no runtime errors.

**Step 5: Commit**

- Run: `git add lib/sessionize.ts app/feedback/page.tsx app/sessions/page.tsx && git commit -m "fix: make Sessionize pages resilient to empty or invalid data"`

### Task 4: Consolidate API Validation And Anti-Spam Utilities

**Files:**

- Create: `lib/api/validation.ts`
- Create: `lib/api/rate-limit.ts`
- Modify: `app/api/contact/route.ts`
- Modify: `app/api/feedback/route.ts`

**Step 1: Extract shared helpers**

- Move email validation and reusable sanitization helpers to `lib/api/validation.ts`.
- Move in-memory limiter to `lib/api/rate-limit.ts` with a reusable function signature.

**Step 2: Reuse helpers in both API routes**

- Keep route-specific validation rules local.
- Keep honeypot behavior consistent across both endpoints.

**Step 3: Add structured log shape**

- Standardize keys for success/failure logs (`route`, `event`, `requestId`, `timestamp`) without logging sensitive form content.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Manual check: submit valid and invalid payloads to both routes.

**Step 5: Commit**

- Run: `git add lib/api/validation.ts lib/api/rate-limit.ts app/api/contact/route.ts app/api/feedback/route.ts && git commit -m "refactor: share API validation and rate-limit utilities"`

### Task 5: Add Environment Contract Documentation

**Files:**

- Create: `.env.example`
- Modify: `README.md`

**Step 1: Add required/optional env vars**

- Include: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`.
- Add comments for local development behavior when vars are missing.

**Step 2: Document API behavior per environment**

- Explain current no-op email behavior when keys are absent.

**Step 3: Verify**

- Run: `npm run format && npm run lint`

**Step 4: Commit**

- Run: `git add .env.example README.md && git commit -m "docs: add environment variable contract"`

### Task 6: Final Verification Gate

**Files:**

- Verify all modified files from Tasks 1-5

**Step 1: Run full quality gate**

- Run: `npm run lint && npm run format && npm run build`
- Expected: all commands pass.

**Step 2: Manual route checks**

- Validate: `/`, `/articles`, `/sessions`, `/feedback`, `/contact`.

**Step 3: Prepare rollout notes**

- Add a short "what changed" section to PR body with fallback behaviors and known limits.

**Step 4: Commit (if any final fixes)**

- Run: `git add -A && git commit -m "chore: final verification fixes"` (only if needed)
