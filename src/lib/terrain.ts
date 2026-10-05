/**
 * Deterministic synthetic terrain for the hero "scene".
 * This is an illustration, not measured data. It produces contour polylines
 * (marching squares) and run-length pixel rectangles for the raster layers.
 */

export const COLS = 96;
export const ROWS = 60;
export const CELL = 15; // viewBox units per cell -> viewBox 1440 x 900

type Pt = [number, number];

function gauss(x: number, y: number, cx: number, cy: number, s: number, h: number): number {
  const dx = x - cx;
  const dy = y - cy;
  return h * Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
}

/** Centre line of the river, x as a function of y (both 0..1). */
function riverX(y: number): number {
  return 0.6 + 0.11 * Math.sin(5.2 * y + 0.5) - 0.12 * y;
}

function elevation(u: number, v: number): number {
  let e = 0.62 * (1 - v * 0.85);
  e += gauss(u, v, 0.14, 0.2, 0.17, 0.85);
  e += gauss(u, v, 0.44, 0.06, 0.15, 0.6);
  e += gauss(u, v, 0.84, 0.22, 0.2, 0.55);
  e += gauss(u, v, 0.3, 0.58, 0.11, 0.22);
  const d = u - riverX(v);
  e -= (0.34 + 0.4 * v) * Math.exp(-(d * d) / (2 * 0.03 * 0.03));
  const w = 0.05 + 0.12 * v;
  e -= 0.26 * v * Math.exp(-(d * d) / (2 * w * w));
  e += 0.018 * Math.sin(23 * u + 4 * v) + 0.012 * Math.sin(37 * v - 9 * u);
  return e;
}

let cache: { grid: number[][]; min: number; max: number } | null = null;

function field() {
  if (cache) return cache;
  const grid: number[][] = [];
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j <= ROWS; j++) {
    const row: number[] = [];
    for (let i = 0; i <= COLS; i++) {
      const e = elevation(i / COLS, j / ROWS);
      row.push(e);
      if (e < min) min = e;
      if (e > max) max = e;
    }
    grid.push(row);
  }
  cache = { grid, min, max };
  return cache;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Contour polylines for one level as a single SVG path string. */
function contourPath(level: number): string {
  const { grid } = field();
  // Edge ids: h:i:j = edge from (i,j) to (i+1,j); v:i:j = edge from (i,j) to (i,j+1)
  const point = (id: string): Pt => {
    const [k, a, b] = id.split(":");
    const i = Number(a);
    const j = Number(b);
    if (k === "h") {
      const za = grid[j][i];
      const zb = grid[j][i + 1];
      const t = (level - za) / (zb - za);
      return [(i + t) * CELL, j * CELL];
    }
    const za = grid[j][i];
    const zb = grid[j + 1][i];
    const t = (level - za) / (zb - za);
    return [i * CELL, (j + t) * CELL];
  };

  const adj = new Map<string, string[]>();
  const link = (a: string, b: string) => {
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);
    adj.get(a)!.push(b);
    adj.get(b)!.push(a);
  };

  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const tl = grid[j][i] >= level ? 1 : 0;
      const tr = grid[j][i + 1] >= level ? 1 : 0;
      const br = grid[j + 1][i + 1] >= level ? 1 : 0;
      const bl = grid[j + 1][i] >= level ? 1 : 0;
      const idx = tl * 8 + tr * 4 + br * 2 + bl;
      if (idx === 0 || idx === 15) continue;
      const top = `h:${i}:${j}`;
      const bottom = `h:${i}:${j + 1}`;
      const left = `v:${i}:${j}`;
      const right = `v:${i + 1}:${j}`;
      switch (idx) {
        case 1: case 14: link(left, bottom); break;
        case 2: case 13: link(bottom, right); break;
        case 3: case 12: link(left, right); break;
        case 4: case 11: link(top, right); break;
        case 6: case 9: link(top, bottom); break;
        case 7: case 8: link(left, top); break;
        case 5: link(left, top); link(bottom, right); break;
        case 10: link(top, right); link(left, bottom); break;
      }
    }
  }

  const seen = new Set<string>();
  const parts: string[] = [];
  const walk = (start: string) => {
    const pts: Pt[] = [];
    let prev = "";
    let cur = start;
    for (;;) {
      seen.add(cur);
      pts.push(point(cur));
      const next = (adj.get(cur) ?? []).find((n) => n !== prev && !seen.has(n));
      if (!next) break;
      prev = cur;
      cur = next;
    }
    if (pts.length > 1) {
      parts.push("M" + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L"));
    }
  };
  // Open chains first (they start at a degree-1 node), then closed loops.
  for (const [id, n] of adj) if (n.length === 1 && !seen.has(id)) walk(id);
  for (const id of adj.keys()) if (!seen.has(id)) walk(id);
  return parts.join("");
}

