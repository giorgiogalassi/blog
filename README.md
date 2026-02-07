# Personal Blog (Next.js)

A minimal personal blog with orange accents, built with Next.js App Router and data-driven external article redirects.

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

- `/` home page
- `/about` profile with photo slot and social links
- `/articles` external article list
- `/go/[slug]` redirect endpoint for external resources
- `/contact` collaboration form for freelance inquiries

## External Article Redirects

External articles are defined in `data/articles.ts`.

- `/articles` reads `externalArticles` to render the list.
- `/go/[slug]` reads `articleRedirectMap` and redirects to the external URL.

To add a new article, add a new item to `externalArticles`.

## Future Extensions (not implemented yet)

- tags/categories
- local or remote search
- RSS feed
- analytics
- newsletter
- MDX content
