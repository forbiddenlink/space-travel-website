# Space Tourism Website

A cinematic, portfolio-grade space tourism site: destinations, crew, and technology, built with
vanilla HTML, CSS, and JavaScript (no UI framework) plus Vite and Three.js. Signature moments:
a WebGL nebula hero with pointer parallax, and an interactive 3D planet you can drag to rotate
on the destination pages, all with progressive enhancement, accessibility, and reduced-motion
fallbacks.

![Space Tourism Website](./assets/shared/logo.svg)

## Features

- Interactive destination, crew, and technology pages, each with tab navigation
- Draggable Three.js 3D planet on destination pages (crossfades textures per tab, falls back to
  flat PNG/WebP when reduced-motion is set or WebGL is unavailable)
- WebGL nebula hero background with pointer parallax
- Accessible: semantic HTML, ARIA attributes, skip-to-content link, keyboard navigation
  (Tab/Escape/Arrow keys), focus-visible states
- Scroll reveal animations, animated counters, ripple effects, image hover effects
- SEO: meta tags, Open Graph, Twitter Cards, `robots.txt`, `sitemap.xml`
- PWA manifest + service worker
- Dedicated design system page (`design-system.html`)

## Stack

- Vite 8, Vitest 4 (jsdom), Biome 2 (lint + format), Three.js 0.185
- No framework, no TypeScript. Multi-page app: each page is a standalone HTML file wired
  through `vite.config.js`'s `rollupOptions.input`.
- Node >=18. Package manager: **pnpm** (`pnpm-lock.yaml` is the lockfile; there is no
  `package-lock.json`).

## Quickstart

```bash
pnpm install
pnpm dev          # vite dev server, http://localhost:5173
```

No environment variables are used anywhere in this repo.

## Scripts

```bash
pnpm dev          # vite dev server
pnpm build        # vite build -> dist/
pnpm preview      # preview production build
pnpm test         # vitest (watch)
pnpm test:run     # vitest run (single pass)
pnpm biome:check  # lint + format check
pnpm biome:fix    # lint + format, write
pnpm check        # biome:check && test:run && build (full local gate)
pnpm audit        # pnpm audit --audit-level high (alias: pnpm security)
```

## Project structure

```
space-travel-website/
├── assets/                   # Images (PNG + WebP pairs), organized by section
│   ├── crew/
│   ├── destination/
│   ├── home/
│   ├── shared/
│   └── technology/
├── public/                   # Static files served as-is (robots.txt, sitemap.xml, textures)
├── __tests__/                # Vitest specs
├── index.html                # Home page
├── destination.html          # Destinations page with tabs
├── destination-*.html        # Individual destination pages
├── crew.html                 # Crew page with tabs
├── crew-*.html               # Individual crew member pages
├── technology.html           # Technology page with tabs
├── technology-*.html         # Individual technology pages
├── design-system.html        # Design system showcase
├── data.json                 # Content data (destinations, crew, technology)
├── vite.config.js            # Vite configuration (page entry points)
├── manifest.json             # PWA manifest
└── sw.js                     # Service worker
```

## Design system

`design-system.html` showcases the color palette, typography, and components. See
`docs/superpowers/specs/2026-07-25-cinematic-redesign-design.md` for the design direction the
current visual layer (`cinematic.css`) implements.

## Accessibility

WCAG-conscious: semantic HTML, ARIA labels/roles/attributes, skip-to-content link, keyboard
navigation (Tab, Escape, Arrow keys), focus-visible states, `prefers-reduced-motion` fallbacks.

## Credits and attribution

Planet textures on the interactive 3D destination globe:

- **Moon, Mars**: [Solar System Scope](https://www.solarsystemscope.com/textures/), licensed
  CC BY 4.0.
- **Europa**: NASA / JPL / USGS Voyager and Galileo global mosaic (public domain).
- **Titan**: NASA / JPL / Space Science Institute Cassini map (public domain).

3D rendering by [Three.js](https://threejs.org). Typefaces: Bellefair, Barlow, and Barlow
Condensed via Google Fonts.

## License

MIT. See [LICENSE](LICENSE).

## More

- [Design system](design-system.html): visual style guide and component showcase
- [Contributing guidelines](CONTRIBUTING.md)
