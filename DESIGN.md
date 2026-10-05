# DESIGN.md — "Scene Index" (redesign-v2)

Source of truth for every later change. If code and this file disagree, fix one of them in the same commit.

## 1. Concept

The site reads like a satellite-scene archive on a light table. Each section is a **tile** of a different size and shape in an asymmetric mosaic. A slim **metadata rail** on the left reads like image metadata (scene, section, coordinates, band) and follows the scroll. Dark **console strips** are used only where the content is instrument-like (hero readout, contact).

One memorable thing: the **band selector** in the hero. Everything else stays quiet and disciplined.

Audience, equal weight: collaborators and PhD/funding committees, employers, general visitors. Research, publications and experience each get their own tile shape so none is buried.

Hard nos (from the brief and interview): purple/blue gradient hero, glassmorphism, generic 3-card grid, Inter/Roboto/Arial/system fonts, emoji icons, stock illustration, lorem ipsum, centred-everything, big animated or video hero, long text walls, cutesy water metaphors (waves, droplets).

## 2. Content rules

- Only real content from `content/content.json`. Never invent publications, projects, numbers or affiliations.
- Any value starting `ADD_` is a gap. It is never rendered raw. It renders as a visible `TODO` marker in development builds only, and is omitted in production builds. The list of gaps is kept in `TODO.md`.
- Long text collapses to a 2 to 3 line summary with the **full original text kept** behind an expand control. Summaries are the first sentence(s) of the existing text, never rewritten claims.
- Open question to the owner: `academicStatus` says "MSc Candidate (2024–2026)" but the bio says graduate. The hero uses the current role only until this is confirmed.

## 3. Colour tokens

Light is the default. Dark is a user toggle (never forced).

| Token | Light | Dark | Role |
|---|---|---|---|
| `ground` | `#E6EBE3` | `#0B1A22` | page background (lichen) |
| `panel` | `#F5F7F1` | `#12252F` | tiles |
| `console` | `#0B1A22` | `#050E13` | dark strips |
| `ink` | `#0D1F27` | `#E6EBE3` | primary text |
| `ink-soft` | `#3F545C` | `#A9BAB5` | secondary text |
| `rule` | `#C5CEC3` | `#23404D` | hairlines and tile edges |
| `water` | `#0A6F7E` | `#4CC3D3` | links, active state, water index |
| `nir` | `#A82C4E` (text), `#C23B5E` (graphic) | `#F0728F` | flood extent, emphasis, vegetation band |
| `swir` | `#D99A1E` | `#E8B04A` | highlights on console only, markers |

Measured contrast (WCAG): ink on ground 13.97, ink on panel 15.66, ink-soft on ground 6.59, water on ground 4.84, water on panel 5.42, `#A82C4E` on panel 6.21, ground on console 14.65, light cyan on console 8.48.

Rules that follow from the measurements:
- `#C23B5E` (4.25 on ground) and `swir` on a light ground (2.02) **must not be used for text**. Graphics, strokes and large decorative marks only. Text uses `#A82C4E`.
- `swir` as text appears only on `console`.
- Colour carries meaning: water = navigable/link/active, nir = flood or emphasis, swir = marker. No decorative gradients.

Band composites (hero, via stacked SVG layers, crossfaded with opacity): **Natural** (ground/ink contours), **Water index** (water tint on low contours), **Flood extent** (nir fill on the low basin). All drawn procedurally from one contour set; no stock imagery.

## 4. Type

- **Display / labels:** Instrument Sans Variable, `font-stretch: 75%` (condensed), weight 600–700, tracking −0.02em, leading 0.92–1.05.
- **Body:** Source Serif 4 Variable, weight 400, optical size on, leading 1.6.
- Self-hosted through `@fontsource-variable/*` (no Google Fonts request at build or runtime).
- Line length: body 60–72ch, never above 75ch.
- No tracked all-caps eyebrows above headings. Labels are sentence case, condensed, 0.875rem.
- No single accented word in headlines. No `→` appended to every link; direction is shown by the interaction.

Fluid scale (ratio ≈ 1.333, `clamp` between 375 and 1440 px):

| Step | Size | Use |
|---|---|---|
| `hero` | `clamp(3.75rem, 3.2rem + 11vw, 9.5rem)` | name in hero only |
| `d1` | `clamp(2.5rem, 2rem + 3.5vw, 4.5rem)` | section titles |
| `d2` | `clamp(1.75rem, 1.5rem + 1.4vw, 2.5rem)` | tile titles |
| `d3` | `1.375rem` | sub-titles |
| `body-l` | `1.25rem` | lead paragraph |
| `body` | `1.125rem` | body |
| `small` | `0.9375rem` | captions and metadata |
| `label` | `0.875rem`, condensed, weight 600 | rail and tile labels |

## 5. Grid and layout

