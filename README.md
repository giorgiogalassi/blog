# Personal Blog (Next.js)

A minimal personal blog with orange accents, built with Next.js App Router and dynamic external data integrations.

## Stack and Versions

- Next.js 16.1.0
- React 19.0.0
- TypeScript 5.7.2
- ESLint 9 + `eslint-config-next`
- Prettier 3.4.2

## Local Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` – run development server
- `npm run lint` – run linting (ESLint CLI)
- `npm run build` – create production build
- `npm run format` – check formatting
- `npm run format:write` – fix formatting

## Next.js 16 migration notes

- Upgraded from `next@15.1.6` to `next@16.1.0` (security/deploy requirement).
- `eslint-config-next` has been aligned to `16.1.0`.
- `lint` script now uses `eslint .` directly for compatibility with Next 16 workflows.
- Dynamic route handler params remain Promise-based in `/app/go/[slug]/route.ts` to satisfy generated route type checks.
- Verify local/runtime Node.js version is compatible with Next 16 before deploy.

## Routes

- `/` profile/about page with social links
- `/articles` external article list sourced from Medium RSS
- `/sessions` sessions and events sourced from Sessionize
- `/feedback` form to collect talk feedback with year-based Sessionize sessions
- `/contact` collaboration form for freelance inquiries

## Data Sources

- Medium articles are fetched in `lib/medium.ts`.
- Session and speaking data are fetched in `lib/sessionize.ts`.
- Contact and feedback submissions are handled by API routes in `app/api/`.

## Source Of Truth

- Route structure and page ownership live in `app/`.
- External service integration logic lives in `lib/`.
- Shared site-level settings live in `config/`.

## Environment Variables

Create a local `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

- `RESEND_API_KEY`: required to send emails from `/api/contact`.
- `CONTACT_FROM_EMAIL`: sender address used by Resend.
- `CONTACT_TO_EMAIL`: optional recipient override for contact requests.

If email environment variables are missing, contact route email sending is skipped safely in local/dev.

## Future Extensions (not implemented yet)

- tags/categories
- local or remote search
- RSS feed
- analytics
- newsletter
- MDX content
