# Personal Blog (Next.js)

A minimal personal blog with orange accents, built with Next.js App Router and data-driven external article redirects.

## Stack and Versions

- Next.js 15.1.6
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
- `npm run lint` – run linting
- `npm run build` – create production build
- `npm run format` – check formatting
- `npm run format:write` – fix formatting

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