- Max width 90rem (1440). Page gutter 1rem (375), 1.5rem (768), 2.5rem (1440).
- **Rail:** 15rem fixed column from `lg` up; collapses to a sticky top bar below `lg`.
- **Mosaic:** 12-column grid, 1.5rem gap. Tiles span 4, 5, 7, 8 or 12 columns and 1 or 2 rows. Adjacent sections must not reuse the same tile shape.
- **Alignment:** left-aligned throughout. Nothing is centred except a single short caption where a figure requires it.
- Whitespace is intentional: section gaps 6–9rem; tile padding 1.5–2rem.

Spacing scale (rem): 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4.5, 6, 9.

Radius: tiles 0.25rem, controls 0.125rem, avatars/chips 0.125rem. No pills. No soft shadows; separation is by `rule` hairlines and ground/panel contrast.

## 6. Section rhythm (home)

Each section has one job and a different shape from its neighbours.

| Section | Job | Shape |
|---|---|---|
| Hero | Who, and the band selector | Full-bleed scene; name at `hero` size left; photo as a small "scene chip"; readout strip on console |
| About | Short bio, expand for full | 7-col tile, tall, serif lead |
| Research interests | The five themes | A typographic index: five rows, title left, one-line description right; not chips |
| Featured research | Three highlights | One 8-col lead tile plus two stacked 4-col tiles; not a 3-up grid |
| Publications | Dated archive | Full-width list, year in a left column; DOI/copy-citation on hover/focus |
| Experience | Time series | Horizontal strip on desktop (bars sized by months), vertical list on mobile |
| Skills | Tools by category | Dense 12-col index, level shown by a small bar glyph plus text |
| Education and awards | Credentials | Two offset 6-col tiles |
| Contact | Close | `console` strip, full width |

Detail routes (`/about`, `/research/*`, `/experience`, `/contact`) are **kept** so existing URLs and the deploy keep working. They use the same tokens and tile language.

## 7. Motion

- Dials: variance high, motion medium-high, density medium.
- Only `transform` and `opacity` are animated. No layout properties. `will-change` only during an active animation.
- Easing: enter `cubic-bezier(0.22, 1, 0.36, 1)`; exit `cubic-bezier(0.4, 0, 1, 1)`; state change `cubic-bezier(0.4, 0, 0.2, 1)`.
- Durations: press 100ms; hover/focus 160ms; state change 240ms; band crossfade 480ms; hero entrance 700ms.
- **One orchestrated entrance** (hero, once on load). Sections are not individually faded in on scroll.
- Scroll effects use CSS scroll-driven animation (`animation-timeline`) with an `@supports` fallback to a static state. The only scroll-linked element is the rail readout.
- Hover/press: tiles lift 2px (`translateY`) on hover; press scales to 0.985; focus uses a 2px `water` outline with 3px offset.
- `prefers-reduced-motion: reduce` removes all non-essential motion: no entrance, no crossfade (instant swap), no scroll-linked rail, no video autoplay.
- Rendered clips (two, small, inside tiles, not the hero): lazy-loaded, `poster` image, `muted loop playsinline`, paused when off-screen, replaced by the poster under reduced motion. Each under 1.5 MB.
- Budget: added JS under ~150 KB. No animation library unless CSS cannot do it.

## 8. Components

`SceneRail`, `BandSelector`, `HeroScene` (SVG contour composites), `Tile`, `Reveal` (expand/collapse with measured height via `grid-template-rows` transition), `PubRow`, `TimeStrip`, `SkillIndex`, `ConsoleStrip`, `ThemeToggle` (kept), `SiteFooter` (kept, restyled). Existing `Chip`, `Card`, `WaterlineDivider`, `ContourBackground`, `Icons` are replaced or retired; the waterline divider goes (cutesy and decorative).

Icons: the existing inline SVG set, restyled at 1.5px stroke. No emoji.

## 9. Accessibility and responsive

- WCAG AA minimum. Body text 4.5:1 or better; large text 3:1; measured values above.
- Semantic landmarks, one `h1`, ordered headings, skip link kept, visible focus, all controls reachable by keyboard, the band selector is a labelled `radiogroup` with arrow-key support, expand controls are `button` with `aria-expanded`.
- Alt text on every informative image; decorative SVG is `aria-hidden`.
- Breakpoints verified at 375, 768 and 1440 px. No horizontal scroll at any of them. Touch targets at least 44×44 px.
- Print stylesheet retained (clean CV-style output).

## 10. Performance and verification gates

- Lighthouse: Performance ≥ 90, Accessibility ≥ 95 on `/`, `/research/projects/`, `/experience/`.
- No console errors, no broken links or images, `npm run build` passes.
- Playwright screenshots at 375/768/1440 compared with `shots/baseline`.
- Hero image and chip are the only above-the-fold raster; everything else lazy.
