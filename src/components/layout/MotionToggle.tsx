"use client";

import { useEffect, useState } from "react";

/**
 * Shown only when the visitor's system asks for reduced motion (on Windows this is the
 * "Animation effects" setting, which is sometimes off by accident). One click opts in
 * to the page motion for this visit; the system setting itself is never changed.
 */
export function MotionToggle() {
  const [reducedSystem, setReducedSystem] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedSystem(mq.matches);
    setOn(document.documentElement.dataset.motion === "on");
    const h = () => setReducedSystem(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  if (!reducedSystem) return null;

  function toggle() {
    const next = !on;
    if (next) document.documentElement.dataset.motion = "on";
    else delete document.documentElement.dataset.motion;
    setOn(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      title="Your system asks for reduced motion. This turns page animation on for this visit."
      className="flex h-11 items-center justify-center border border-rule px-3 font-display text-[0.875rem] font-semibold font-condensed text-ink-soft transition-[transform,color,border-color] duration-150 ease-state hover:border-water hover:text-water active:scale-95"
    >
      {on ? "Motion on" : "Play motion"}
    </button>
  );
}