export interface Contours {
  minor: string;
  major: string;
}

export function buildContours(levels = 18, majorEvery = 4): Contours {
  const { min, max } = field();
  const minor: string[] = [];
  const major: string[] = [];
  for (let k = 1; k < levels; k++) {
    const level = min + ((max - min) * k) / levels;
    (k % majorEvery === 0 ? major : minor).push(contourPath(level));
  }
  return { minor: minor.join(""), major: major.join("") };
}

/** Merge a boolean-ish cell mask into horizontal runs -> one SVG path of rects. */
function runsPath(mask: (i: number, j: number) => boolean): string {
  const d: string[] = [];
  for (let j = 0; j < ROWS; j++) {
    let i = 0;
    while (i < COLS) {
      if (!mask(i, j)) {
        i++;
        continue;
      }
      let k = i;
      while (k < COLS && mask(k, j)) k++;
      d.push(`M${i * CELL} ${j * CELL}h${(k - i) * CELL}v${CELL}h${-(k - i) * CELL}z`);
      i = k;
    }
  }
  return d.join("");
}

function cellElevation(i: number, j: number): number {
  const { grid } = field();
  return (grid[j][i] + grid[j][i + 1] + grid[j + 1][i] + grid[j + 1][i + 1]) / 4;
}

export interface Rasters {
  shadeLight: string;
  shadeMid: string;
  shadeDark: string;
  water: string;
  flood: string;
}

export function buildRasters(): Rasters {
  const { min, max } = field();
  const span = max - min;
  const cellShade = (i: number, j: number) => {
    const { grid } = field();
    // light from the north-west
    const dzdx = (grid[j][i + 1] + grid[j + 1][i + 1] - grid[j][i] - grid[j + 1][i]) / 2;
    const dzdy = (grid[j + 1][i] + grid[j + 1][i + 1] - grid[j][i] - grid[j][i + 1]) / 2;
    return (dzdx + dzdy) * (ROWS / 1.2);
  };
  const dist = (i: number, j: number) => {
    const u = (i + 0.5) / COLS;
    const v = (j + 0.5) / ROWS;
    return Math.abs(u - riverX(v));
  };
  return {
    shadeLight: runsPath((i, j) => cellShade(i, j) > 0.55 && cellShade(i, j) <= 1.0),
    shadeMid: runsPath((i, j) => cellShade(i, j) > 1.0 && cellShade(i, j) <= 1.6),
    shadeDark: runsPath((i, j) => cellShade(i, j) > 1.6),
    // Open water: the channel itself plus the lowest ground
    water: runsPath(
      (i, j) => cellElevation(i, j) < min + span * 0.13 || (dist(i, j) < 0.014 && j / ROWS > 0.12)
    ),
    // Illustrated flood extent: low ground and the widening floodplain downstream
    flood: runsPath((i, j) => {
      const v = (j + 0.5) / ROWS;
      return v > 0.28 && cellElevation(i, j) < min + span * (0.2 + 0.22 * v) && dist(i, j) < 0.04 + 0.2 * v;
    }),
  };
}

/**
 * Flood layer for a given water level (0 = none, 1 = the full illustrated extent).
 * Used by the rendered motion clip (motion/); the static hero uses `buildRasters().flood`.
 */
export function buildFlood(level: number): string {
  const { min, max } = field();
  const span = max - min;
  const L = Math.min(Math.max(level, 0), 1);
  const dist = (i: number, j: number) => {
    const u = (i + 0.5) / COLS;
    const v = (j + 0.5) / ROWS;
    return Math.abs(u - riverX(v));
  };
  return runsPath((i, j) => {
    const v = (j + 0.5) / ROWS;
    if (v <= 0.28) return false;
    const thr = min + span * (0.04 + (0.2 + 0.22 * v - 0.04) * L);
    const band = 0.02 + (0.04 + 0.2 * v - 0.02) * L;
    return cellElevation(i, j) < thr && dist(i, j) < band;
  });
}
