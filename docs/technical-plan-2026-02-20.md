# Website Repositioning Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the current personal site into a conversion-focused consultant website aligned with the strategy in `docs/planning.md`.

**Architecture:** Keep Next.js App Router structure, add new conversion routes (`/services`, `/work`, `/speaking`), refactor home/contact for clearer funnel stages, and isolate reusable UI blocks into shared components. Apply incremental delivery by phase (high ROI first) with strict lint/build checks after each task.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS modules/global CSS, ESLint, Prettier.

---

## Scope Baseline

- Input strategy: `docs/planning.md`
- Existing key routes: `/`, `/articles`, `/sessions`, `/feedback`, `/contact`
- Target funnel: Discover -> Authority -> Trust -> Contact

## Status

- [x] Phase 1 completed (Tasks 1-5)
- [x] Phase 2 completed (Tasks 6-7)
- [x] Phase 3 completed (Tasks 8-9)
- [x] Final verification gate completed (Task 10)

## Phase 1 (High ROI, start here)

### Task 1: Home Hero Refactor

Status: Done

**Files:**

- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Step 1: Write failing UI expectation checklist**

- Expected: hero opens with positioning statement, outcome-oriented H1, 2 CTAs.

**Step 2: Implement new hero structure**

- Add eyebrow text, new H1, concise value paragraph, CTA row (`Book a call`, `See selected work`).

**Step 3: Implement responsive spacing/typography tokens**

- Add/adjust spacing and type scale rules for desktop/mobile.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Manual: check `/` on mobile + desktop.

### Task 2: Proof Bar Component

Status: Done

**Files:**

- Create: `components/proof-bar.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Step 1: Add reusable proof bar component**

- 4 proof items (years, talks, specialization, community/leadership).

**Step 2: Insert below hero on home**

- Place directly after hero, before long-form profile content.

**Step 3: Add responsive layout styles**

- 4 columns desktop, 2 tablet, stacked mobile.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Manual: validate spacing/readability.

### Task 3: Add `/services` Page

Status: Done

**Files:**

- Create: `app/services/page.tsx`
- Modify: `config/site.ts`
- Modify: `app/globals.css`

**Step 1: Create services page route**

- Include hero and 4 service sections: Architecture, Performance Audit, Design System, Mentoring.

**Step 2: Add navigation item**

- Add `Services` in `siteConfig.nav`.

**Step 3: Add section-level reusable CSS classes**

- Standardize service blocks with heading, bullets, and CTA zone.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Manual: check `/services` and nav.

### Task 4: Add `/work` Page + Case Study Template

Status: Done

**Files:**

- Create: `app/work/page.tsx`
- Create: `lib/case-studies.ts`
- Modify: `config/site.ts`
- Modify: `app/globals.css`

**Step 1: Add typed case-study data source**

- Start with 2 placeholder-but-realistic case studies in `lib/case-studies.ts`.

**Step 2: Build work grid page**

- Render cards with Role, Duration, Stack, and measurable outcomes.

**Step 3: Add nav entry**

- Add `Work` to `siteConfig.nav`.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Manual: confirm `/work` funnel flow from home CTA.

### Task 5: Header CTA Optimization

Status: Done

**Files:**

- Modify: `components/header.tsx`
- Modify: `app/globals.css`

**Step 1: Add persistent CTA in header**

- Add primary action linking to contact/calendly.

**Step 2: Keep mobile-safe behavior**

- Ensure CTA does not break navigation wrapping.

**Step 3: Verify**

- Run: `npm run lint && npm run build`
- Manual: test header across breakpoints.

## Phase 2 (Conversion Optimization)

### Task 6: Contact Wizard Refactor

Status: Done

**Files:**

- Modify: `app/contact/contact-form.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/globals.css`
- Optional modify: `app/api/contact/route.ts`

**Step 1: Convert single long form into multi-step wizard**

- Steps: service type -> basic info -> optional details -> confirmation/booking prompt.

**Step 2: Preserve existing validation + anti-spam**

- Keep honeypot and server-side validation behavior.

**Step 3: Add progress indicator**

- Display step count and clear next/back actions.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Manual: submit at least one valid request and one invalid request.

### Task 7: Speaking Route Refactor (`/sessions` -> `/speaking`)

Status: Done

**Files:**

- Create: `app/speaking/page.tsx`
- Modify: `app/sessions/page.tsx` (temporary redirect/deprecation note)
- Modify: `config/site.ts`
- Modify: `app/globals.css`

**Step 1: Create speaking-first layout**

- Signature talks, invite block, media links, timeline by year.

**Step 2: Keep Sessionize integration intact**

- Reuse `lib/sessionize.ts`.

**Step 3: Update navigation and preserve backward compatibility**

- Add `Speaking`; either keep `/sessions` page with link notice or redirect later.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Manual: check `/speaking` and `/sessions`.

## Phase 3 (Authority + SEO Layer)

### Task 8: SEO Metadata and Structured Data

Status: Done

**Files:**

- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/speaking/page.tsx`
- Optional create: `lib/seo.ts`

**Step 1: Normalize metadata per core route**

- Unique title/description for Home, Services, Work, Speaking, Contact.

**Step 2: Add JSON-LD**

- Add Person + ProfessionalService globally, Event on speaking where relevant.

**Step 3: Verify**

- Run: `npm run lint && npm run build`
- Manual: inspect page source for JSON-LD presence.

### Task 9: Funnel Tracking Hooks

Status: Done

**Files:**

- Modify: `app/page.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/contact/page.tsx`
- Optional create: `lib/analytics.ts`

**Step 1: Define lightweight event map**

- Track hero CTA clicks, work-page visits, contact starts/completions.

**Step 2: Implement abstraction layer**

- No vendor lock-in; console/no-op fallback for local env.

**Step 3: Verify**

- Run: `npm run lint && npm run build`
- Manual: confirm events fire in browser console or provider debug mode.

## Final Verification Gate

### Task 10: End-to-End Validation

Status: Done

**Files:**

- Verify all modified files

**Step 1: Run full quality gate**

- Run: `npm run format && npm run lint && npm run build`

**Step 2: Manual route pass**

- Validate: `/`, `/articles`, `/services`, `/work`, `/speaking`, `/feedback`, `/contact`.

**Step 3: Update planning index**

- Add link from `docs/planning.md` to this technical plan.
