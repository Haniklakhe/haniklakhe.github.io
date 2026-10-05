"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type Band = "natural" | "water" | "flood";

const BANDS: { id: Band; label: string; legend: string }[] = [
  { id: "natural", label: "Natural", legend: "Natural view: shaded relief and contour lines at a fixed interval." },
  {
    id: "water",
    label: "Water index",
    legend: "Water index: a stand-in for a satellite water index (such as NDWI) that picks out open water.",
  },
  {
    id: "flood",
    label: "Flood extent",
    legend: "Flood extent: a stand-in for a mapped inundation area, the ground a flood covers.",
  },
];

/**
 * Hero scene with the band selector. The SVG layers are rendered on the server
 * and passed in; this component only decides which layers are visible.
 * Without JavaScript the Natural band shows, which is a complete picture.
 */
export function HeroStage({
  base,
  water,
  flood,
  children,
}: {
  base: ReactNode;
  water: ReactNode;
  flood: ReactNode;
  children: ReactNode;
}) {
  const [band, setBand] = useState<Band>("natural");
  const refs = useRef<Record<Band, HTMLButtonElement | null>>({ natural: null, water: null, flood: null });

  const showWater = band === "water" || band === "flood";
  const showFlood = band === "flood";
  const active = BANDS.find((b) => b.id === band)!;

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = BANDS.findIndex((b) => b.id === band);
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % BANDS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + BANDS.length) % BANDS.length;
    else return;
    e.preventDefault();
    setBand(BANDS[next].id);
    refs.current[BANDS[next].id]?.focus();
  }

  return (
    <div className="relative isolate flex min-h-[44rem] flex-col overflow-hidden lg:min-h-[calc(100svh-4.75rem)]">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 -z-10 h-full w-full"
      >
        {base}
        <g className="transition-opacity duration-500 ease-state" style={{ opacity: showWater ? 1 : 0 }}>
          {water}
        </g>
        <g className="transition-opacity duration-500 ease-state" style={{ opacity: showFlood ? 1 : 0 }}>
          {flood}
        </g>
      </svg>

      {children}

      <div className="px-4 pb-6 sm:px-6 lg:px-10">
        <div
          role="radiogroup"
          aria-label="Map layer"
          onKeyDown={onKeyDown}
          className="inline-flex border border-ink bg-panel"
        >
          {BANDS.map((b, idx) => {
            const checked = b.id === band;
            return (
              <button
                key={b.id}
                ref={(el) => {
                  refs.current[b.id] = el;
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => setBand(b.id)}
                className={`min-h-11 px-4 font-display text-[1rem] font-semibold font-condensed transition-[background-color,color,transform] duration-150 ease-state active:scale-[0.97] ${
                  idx > 0 ? "border-l border-ink" : ""
                } ${checked ? "bg-ink text-ground" : "text-ink hover:bg-ground"}`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="halo mt-3 max-w-xl text-[0.9375rem] leading-snug text-ink">
          {active.legend}
          <span className="block text-ink-soft">Illustrative terrain generated for this page, not measured data.</span>
        </p>
      </div>
    </div>
  );
}
