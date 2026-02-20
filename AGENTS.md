# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js App Router project.

- `app/`: routes, pages, and API handlers (`app/api/contact/route.ts`, `app/api/feedback/route.ts`)
- `components/`: shared UI components (for example `components/header.tsx`)
- `lib/`: external data/service utilities (`lib/medium.ts`, `lib/sessionize.ts`)
- `config/`: site and theme configuration (`config/site.ts`, `config/theme.ts`)
- `public/`: static assets (logos, profile image, social icons)

Keep route-specific UI close to its route folder in `app/`, and move reusable logic/components to `components/` or `lib/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies
- `npm run dev`: start local development server
- `npm run build`: create production build
- `npm run start`: run production build locally
- `npm run lint`: run ESLint across the repo
- `npm run format`: check Prettier formatting
- `npm run format:write`: apply Prettier formatting fixes

Before opening a PR, run: `npm run lint && npm run format && npm run build`.

## Coding Style & Naming Conventions

- Language: TypeScript + React function components.
- Formatting: Prettier (`singleQuote: true`, `semi: true`, `trailingComma: none`, `printWidth: 100`).
- Linting: ESLint with `eslint-config-next/core-web-vitals`.
- Indentation: follow existing style (2 spaces in `.tsx` files).
- Naming:
  - Components: `PascalCase` (for example `ContactForm`)
  - Variables/functions: `camelCase`
  - Route folders: lowercase (`app/contact`, `app/feedback`)
  - Config/constants files: short, descriptive lowercase names.

## Testing Guidelines

There is currently no dedicated automated test framework configured.

- Minimum quality gate: `npm run lint`, `npm run build`, and manual route checks.
- For UI or form changes, verify `/`, `/articles`, `/sessions`, `/feedback`, and `/contact`.
- If you add tests, colocate them near the feature (`*.test.ts` or `*.test.tsx`) and document the run command in `package.json`.

## Commit & Pull Request Guidelines

- Use short, imperative commit messages (examples from history: `Add feedback page...`, `Refine micro-interactions...`).
- Optional Conventional Commit prefix is acceptable when useful (for example `feat:`).
- Keep commits focused and scoped to one change.
- PRs should include:
  - clear summary of behavior changes
  - linked issue/task (if available)
  - screenshots or short recordings for UI updates
  - verification notes with commands run.
