# Portfolio Hub — AJ Miller T. Perez

A single-page, tabbed portfolio that combines AJ Miller T. Perez's professional
profile with original music, Telegram bots, and live web applications. Built with
React 18 + Vite 5, reusing the dark violet/cyan design system from the AJ
professional site.

## Tabs

Tab order: **Career · Application · Telegram Bot · Music** (Career is the default).

- **Career** — full résumé content: hero, about, experience timeline, skills,
  selected impact, recognition, education, and contact. Years of experience are
  computed dynamically from December 2011.
- **Application** — 7 live web apps (retirement, behavioral-wealth, tax-efficiency,
  job matching) with "Open ↗" links.
- **Telegram Bot** — 5 bots (1 Live, 4 in active development) with status badges
  and `t.me` links.
- **Music** — 47 original AI-assisted songs and 16 playlists published on
  [Suno](https://suno.com/@millertperez), each linking to its track/playlist.

Tab switching uses `useState`, scrolls to top on change, and re-runs the
IntersectionObserver fade-up reveal for each tab's content.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy

Configured for Vercel (`vercel.json`): framework `vite`, build `npm run build`,
output `dist`, SPA rewrite to `/index.html`.

## Stack

React 18 · Vite 5 · @vitejs/plugin-react · plain CSS (no UI framework).
