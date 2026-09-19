# space-travel-website

A cinematic, portfolio-grade space tourism site (destinations, crew, technology) built with
vanilla HTML/CSS/JS (no UI framework) plus Vite and Three.js. Signature feature: a WebGL
nebula hero with pointer parallax and a draggable interactive 3D planet on the destination
pages, with progressive enhancement and reduced-motion fallbacks.

## Stack

- Vite 8, Vitest 4 (jsdom), Biome 2 (lint + format), Three.js 0.185
- No framework, no TypeScript. Multi-page app: each page is a standalone HTML file wired
  through `vite.config.js` `rollupOptions.input` (index, destination, crew, technology,
  design-system, 404, plus per-item sub-pages like `destination-mars.html`, `crew-pilot.html`).
- Node >=18. Package manager: pnpm (pnpm-lock.yaml present; README's `npm install` is stale).

## Commands

```bash
pnpm dev          # vite dev server (localhost:5173)
pnpm build        # vite build -> dist/
pnpm preview      # preview production build
pnpm test         # vitest (watch)
pnpm test:run     # vitest run (single pass)
pnpm biome:check  # lint + format check
pnpm biome:fix    # lint + format, write
pnpm check        # biome:check && test:run && build (full local gate)
pnpm audit        # pnpm audit --audit-level high (alias: pnpm security)
```

## Layout

- Root-level `*.html` pages (`index.html`, `destination.html`, `crew.html`, etc.) each pull in
  their own `.js`/`.css` (e.g. `booking.js`/`booking.css`, `cinematic.js`/`cinematic.css`).
- `data.json` - content for destinations, crew, and technology sections.
- `assets/` - images (PNG + WebP pairs) organized by section (`crew/`, `destination/`, `home/`,
  `shared/`, `technology/`).
- `__tests__/` - Vitest specs (currently `utils.test.js`).
- `manifest.json`, `sw.js` - PWA manifest + service worker.
- `.specter/` - local Specter tool state (graph/metadata cache), not project source.

## Conventions

- Vanilla JS modules per concern: `navigation.js` (mobile menu), `tabs.js` (keyboard-accessible
  tab panels), `enhancements.js` (scroll reveal, counters, ripples, image effects),
  `shader-bg.js` (WebGL nebula background), `destination-planet.js` / `crew-portrait.js`
  (Three.js interactive models), `countdown.js`, `faq.js`.
- No env vars used anywhere in this repo.
- Biome enforces single quotes, no semicolons (ASI), trailing commas (ES5), 100-char lines.
- Accessibility is a first-class concern: ARIA attributes, skip-to-content link, keyboard nav
  (Tab/Escape/Arrow keys), focus-visible states - preserve these when touching markup/JS.

## Testing

Vitest with jsdom environment. Run a single pass with `pnpm test:run` before considering a
change done; `pnpm check` also runs the full build.

## Gotchas

- This is a static multi-page site, not a Next.js/React app - there is no router; new pages
  must be added to `vite.config.js`'s `rollupOptions.input` or they will not be built into
  `dist/`.
- `dist/` is committed-looking but is a build artifact; do not hand-edit it.
