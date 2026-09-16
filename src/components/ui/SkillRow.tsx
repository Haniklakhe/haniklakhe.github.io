import type { SkillLevel } from "@/lib/types";
import { Chip } from "./Chip";

const LEVEL_SEGMENTS: Record<Exclude<SkillLevel, null>, number> = {
  Basic: 1,
  Intermediate: 2,
};

export function SkillRow({ name, level }: { name: string; level: SkillLevel }) {
  if (!level) {
    return <Chip tone="neutral">{name}</Chip>;
  }

  const filled = LEVEL_SEGMENTS[level];

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-2 text-sm last:border-b-0 dark:border-border-dark/60">
      <span className="text-ink dark:text-paper">{name}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wide text-ink-soft dark:text-paper/60">
          {level}
        </span>
        <div className="flex gap-1" aria-hidden="true">
          {[1, 2, 3].map((seg) => (
            <span
              key={seg}
              className={`h-1.5 w-4 rounded-full ${
                seg <= filled ? "bg-teal dark:bg-teal-light" : "bg-border dark:bg-border-dark"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
