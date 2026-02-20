Obiettivo chiaro: **posizionarti come senior engineer autorevole che risolve problemi complessi** → e trasformare quell’autorevolezza in richieste qualificate.

---

# 1️⃣ Strategic Positioning (prima di toccare il design)

## Posizionamento definitivo (da mettere ovunque)

**Core statement (base):**

> I help product teams build scalable Angular applications with solid architecture and measurable performance improvements.

### Problema che risolve

Oggi parli di te.
Devi parlare del risultato che generi.

### Cambio concreto

Sostituisci la bio come apertura della home con:

- Outcome
- Target
- Specializzazione
- Prova sociale immediata

### Outcome atteso

- Maggiore chiarezza
- +30–50% probabilità che il visitatore capisca se è nel posto giusto

---

# 2️⃣ Redesign in Modular Features (autoconsistenti)

Ogni blocco è indipendente.

---

# FEATURE 1 — Home Hero Refactor

## Problema

La home è un “About me”. Non è una landing.

## Cambio preciso

### Struttura hero (desktop)

```
[ Eyebrow ]
Senior Angular Consultant & Speaker

[ H1 – 56px ]
I help product teams build scalable Angular applications
without performance regressions.

[ Paragraph – max 80ch ]
Architecture, performance optimization and design systems
for teams that need reliability at scale.

[ CTA Row ]
[ Primary: Book a call ]
[ Secondary: See selected work ]
```

### Layout rules

- Max width text: 720px
- Padding top: 96px desktop / 64px mobile
- Spacing:

  - Eyebrow → H1: 16px
  - H1 → paragraph: 24px
  - Paragraph → CTA row: 32px

- CTA gap: 16px

### CTA styling

Primary:

- bg: `--primary`
- radius: 12px
- padding: 14px 20px
- font-weight: 600

Secondary:

- border 1px `--border`
- bg transparent

### Expected outcome

Chiarezza immediata → meno rimbalzi → più scroll.

---

# FEATURE 2 — Proof Bar (Trust Booster)

## Problema

La credibilità è sparsa.

## Cambio

Subito sotto hero:

```
10+ Years Experience
30+ Conference Talks
Angular Architecture Specialist
Community Lead
```

### Design

- 4 colonne desktop / 2 tablet / stack mobile
- Background: `--surface-2`
- Padding: 32px vertical
- Numeri: 32px weight 700
- Label: 14px muted

### Outcome

Autorità immediata senza leggere tutta la pagina.

---

# FEATURE 3 — Services Page (Nuova)

## Problema

Il form oggi è la pagina servizi. È sbagliato.

## Struttura pagina `/services`

### Hero

```
I work with teams that need clarity, speed and long-term maintainability.
```

Primary CTA: Book intro call

---

## Sezioni servizi (ognuna blocco indipendente)

### 1. Angular Architecture Consulting

- Problem
- What I deliver
- Typical timeline
- CTA

### 2. Performance Audit

- Includes:

  - bundle analysis
  - hydration strategy
  - SSR review
  - CWV metrics

- Output:

  - technical report
  - prioritized roadmap

### 3. Design System Engineering

### 4. Mentoring / Technical Coaching

### Layout

- Ogni servizio:

  - H2 40px
  - Paragraph
  - Bullet list
  - CTA inline

- Spacing tra servizi: 96px

### Outcome

Vendita prima del form → richieste più qualificate.

---

# FEATURE 4 — Work Page (Nuova, fondamentale)

## Problema

Non dimostri impatto reale.

## Struttura `/work`

### Grid

- 2 colonne desktop
- Card min height 280px
- Padding 24px

---

## Template Case Study

### Hero

Titolo progetto
Meta:

- Role
- Duration
- Stack

---

### Sections

1. Context
2. Problem
3. What I did
4. Results (con metriche)

---

### Results formatting

- Bullet bold numbers
- Esempio:

  - Reduced bundle size by 38%
  - Improved LCP from 3.8s to 1.9s
  - Standardized 42 components

---

### Outcome

Trasformi competenza astratta in valore concreto.

---

# FEATURE 5 — Speaking Refactor

## Problema

È un archivio, non una pagina che vende.

## Cambio

Rinomina `/sessions` → `/speaking`

### Nuove sezioni

1. Hero + availability badge
2. Signature Talks (3)
3. Invite me block
4. Media (video/slides)
5. Event timeline collapsible per year

### Badge

- Talk / Workshop / MC
- Pill radius 999px

### Outcome

Più inviti da organizer.

---

# FEATURE 6 — Contact Wizard Refactor

## Problema

Mega form = attrito.

## Nuovo flow

Step 1: What do you need?

- Consulting
- Performance audit
- Design system
- Mentoring
- Talk/workshop

Step 2: Basic info (max 4 campi)

Step 3: Optional details

Step 4: Calendar embed

### Design

- Progress indicator top
- Max width 640px
- Field spacing 24px
- Label 14px muted
- Input padding 12px 14px
- Radius 12px

### Outcome

Completion rate ↑

---

# FEATURE 7 — Design Tokens (Ready for Dev)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;

--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.1);
```

---

# FEATURE 8 — Responsive Rules

Breakpoints:

- 640
- 768
- 1024
- 1280

Grid:

- Mobile: 4 columns
- Tablet: 6
- Desktop: 12

Content max-width: 1120px
Reading max-width: 720px

---

# FEATURE 9 — SEO Structural Upgrade

Per ogni pagina:

- Un solo H1
- Meta description manuale
- Schema.org:

  - Person
  - Event (speaking)
  - Article
  - ProfessionalService

---

# FEATURE 10 — Conversion Funnel System

## Nuovo funnel

1. Discover (Articles / Speaking / LinkedIn)
2. Authority (Home + Work + Services)
3. Trust (Case studies + Talks + Proof bar)
4. Contact (Wizard + Calendar)

---

# Prioritized Dev Roadmap (per il tuo dev)

### Phase 1 — High ROI (2–3 settimane)

1. Hero refactor
2. Proof bar
3. Services page
4. Work page base (anche 2 case study)
5. Sticky CTA header

### Phase 2 — Conversion Optimization

6. Contact wizard
7. Speaking refactor
8. Media integration
9. Testimonials module

### Phase 3 — Authority Layer

10. SEO schema
11. Series grouping articles
12. Lead capture (optional)

---

# Metriche da monitorare

- CTR “Book a call”
- Form completion rate
- Scroll depth Home
- % utenti che visitano Work prima del Contact
- Inbound qualità (manual tagging)

---

## Technical Plan

- `docs/technical-plan-2026-02-20.md`

## Implementation Progress

- [x] FEATURE 1 - Home Hero Refactor
- [x] FEATURE 2 - Proof Bar
- [x] FEATURE 3 - Services page (`/services`)
- [x] FEATURE 4 - Work page (`/work`)
- [x] FEATURE 5 - Speaking refactor (`/speaking` + `/sessions` handoff)
- [x] FEATURE 6 - Contact wizard (multi-step)
- [ ] FEATURE 7 - Design tokens expansion
- [ ] FEATURE 8 - Responsive grid system extension
- [x] FEATURE 9 - SEO structured data
- [x] FEATURE 10 - Conversion funnel instrumentation
