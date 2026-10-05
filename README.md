# Hanik Lakhe — Portfolio

Personal academic portfolio of **Hanik Lakhe**, Research Associate in Water Engineering and Management at the Asian Institute of Technology (AIT), Thailand. It covers research in hydrological modelling, remote sensing and GIS, flood and climate risk, and citizen science.

**Live site: [haniklakhe.github.io](https://haniklakhe.github.io)**

## What's on the site

| Page | Contents |
|---|---|
| Home | Hero with an interactive terrain map (Natural / Water index / Flood extent bands), about, research interests, selected work, publications, experience, skills, education and awards, contact |
| About | Biography, skills, education, awards and languages |
| Research | Projects, publications (with copyable citations and DOI links), conference presentations, research interests |
| Experience | Full timeline of roles since 2019 |
| Contact | Email and profile links, CV download |

The terrain, water and flood layers in the hero, and the flood-rise clip, are illustrative graphics generated for the site, not measured data.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) with React 19 and TypeScript, exported as a fully static site
- [Tailwind CSS 3](https://tailwindcss.com) with design tokens for light and dark themes
- [Remotion](https://www.remotion.dev) for the one rendered video clip (separate project in `motion/`)
- Hosted on GitHub Pages, deployed by GitHub Actions on every push to `main`

## Project structure

```
content/content.json   All site text and data: profile, projects, publications, experience...
src/app/               Pages (one folder per route)
src/components/        Hero, layout (rail, footer, theme), page sections, UI primitives
src/lib/               Content loader, types, terrain generator for the hero map
public/                Images, fonts, CV PDF, rendered media
motion/                Remotion source for public/media/flood-rise.* (not part of the site build)
DESIGN.md              Design system: concept, colour tokens, type, layout and motion rules
```

## Editing content

Almost everything on the site comes from [`content/content.json`](content/content.json), so most updates need no code changes.

- Any value starting with `ADD_` is a placeholder. The site hides it until a real value is filled in.
- Project images live in `public/images/projects/<project-id>.<ext>`. Use JPEG for photos and PNG or WebP for maps and diagrams (these are shown uncropped on white). Resize to about 1800 px wide first, since images are served as-is.
- The downloadable CV is `public/cv/Hanik_CV.pdf`.

## Running locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm run lint
```

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the static export and publishes it to GitHub Pages. The live site updates about a minute after the workflow starts.

## Re-rendering the flood clip

The hydrograph and flood animation are baked into `public/media/flood-rise.*`. To change them, edit `motion/src/FloodRise.tsx` and re-render; see [`motion/README.md`](motion/README.md).

## Contact

- Email: [hlakhe123.hl@gmail.com](mailto:hlakhe123.hl@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/hanik-lakhe) · [ORCID](https://orcid.org/0000-0001-7026-4245) · [Google Scholar](https://scholar.google.com/citations?user=vAqIs78AAAAJ&hl=en) · [ResearchGate](https://www.researchgate.net/profile/Hanik-Lakhe)

---

© 2026 Hanik Lakhe. All rights reserved. The text, photos, figures and CV are personal content and may not be reused without permission.
