# Volley Homepage

Homepage for the Volley stream processing framework.

## Stack

- React 19, TypeScript 6, Vite 8, Tailwind CSS 4
- No component libraries — hand-rolled components with Tailwind utility classes
- Playwright available as dev dependency for visual testing

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check + production build
- `npm run lint` — type-check only
- `node screenshot.mjs` — capture screenshots at multiple viewport sizes (uses Brave browser)

## Project Structure

- `src/content.ts` — all copy, links, and data (single source of truth)
- `src/components/` — Nav, Hero, Features, CodeShowcase, Footer
- `src/index.css` — Tailwind theme (brand colors, fonts, animations), base styles, component classes

## Conventions

- Tailwind 4 CSS-first config: theme tokens live in `@theme` block in `index.css`, not a JS config file
- System-aware dark mode via `prefers-color-scheme` (no toggle)
- All animations respect `prefers-reduced-motion: reduce`
- Focus-visible rings on interactive elements
- Scroll-triggered `.reveal` class for progressive content reveal
- Mobile-first responsive design with `md` breakpoint for side-by-side layouts

## Design

See `.impeccable.md` for full design context (users, brand personality, aesthetic direction, design principles).
