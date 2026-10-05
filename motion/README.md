# motion

Source for the one rendered clip on the site (`public/media/flood-rise.*`). `src/terrain.ts` is a copy of `../src/lib/terrain.ts`, made by `npm run sync`, so the clip and the hero share one terrain. Remotion is free for individuals and companies of up to three people; check its licence terms before any commercial or team use.

    cd motion && npm install
    npm run poster   # still frame -> out/poster.webp
    npm run render   # mp4 + webm into out/
    # then copy out/poster.webp, out/flood.mp4, out/flood.webm to ../public/media/
    # as flood-rise-poster.webp, flood-rise.mp4, flood-rise.webm

Remotion downloads its own headless browser on first run. To use a specific one instead, set `REMOTION_BROWSER` to its path.
