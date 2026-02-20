# Tokens-First Authority UI Design

Date: 2026-02-20  
Scope: Global UI consistency upgrade with token expansion and typography alignment.

## Objective

Improve the current blog UI status by completing the missing foundational work from `docs/planning.md`:

- Feature 7: design token expansion
- Feature 8: responsive grid system extension

Direction approved: **Conservative Authority** with global typography adaptation.

## Selected Approach

Recommended and approved approach:

1. Keep current warm/orange brand accents.
2. Expand and normalize design tokens across the project.
3. Apply `Archivo` (headings) + `Space Grotesk` (body) globally.
4. Avoid behavior/data flow changes.

## Architecture And Tokens

- Expand `:root` in `app/globals.css` into a full token system:
  - Colors:
    - `--color-bg`
    - `--color-surface-1`
    - `--color-surface-2`
    - `--color-fg`
    - `--color-muted`
    - `--color-border`
    - `--color-primary`
    - `--color-primary-strong`
    - `--color-primary-soft`
  - Spacing scale:
    - `--space-1` to `--space-24`
  - Radius scale:
    - `--radius-sm`, `--radius-md`, `--radius-lg`
  - Shadows:
    - `--shadow-sm`, `--shadow-md`
  - Layout tokens:
    - `--layout-container-max: 1120px`
    - `--layout-reading-max: 720px`
- Align `config/theme.ts` with key token values for consistency.
- Apply fonts globally in `app/layout.tsx` via Next font loading for performance and fallback safety.

## Component UI Rules

- Home hero:
  - Eyebrow -> H1: `16px`
  - H1 -> paragraph: `24px`
  - Paragraph -> CTA row: `32px`
  - Text max-width: `720px`
  - Top rhythm: `96px` desktop, `64px` mobile
- Proof bar:
  - Surface treatment using `--color-surface-2`
  - Number emphasis at `32px`, weight `700`
- Buttons:
  - Primary: radius `12px`, padding `14px 20px`, weight `600`
  - Secondary: bordered, low-emphasis surface style
- Cards/forms:
  - Replace ad-hoc spacing and radius values with tokenized values
  - Keep consistent focus and hover states

## Data Flow And Behavior Safety

- No Medium/Sessionize/API contract changes.
- Preserve:
  - existing routes and navigation behavior
  - analytics events/payloads
  - contact wizard flow and payload structure
  - `/sessions` and `/speaking` behavior
- Limit updates to visual styling and minimal class/markup alignment.

## Error Handling And Accessibility

- Expected runtime risk is low (style/theming pass).
- Font fallback remains available if remote font loading fails.
- Accessibility constraints:
  - Keep one `h1` per page.
  - Keep visible focus states.
  - Preserve `prefers-reduced-motion`.
  - Validate contrast for text and action elements.
- Responsive validation targets:
  - 375px, 768px, 1024px, 1440px

## Verification And Delivery

- Commands:
  - `npm run lint`
  - `npm run format`
  - `npm run build`
- Manual routes:
  - `/`
  - `/articles`
  - `/sessions`
  - `/speaking`
  - `/services`
  - `/work`
  - `/feedback`
  - `/contact`
- Non-goals:
  - No route additions/removals
  - No API/data schema changes
