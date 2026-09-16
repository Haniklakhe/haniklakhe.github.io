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
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-teal hover:text-teal dark:border-border-dark dark:text-paper/70 dark:hover:border-teal-light dark:hover:text-teal-light"
    >
      {copied ? "Copied!" : "Copy citation"}
    </button>
  );
}
