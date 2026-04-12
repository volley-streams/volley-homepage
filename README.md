# volley-homepage

Marketing homepage for [Volley](https://github.com/volley-streams/volley), a
stream processing framework written in Rust.

Built with **Vite + React + TypeScript + Tailwind CSS**. Small, dependency-
light, mobile-friendly, and accessible. The light/dark theme follows the
visitor's system preference.

## Stack

| Concern        | Choice                                        |
| -------------- | --------------------------------------------- |
| Build tool     | [Vite](https://vite.dev) 5                    |
| UI framework   | React 18 + TypeScript                         |
| Styling        | Tailwind CSS 3 (`darkMode: "media"`)          |
| Fonts          | Inter + JetBrains Mono via Google Fonts       |
| Icons          | Inline SVG (no icon library dependency)       |
| Animations     | CSS keyframes + `IntersectionObserver` reveal |

## Getting started

```bash
cd volley-homepage
npm install
npm run dev       # http://localhost:5173
```

## Production build

```bash
npm run build     # emits static assets to ./dist
npm run preview   # preview the production build locally
```

The `dist/` folder is a fully static site. It can be hosted on GitHub Pages,
Cloudflare Pages, Netlify, Vercel, or an S3 bucket. No server-side runtime is
required.

## Project layout

```
volley-homepage/
├── index.html                  # Root HTML, SEO meta, font preloads, theme-color
├── public/
│   └── favicon.svg             # Gradient "V" waves logo
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Page composition + reveal observer
│   ├── index.css               # Tailwind layers + custom components
│   ├── content.ts              # Copy, links, feature and dependency data
│   └── components/
│       ├── Logo.tsx            # Inline SVG logo with gradient
│       ├── Nav.tsx             # Sticky nav with mobile menu
│       ├── Hero.tsx            # Hero with tagline, CTAs, install command
│       ├── Features.tsx        # Four feature cards
│       ├── CodeShowcase.tsx    # Rust code sample with copy-to-clipboard
│       ├── BuiltOn.tsx         # Dependency grid (Arrow, DataFusion, ...)
│       ├── Connectors.tsx      # Source/sink connector lists
│       ├── CallToAction.tsx    # Closing CTA card
│       └── Footer.tsx          # Footer with doc/community links
├── tailwind.config.js          # Brand palette, animations, keyframes
├── postcss.config.js           # Tailwind + autoprefixer
├── vite.config.ts              # Vite + @vitejs/plugin-react
├── tsconfig.json               # Project references
├── tsconfig.app.json           # App compiler options (strict)
└── tsconfig.node.json          # Vite config compiler options
```

## Design principles

- **Calm and factual.** Copy states what Volley is and what it does. No
  benchmark claims without citations, no superlatives, no exclamation marks.
- **Mobile first.** Every section reflows to a single column below `sm`; the
  nav collapses into a hamburger menu.
- **System theme.** Tailwind's `darkMode: "media"` means the palette follows
  `prefers-color-scheme`. No flash, no toggle button, no client JavaScript for
  theme state.
- **Restrained animation.** Subtle fade-up reveals on scroll and hover micro-
  interactions. All disabled under `prefers-reduced-motion: reduce`.
- **Accessible.** Semantic landmarks (`header`, `main`, `section`, `footer`),
  `aria-label` on interactive controls, focus-visible rings, and visible focus
  states on every button and link.

## Updating content

Edit [`src/content.ts`](./src/content.ts) to update the tagline, features,
dependencies, connectors, code sample, or links. Components read from this
file so copy stays consistent across sections.

## License

Same as the parent Volley project: Apache 2.0.
