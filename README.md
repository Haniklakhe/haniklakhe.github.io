# Hanik Lakhe — Academic Portfolio

The personal academic portfolio of **Hanik Lakhe**, Research Associate in Water Engineering and Management at the Asian Institute of Technology (AIT), Thailand.

**Live site: [haniklakhe.com.np](https://haniklakhe.com.np)**

The site presents research in hydrological modelling, remote sensing and GIS, flood and climate risk, and citizen science: projects, peer-reviewed and technical publications, conference presentations, professional experience, skills, education, awards and contact details.

## Pages

| Route | Contents |
|---|---|
| `/` (Home) | Hero with an interactive terrain map (natural, water-index and flood-extent layers), short about section, research interests, selected work, publications, experience, skills, education and awards, contact |
| `/about` | Biography, skills, education, awards and languages |
| `/research` | Overview of the research section, with sub-pages below |
| `/research/projects` | Research projects |
| `/research/publications` | Publications, with copyable citations and DOI links |
| `/research/conferences` | Conference presentations |
| `/research/interests` | Research interests |
| `/experience` | Timeline of roles since 2019 |
| `/contact` | Email, profile links and CV download |

The terrain, water and flood layers in the hero, and the flood-rise video, are illustrative graphics made for the site. They are not measured data.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) with React 19 and TypeScript, exported as a fully static site
- [Tailwind CSS 3](https://tailwindcss.com), with design tokens for light and dark themes
- [Remotion](https://www.remotion.dev) for the rendered flood-rise clip (source in `motion/`, not part of the site build)
- Hosted on GitHub Pages and deployed by GitHub Actions on every push to `main`, with the custom domain set through a `CNAME` file

## Project structure

```
content/content.json   All site text and data: profile, projects, publications, experience, awards
src/app/               Pages, one folder per route
src/components/        Hero, layout (rail, footer, theme), page sections, UI primitives
src/lib/               Content loader, types, and the terrain generator for the hero map
public/                Images, fonts, CV PDF, rendered media, and the CNAME for the custom domain
motion/                Remotion source for public/media/flood-rise.* (not part of the site build)
DESIGN.md              Design system: concept, colour tokens, type, layout and motion rules
```

## Editing content

Most of the site comes from [`content/content.json`](content/content.json), so most updates need no code changes.

- Any value starting with `ADD_` is a placeholder. The site hides it until a real value is filled in.
- Project images go in `public/images/projects/<project-id>.<ext>`. Use JPEG for photos and PNG or WebP for maps and diagrams, which are shown uncropped on white. Resize images to about 1800 px wide first, since they are served as-is.
- The downloadable CV is `public/cv/Hanik_CV.pdf`.

## Running locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # development server at http://localhost:3000
npm run build      # static export into out/
npm run start      # serve the production build
npm run lint
```

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow builds the static export into `out/` and publishes it to GitHub Pages. The live site updates about a minute after the workflow starts.

## Re-rendering the flood clip

The flood-rise animation is baked into `public/media/flood-rise.*` (MP4, WebM and a poster image). To change it, edit `motion/src/FloodRise.tsx` and re-render. See [`motion/README.md`](motion/README.md).

## Contact

- Email: [hlakhe123.hl@gmail.com](mailto:hlakhe123.hl@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/hanik-lakhe) · [ORCID](https://orcid.org/0000-0001-7026-4245) · [Google Scholar](https://scholar.google.com/citations?user=vAqIs78AAAAJ&hl=en) · [ResearchGate](https://www.researchgate.net/profile/Hanik-Lakhe)

---

© 2026 Hanik Lakhe. All rights reserved. The text, photos, figures and CV are personal content and may not be reused without permission.
