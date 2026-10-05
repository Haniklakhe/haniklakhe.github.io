import type { ReactNode } from "react";

/**
 * A scene tile: hairline-edged panel. No shadows, no pills.
 * `interactive` adds the 2px lift on hover (transform only).
 */
export function Tile({
  children,
  className = "",
  as: Tag = "div",
  tone = "panel",
  interactive = false,
  flush = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
  tone?: "panel" | "console" | "ground";
  interactive?: boolean;
  /** No padding: for tiles whose first child is an edge-to-edge image. */
  flush?: boolean;
}) {
  const tones = {
    panel: "border-rule bg-panel text-ink",
    ground: "border-rule bg-transparent text-ink",
    console: "border-console bg-console text-console-ink",
  } as const;
  return (
    <Tag
      className={`sr border ${flush ? "" : "p-5 sm:p-8"} ${tones[tone]} ${
        interactive
          ? "transition-transform duration-150 ease-state hover:-translate-y-0.5 active:scale-[0.99]"
          : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
