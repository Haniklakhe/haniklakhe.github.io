# TODO: gaps in content/content.json

The site never renders an `ADD_` placeholder. These fields are still waiting for real data (nothing was invented to fill them). None of them is shown on the site today, so they are optional.

- `researchProjects.s4w-reamo.period` = `ADD_PERIOD`
- `researchProjects.s4w-victory.period` = `ADD_PERIOD`
- `researchProjects.s4w-smartphone-urban-flood-modelling.period` = `ADD_PERIOD`

## Notes

- Images are served as-is (GitHub Pages can't run the Next.js image optimizer). Pre-size any new project image to about 1800 px wide; use JPEG for photos and PNG/WebP for maps and diagrams (non-JPEG images are shown uncropped on white).
- Fonts are loaded from `/fonts/...`, which works on a user site at the domain root (haniklakhe.github.io). A project-page deployment under a sub-path would need a base path.
- Remotion (the `motion/` clip) is free for individuals and companies of up to three people; check its licence terms for other uses.
