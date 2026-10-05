export function groupByYearDesc<T extends { year: number }>(items: T[]): [number, T[]][] {
  const groups = new Map<number, T[]>();
  for (const item of items) {
    const bucket = groups.get(item.year);
    if (bucket) {
      bucket.push(item);
    } else {
      groups.set(item.year, [item]);
    }
  }
  return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
}

/** First sentence(s) of a text, up to `max` characters, cut at a sentence boundary. Never rewrites. */
export function summarize(text: string, max = 230): { summary: string; truncated: boolean } {
  if (text.length <= max) return { summary: text, truncated: false };
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let out = "";
  for (const s of sentences) {
    if ((out + s).length > max && out) break;
    out += s;
  }
  out = out.trim();
  if (!out || out.length >= text.length) return { summary: text, truncated: false };
  return { summary: out, truncated: true };
}

const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];

/**
 * Parse free-text periods such as "May 2026 – Present", "June – December 2019",
 * "May 13 – June 7, 2024". Returns decimal years, or null if not parseable.
 */
export function parsePeriod(period: string | undefined, now = new Date()): { start: number; end: number } | null {
  if (!period) return null;
  const present = /present/i.test(period);
  const toks = [...period.matchAll(/([A-Za-z]+)\s*(?:(\d{1,2})(?!\d))?(?:,)?\s*(\d{4})?/g)]
    .map((m) => ({ mon: MONTHS.indexOf(m[1].toLowerCase()), year: m[3] ? Number(m[3]) : null }))
    .filter((t) => t.mon >= 0);
  if (toks.length === 0) return null;
  for (let i = toks.length - 1; i >= 0; i--) {
    if (toks[i].year === null && i + 1 < toks.length) toks[i].year = toks[i + 1].year;
  }
  if (toks.some((t) => t.year === null)) return null;
  const at = (t: { mon: number; year: number | null }) => (t.year as number) + t.mon / 12;
  const start = at(toks[0]);
  const end = present ? now.getFullYear() + now.getMonth() / 12 : at(toks[toks.length - 1]) + 1 / 12;
  return { start, end };
}
