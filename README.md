# Personal blog (Next.js)

Blog personale minimale con accenti arancioni, App Router e gestione data-driven di articoli esterni.

## Stack e versioni

- Next.js 15.1.6
- React 19.0.0
- TypeScript 5.7.2
- ESLint 9 + `eslint-config-next`
- Prettier 3.4.2

## Avvio locale

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` – avvio in sviluppo
- `npm run lint` – linting
- `npm run build` – build produzione
- `npm run format` – controllo formatting
- `npm run format:write` – fix formatting

## Redirect articoli esterni

Gli articoli stanno in `data/articles.ts`.

- La pagina `/articles` usa `externalArticles` per la lista.
- La rotta `/go/[slug]` usa `articleRedirectMap` per reindirizzare all'URL esterno.

Per aggiungere un nuovo articolo basta aggiungere un record in `externalArticles`.

## Estensioni future (non implementate)

- tag/categorie
- ricerca locale o remota
- feed RSS
- analytics
- newsletter
- contenuti MDX
