import type { ReactNode } from "react";

const TONE_CLASSES = {
  teal: "border-teal/30 bg-teal/10 text-teal dark:border-teal-light/30 dark:bg-teal-light/10 dark:text-teal-light",
  amber:
    "border-amber/50 bg-amber-soft text-ink dark:border-amber/40 dark:bg-amber/20 dark:text-amber-soft",
  neutral:
    "border-border bg-border/30 text-ink-soft dark:border-border-dark dark:bg-border-dark/40 dark:text-paper/70",
} as const;

export function Chip({
  children,
  tone = "teal",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONE_CLASSES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
