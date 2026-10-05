"use client";

import { useState } from "react";

export function CopyCitationButton({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context): the button simply does nothing.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className="inline-flex min-h-11 items-center border border-rule px-4 font-display text-[0.9375rem] font-semibold font-condensed text-ink-soft transition-[transform,color,border-color] duration-150 ease-state hover:border-water hover:text-water active:scale-[0.97]"
    >
      {copied ? "Copied" : "Copy citation"}
    </button>
  );
}
