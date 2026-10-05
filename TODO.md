# TODO: gaps in content/content.json

The redesign never renders an `ADD_` placeholder. These are the fields still waiting for real data (nothing was invented to fill them).

- `site.url` = `ADD_PRODUCTION_URL`
- `person.links.researchGate` = `ADD_RESEARCHGATE`
- `researchProjects.s4w-citizen-science-hydromet-kathmandu.period` = `ADD_PERIOD`
- `researchProjects.s4w-reamo.period` = `ADD_PERIOD`
- `researchProjects.s4w-victory.period` = `ADD_PERIOD`
- `researchProjects.s4w-smartphone-urban-flood-modelling.period` = `ADD_PERIOD`
- `publications.pub-2026-egusphere-suspended-sediment.doi` = `ADD_DOI`
- `publications.pub-2025-earth-systems-citizen-science-rainfall.doi` = `ADD_DOI`
- `publications.pub-2023-khwopa-journal-groundwater.doi` = `ADD_DOI`
- `conferences.conf-2024-watersci-linking-satellite-sensor-citizen.location` = `ADD_LOCATION`
- `conferences.conf-2024-watersci-citizen-scientist-performance.location` = `ADD_LOCATION`
- `conferences.conf-2022-agu-water-quality-index-groundwater.location` = `ADD_LOCATION`
- `conferences.conf-2022-kec-wqi-hanumante.location` = `ADD_LOCATION`
- `conferences.conf-2021-agu-baseflow-kathmandu.location` = `ADD_LOCATION`
- `awards.award-mochwo.issuer` = `ADD_ISSUER`
- `awards.award-mochwo.location` = `ADD_LOCATION`
- `awards.award-mochwo.year` = `ADD_DATE`

## Other things to confirm

- `person.academicStatus` says "MSc Candidate (2024–2026)" while the bio says you are a graduate. The redesign shows the current role only until you confirm which is right.
- `site.url` is a placeholder, so page metadata (social-share links) falls back to localhost. Suggested value: `https://haniklakhe.github.io`.
- `public/images/projects/aiib-cambodia-climate-risk.png` (3507 px, 0.8 MB) and `swat-northern-thailand.png` (3092 px, 2.5 MB) are still full size. Resize or convert them to WebP; `_meta.imageOptimization` says they were already resized, so the folder copies may be older originals.
- Local git history (`c243f7e`) and the remote `main` (`54f1f7d`) look different. Run `git fetch` and compare before merging.
- Fonts are loaded from `/fonts/...`, which works on a user site at the domain root (haniklakhe.github.io). A project-page deployment under a sub-path would need a base path.
- Remotion (the `motion/` clip) is free for individuals and companies of up to three people; check its licence terms for other uses.
