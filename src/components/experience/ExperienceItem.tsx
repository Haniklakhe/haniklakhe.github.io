import type { ExperienceEntry } from "@/lib/types";
import { isPlaceholder } from "@/lib/content";
import { Chip } from "@/components/ui/Chip";

export function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const showLocation = !isPlaceholder(entry.location);
  const showPeriod = entry.period && !isPlaceholder(entry.period);
  const metaParts = [
    showLocation ? entry.location : null,
    showPeriod ? entry.period : null,
    entry.totalDuration ?? null,
  ].filter(Boolean);

  return (
    <li className="relative pl-10">
      <span
        aria-hidden="true"
        className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-teal bg-paper dark:border-teal-light dark:bg-deep"
      />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-lg text-ink dark:text-paper">{entry.organization}</h3>
        {entry.current && <Chip tone="amber">Current</Chip>}
      </div>

      {entry.title && (
        <p className="mt-0.5 text-sm font-semibold text-teal dark:text-teal-light">{entry.title}</p>
      )}

      {metaParts.length > 0 && (
        <p className="mt-0.5 text-xs text-ink-soft dark:text-paper/60">{metaParts.join(" · ")}</p>
      )}

      {entry.roles && entry.roles.length > 0 && (
        <ul className="mt-3 space-y-1 border-l border-border pl-4 text-sm dark:border-border-dark">
          {entry.roles.map((role) => (
            <li key={role.title} className="flex flex-wrap justify-between gap-x-4 text-ink-soft dark:text-paper/70">
              <span className="font-medium text-ink dark:text-paper">{role.title}</span>
              <span className="text-xs">{role.period}</span>
            </li>
          ))}
        </ul>
      )}

      {entry.bullets && entry.bullets.length > 0 && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft dark:text-paper/70">
          {entry.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
