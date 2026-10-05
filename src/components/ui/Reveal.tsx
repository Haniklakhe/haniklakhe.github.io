"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Collapsed summary with the full original text behind a button.
 * The reveal animates opacity and transform only (no height animation).
 */
export function Reveal({
  summary,
  children,
  defaultOpen = false,
  labelOpen = "Read the full text",
  labelClose = "Show less",
}: {
  summary?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  labelOpen?: string;
  labelClose?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div>
      {!open && summary}
      <div id={id} hidden={!open} className={open ? "reveal-in" : undefined}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="mt-3 inline-flex min-h-11 items-center font-display text-[1rem] font-semibold font-condensed text-water underline decoration-water/40 underline-offset-4 transition-[color,transform] duration-150 ease-state hover:decoration-water active:scale-[0.98]"
      >
        {open ? labelClose : labelOpen}
      </button>
    </div>
  );
}
