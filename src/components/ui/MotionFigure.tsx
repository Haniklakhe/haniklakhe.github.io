"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Looping rendered clip (see /motion). Lazy: no video bytes are requested until the
 * figure is near the viewport; it plays only while visible; under
 * prefers-reduced-motion, or if video is unsupported, the poster stays as a still.
 */
export function MotionFigure({
  mp4,
  webm,
  poster,
  caption,
  className = "",
}: {
  mp4: string;
  webm: string;
  poster: string;
  caption: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    // Reduced only if the system asks for it and the visitor has not opted in.
    const sync = () => setReduced(mq.matches && root.dataset.motion !== "on");
    sync();
    mq.addEventListener("change", sync);
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    return () => {
      mq.removeEventListener("change", sync);
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setArmed(true);
        const v = ref.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, armed]);

  return (
    <figure className={className}>
      <div ref={wrap} className="relative aspect-[16/10] w-full border border-ink bg-[#E6EBE3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={800} height={500} />
        {armed && !reduced && (
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            aria-hidden="true"
          >
            {/* MP4 first: Chrome decodes only the first frame of the Remotion VP9 WebM
                and then stalls, while the H.264 MP4 loops cleanly (and is smaller). */}
            <source src={mp4} type="video/mp4" />
            <source src={webm} type="video/webm" />
          </video>
        )}
      </div>
      <figcaption className="mt-3 max-w-[44ch] text-[0.9375rem] leading-snug text-ink-soft">{caption}</figcaption>
    </figure>
  );
}
