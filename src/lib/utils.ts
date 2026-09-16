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
