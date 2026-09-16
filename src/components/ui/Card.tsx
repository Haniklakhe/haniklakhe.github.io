import type { ReactNode } from "react";

const TONE_CLASSES = {
  default: "border-border bg-paper-raised dark:border-border-dark dark:bg-deep-raised dark:shadow-none",
  inverted: "border-ink bg-ink text-paper dark:border-teal-light/20 dark:bg-deep-raised",
  amber: "border-amber/40 bg-amber-soft/40 dark:border-amber/30 dark:bg-amber/10",
} as const;

export function Card({
  children,
  className = "",
  as: Tag = "div",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  tone?: keyof typeof TONE_CLASSES;
}) {
  return (
    <Tag
      className={`rounded-xl border p-6 shadow-sm shadow-ink/[0.03] ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}
