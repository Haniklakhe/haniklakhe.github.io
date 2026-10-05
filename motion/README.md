# motion

Source for the one rendered clip on the site (`public/media/flood-rise.*`). `src/terrain.ts` is a copy of `../src/lib/terrain.ts`, made by `npm run sync`, so the clip and the hero share one terrain. Remotion is free for individuals and companies of up to three people; check its licence terms before any commercial or team use.

    cd motion && npm install
    npm run poster   # still frame
    npm run render   # mp4 + webm into out/
    # then convert out/poster.png to webp and copy the three files to ../public/media/

`remotion.config.ts` points at a Chromium path from the build machine; change it (or delete the line) to use Remotion's own browser.
