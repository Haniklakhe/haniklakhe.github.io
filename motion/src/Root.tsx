import { Composition } from "remotion";
import { FloodRise } from "./FloodRise";

export const FPS = 30;
export const DURATION = 240; // 8 s, loops seamlessly (starts and ends at base flow)

export const Root = () => (
  <Composition id="FloodRise" component={FloodRise} width={800} height={500} fps={FPS} durationInFrames={DURATION} />
);
