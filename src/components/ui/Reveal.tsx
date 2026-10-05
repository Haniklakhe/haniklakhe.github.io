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
  actions,
}: {
  /** Shown only while closed, so the full text replaces it rather than repeating it. */
  summary?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  labelOpen?: string;
  labelClose?: string;
  /** Extra links shown on the same row as the toggle. */
  actions?: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div>
      {!open && summary}
      <div id={id} hidden={!open} className={open ? "reveal-in" : undefined}>
        {children}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-8">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-11 items-center font-display text-[1rem] font-semibold font-condensed text-water underline decoration-water/40 underline-offset-4 transition-[color,transform] duration-150 ease-state hover:decoration-water active:scale-[0.98]"
        >
          {open ? labelClose : labelOpen}
        </button>
        {actions}
      </div>
    </div>
  );
}
