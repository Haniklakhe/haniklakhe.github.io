import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { buildContours, buildRasters, buildFlood } from "./terrain";

const GROUND = "#E6EBE3";
const INK = "#0D1F27";
const WATER = "#0A6F7E";
const NIR = "#C23B5E";

// Computed once per render process.
const contours = buildContours();
const rasters = buildRasters();

/** Illustrative discharge: base flow, a fast rise to a peak, a slower recession. Starts and ends at 0. */
function q(t: number): number {
  if (t <= 0 || t >= 1) return 0;
  const peak = 0.4;
  const x = t < peak ? t / peak : (t - peak) / (1 - peak);
  const rise = Math.sin((Math.PI / 2) * x) ** 2;
  return t < peak ? rise : Math.pow(1 - x, 1.8) * 1;
}

export const FloodRise: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / (durationInFrames - 1);
  const level = q(t);

  // Hydrograph box (in 800 x 500 px). Top-left sits over dry hillslope, clear of the channel and floodplain.
  const bx = 36, by = 36, bw = 300, bh = 146;
  const pts: string[] = [];
  const done: string[] = [];
  for (let k = 0; k <= 120; k++) {
    const tt = k / 120;
    const x = bx + 14 + (bw - 28) * tt;
    const y = by + bh - 18 - (bh - 40) * q(tt);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
    if (tt <= t) done.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const mx = bx + 14 + (bw - 28) * t;
  const my = by + bh - 18 - (bh - 40) * level;

  return (
    <AbsoluteFill style={{ background: GROUND }}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" width={800} height={500}>
        <path d={rasters.shadeLight} fill={INK} fillOpacity={0.05} />
        <path d={rasters.shadeMid} fill={INK} fillOpacity={0.09} />
        <path d={rasters.shadeDark} fill={INK} fillOpacity={0.14} />
        <path d={rasters.water} fill={WATER} fillOpacity={0.55} />
        <path d={buildFlood(level)} fill={NIR} fillOpacity={0.45} />
        <path d={contours.minor} fill="none" stroke={INK} strokeOpacity={0.26} strokeWidth={1} />
        <path d={contours.major} fill="none" stroke={INK} strokeOpacity={0.5} strokeWidth={1.6} />
      </svg>
      <svg width={800} height={500} style={{ position: "absolute", inset: 0 }}>
        <rect x={bx} y={by} width={bw} height={bh} fill={GROUND} fillOpacity={0.94} stroke={INK} strokeWidth={1.5} />
        <line x1={bx + 14} x2={bx + bw - 14} y1={by + bh - 18} y2={by + bh - 18} stroke={INK} strokeWidth={1.5} />
        <line x1={bx + 14} x2={bx + 14} y1={by + 14} y2={by + bh - 18} stroke={INK} strokeWidth={1.5} />
        <polyline points={pts.join(" ")} fill="none" stroke={INK} strokeOpacity={0.35} strokeWidth={2} />
        <polyline points={done.join(" ")} fill="none" stroke={NIR} strokeWidth={3.5} strokeLinejoin="round" />
        <circle cx={mx} cy={my} r={6} fill={NIR} stroke={GROUND} strokeWidth={2} />
      </svg>
    </AbsoluteFill>
  );
};
