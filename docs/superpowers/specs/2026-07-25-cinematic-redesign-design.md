# Stellar Voyages — Cinematic Redesign (Design Spec)

Date: 2026-07-25
Status: approved (direction), asset sources pending research
Repo: forbiddenlink/space-travel-website
Stack: vanilla HTML/CSS/JS + Vite (add `three` for one hero showpiece)

## Goal

Turn a competent-but-generic Frontend Mentor "Space Tourism" build into a
distinctive, portfolio-grade site. Success = it no longer reads as "the FM
challenge + kitchen-sink features"; it reads as deliberate art direction with
one or two signature technical moments, still 60fps on mobile, Lighthouse green.

## Non-goals

- No framework migration (vanilla is the flex).
- No full-site 3D (jank risk on mobile). 3D is a hero accent only.
- No hero video in v1 (WebGL hero carries the motion). Revisit later.

## Art direction — "cinematic cut"

Cold deep-space black base, one **warm ember** accent (cinematic gold against
cold blue) + an **electric signal** accent for data/interactive. This kills the
flat-navy FM tell.

### Design tokens (HSL)
- `--void: 230 40% 4%` (near-black page base)
- `--deep: 230 35% 8%` (raised surface)
- `--surface: 230 30% 12%`
- `--white: 0 0% 100%` (primary text)
- `--lavender: 231 77% 90%` (muted text — keep #D0D6F9 for continuity)
- `--ember: 35 90% 62%` (warm accent — CTAs, key highlights)
- `--signal: 190 95% 55%` (electric cyan — data readouts, hover/active)
- Overlay layers: film grain, radial vignette, optional letterbox bars.

### Typography (no new font budget)
Keep Bellefair (serif display), Barlow Condensed (kickers/labels/nav), Barlow
(body). Upgrade the *usage*: a fluid `clamp()` type scale, larger display
contrast, disciplined `letter-spacing` on condensed kickers. Numerals in
Bellefair for the data readouts.

## Signature moments (the two that carry the redesign)

1. **Home cinematic hero** — replace `shader-bg.js` with an upgraded WebGL/canvas
   scene: drifting planet + layered parallax starfield reacting to pointer
   (subtle), grain + vignette, and a letterbox intro that retracts on load.
   Static graded fallback when `prefers-reduced-motion` or no WebGL.
2. **Destination 3D planet** — a `three` sphere, drag-to-rotate (OrbitControls,
   damped, auto-slow-spin), crossfade textures between Moon/Mars/Europa/Titan
   on tab change. Restyle the existing animated distance/time counters as HUD
   readouts. Falls back to the existing flat PNG/WebP when reduced-motion/no WebGL.

## Pages in scope
home, destination, crew, technology (+ refresh `design-system.html`). Tab
sub-pages (`destination-mars.html` etc.) inherit the new system, no structural
change.

## Cut (reduce noise so showpieces breathe)
- ripple effects (`enhancements.js`)
- tooltip spam (keep only where it adds meaning)
- heavy "Preparing for launch…" transition overlay → fast, elegant crossfade
- audit remaining micro-effects; keep only what serves the art direction

## Constraints / non-negotiables
- `prefers-reduced-motion: reduce` disables WebGL, parallax, letterbox, counters
  → static graded fallbacks. Test it.
- Keep existing a11y: semantic HTML, skip-link, ARIA tabs, keyboard nav, focus.
- Lighthouse stays green: cap `renderer.setPixelRatio`, lazy-init 3D on the
  destination page only, dispose GL on page hide, texture size budget (per
  research).
- Keep PostHog + PWA/service worker intact.
- Every planet/texture asset carries its required license attribution (portfolio
  = must be clean). Credits in README + a visible `/credits` or footer line.

## Build phases
1. **Global system** — tokens, fluid type scale, motion primitives, grain /
   vignette / letterbox layers, refactor shared CSS.
2. **Home** + cinematic WebGL hero (replace shader-bg).
3. **Destination** + Three.js planet + HUD counters.
4. **Crew** + **Technology** to the new system.
5. **Cut noise**, wire `prefers-reduced-motion` fallbacks, responsive + polish.
6. **/audit-pack** launch-readiness gate + fix findings.

## Assets (from research 2026-07-25)
- **three@0.185.1**; `import * as THREE from 'three'` + `import { OrbitControls }
  from 'three/addons/controls/OrbitControls.js'`. Textures in `public/textures/`,
  loaded by absolute path (`/textures/2k_mars.jpg`), TextureLoader.
- **Moon** — Solar System Scope `2k_moon.jpg`, CC BY 4.0. Attribution:
  "Solar System Scope (solarsystemscope.com/textures)".
- **Mars** — Solar System Scope `2k_mars.jpg`, CC BY 4.0, same attribution.
- **Europa** — no CC source. USGS Voyager/Galileo public-domain mosaic (184MB
  TIFF → must downsize locally to 2k JPG). Credit "NASA/JPL-Caltech".
- **Titan** — NASA/JPL Cassini map JPG (PIA06411). Public domain. Credit
  "NASA/JPL/Space Science Institute". Verify 2:1 equirect before mapping.
- Downloads require explicit user OK (stated at Phase 3 start).
- Perf: 2k textures on mobile (4k desktop only), `setPixelRatio(min(dpr,2))`,
  dispose geometry/material/texture/renderer on teardown, gate render loop on
  `prefers-reduced-motion` (drag still allowed, ambient spin off).

## Outcome (2026-07-25)
- Shipped all 6 phases + 4 add-ons (crew holo tilt, Titan rings, OG image, copy +
  case-study). 9 broken FM sub-page stubs converted to redirects.
- Lighthouse (desktop, prod build): Home Perf 79 / A11y 94 / BP 96 / SEO 92,
  CLS 0.107 (was 0.93 before the countdown-slot + font-display:optional fix).
  Destination A11y 96, CLS 0; Perf 49 (intentional three.js showpiece cost).
- `?freeze` query renders one static frame (screenshot / low-power affordance).
- Not done / follow-ups: destination LCP/TBT (three.js bundle) could be lazy-init
  on scroll; last ~0.01 CLS on home; self-hosted fonts w/ size-adjust would let
  display:swap keep Bellefair on first paint without CLS.

## Considered & rejected
- Retro-futurist HUD art direction — distinctive but niche/gimmicky for a broad
  portfolio audience.
- Immersive-3D-everywhere — highest wow, but mobile jank risk on the devices
  recruiters use; 3D kept as an accent instead.
- Editorial minimal — safe, but lower awe for a space subject.
- Next.js migration — more churn, less distinctive than "vanilla, this polished".
- Hero video in v1 — deferred; WebGL hero is the motion showpiece.
