# Tokens-First Authority UI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the UI foundation upgrade by expanding tokens, applying global authority typography, and normalizing responsive spacing/styling without changing runtime behavior.

**Architecture:** Keep existing App Router page structure and component boundaries. Centralize the visual system in `app/globals.css` + `config/theme.ts`, then migrate page/component styles to token-driven rules. Preserve APIs, analytics events, and route behavior.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, ESLint, Prettier.

---

### Task 1: Global Typography And Theme Contract

**Files:**

- Modify: `app/layout.tsx`
- Modify: `config/theme.ts`

**Step 1: Add heading/body font setup in layout**

- Replace single-font setup with `Archivo` + `Space_Grotesk` from `next/font/google`.
- Apply body font class to `body`.
- Expose heading font through CSS custom property (for example `--font-heading`).

**Step 2: Expand theme token object**

- Add surface colors, primary aliases, spacing scale, radius scale, shadow values, and layout max widths in `config/theme.ts`.

**Step 3: Bind new theme values to CSS custom properties**

- Update `style` object in `app/layout.tsx` so the new theme values are exported as CSS vars.

**Step 4: Verify no TypeScript regressions**

- Run: `npm run lint`
- Expected: pass with no new lint/type errors.

**Step 5: Commit**

- Run: `git add app/layout.tsx config/theme.ts && git commit -m "feat: add global authority typography and theme token contract"`

### Task 2: Token Expansion In Global Styles

**Files:**

- Modify: `app/globals.css`

**Step 1: Define complete `:root` token scale**

- Add/normalize tokens from design:
  - spacing (`--space-1` through `--space-24`)
  - radii (`--radius-sm`, `--radius-md`, `--radius-lg`)
  - shadows (`--shadow-sm`, `--shadow-md`)
  - layout widths (`--layout-container-max`, `--layout-reading-max`)
  - color roles (`--color-surface-1`, `--color-surface-2`, primary aliases)

**Step 2: Migrate shared primitives to token usage**

- Update `.container`, `.page`, `.card`, `.button-link`, `.button-link-secondary`, `.lead`, form controls, and navigation styles to remove hardcoded spacing/color values where practical.

**Step 3: Enforce heading typography globally**

- Add heading selectors (`h1`-`h6`) to use `--font-heading` while body text stays on Space Grotesk.

**Step 4: Verify formatting/linting**

- Run: `npm run format && npm run lint`
- Expected: pass with formatted CSS and no lint regressions.

**Step 5: Commit**

- Run: `git add app/globals.css && git commit -m "refactor: expand global design tokens and shared UI primitives"`

### Task 3: Home Hero And Proof Bar Spec Alignment

**Files:**

- Modify: `app/page.tsx`
- Modify: `components/proof-bar.tsx`
- Modify: `app/globals.css`

**Step 1: Update home markup only where needed for token-driven rules**

- Keep existing content and CTA behavior.
- Add/adjust class names to support exact spacing rules from planning doc.

**Step 2: Align hero spacing and layout**

- Implement required rhythm:
  - eyebrow -> h1: 16px
  - h1 -> paragraph: 24px
  - paragraph -> CTA row: 32px
  - hero top padding 96px desktop / 64px mobile
  - reading width 720px max

**Step 3: Align proof bar visual hierarchy**

- Ensure 4/2/1 responsive columns.
- Set value text to 32px / 700.
- Use surface-2 background treatment while preserving copy.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Expected: pass with no regressions.

**Step 5: Commit**

- Run: `git add app/page.tsx components/proof-bar.tsx app/globals.css && git commit -m "feat: align home hero and proof bar with authority UI spec"`

### Task 4: Cross-Page Token Consistency Pass

**Files:**

- Modify: `app/services/page.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/speaking/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/feedback/page.tsx`
- Modify: `app/globals.css`

**Step 1: Remove inline spacing styles and use utility classes**

- In `app/speaking/page.tsx`, replace inline `style={{ marginTop: ... }}` usage with semantic class names.

**Step 2: Normalize section spacing and card rhythm**

- Update page headers, grid gaps, and block spacing to use token scale.
- Keep existing content, links, and component behaviors unchanged.

**Step 3: Ensure forms use shared tokenized controls**

- Confirm wizard and feedback selector continue to work with standardized control sizing/radius/focus styles.

**Step 4: Verify**

- Run: `npm run lint && npm run build`
- Expected: pass.

**Step 5: Commit**

- Run: `git add app/services/page.tsx app/work/page.tsx app/speaking/page.tsx app/contact/page.tsx app/feedback/page.tsx app/globals.css && git commit -m "refactor: apply tokenized spacing and responsive consistency across core pages"`

### Task 5: Final Quality Gate And Manual Validation

**Files:**

- Verify all files touched in Tasks 1-4
- Modify if needed: `docs/plans/2026-02-20-tokens-first-authority-ui-design.md`

**Step 1: Run full repo quality gate**

- Run: `npm run lint && npm run format && npm run build`
- Expected: all pass.

**Step 2: Manual route checks**

- Validate: `/`, `/articles`, `/sessions`, `/speaking`, `/services`, `/work`, `/feedback`, `/contact`
- Confirm:
  - global typography is active
  - hero/proof bar spacing matches approved design
  - no horizontal overflow at 375/768/1024/1440

**Step 3: Document any final deviations**

- If any planned spec was intentionally adjusted, append a short “Implementation Notes” section to the design doc.

**Step 4: Commit final fixes (only if needed)**

- Run: `git add -A && git commit -m "chore: final UI verification and polish"` (if required)
