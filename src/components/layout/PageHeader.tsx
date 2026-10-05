import type { ReactNode } from "react";
import { buildContours, buildRasters } from "@/lib/terrain";
import { EXPERIENCE_NOTE } from "@/components/sections/ExperienceLedger";

type Band = "natural" | "water" | "flood";
type PageKey = "about" | "research" | "experience" | "contact";

/**
 * One row per page: rail number, title, intro line, which hero band the terrain shows,
 * and `frame`, the vertical crop into the 1440 x 900 terrain (0 = top, 420 = bottom).
 * The intro lines are plain text; edit them freely.
 */
const PAGES: Record<PageKey, { index: string; title: string; intro: string; band: Band; frame: number }> = {
  about: {
    index: "01",
    title: "About",
    intro: "Research Associate in Water Engineering and Management at AIT. Biography, education, awards and skills.",
    band: "natural",
    frame: 60,
  },
  research: {
    index: "02",
    title: "Research",
    intro: "Interests, projects, publications and conference presentations.",
    band: "water",
    frame: 300,
  },
  experience: {
    index: "03",
    title: "Experience",
    intro: EXPERIENCE_NOTE,
    band: "flood",
    frame: 420,
  },
  contact: {
    index: "04",
    title: "Contact",
    intro: "Based in Pathum Thani, Thailand. Email, profiles and CV below.",
    band: "natural",
    frame: 200,
  },
};

const ink = "rgb(var(--ink))";
const VIEW_H = 480;

/**
 * Page header in the hero's language: the same generated terrain as a backdrop,
 * a numbered label, the title in the hero face, and an intro line, entering on
 * the hero's stagger. `children` (e.g. section tabs) enters last.
 */
export function PageHeader({ page, children }: { page: PageKey; children?: ReactNode }) {
  const p = PAGES[page];
  const c = buildContours();
  const r = buildRasters();

  return (
    <header className="relative isolate overflow-hidden">
      <svg
        aria-hidden="true"
        viewBox={`0 ${p.frame} 1440 ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="scene-settle absolute inset-0 -z-10 h-full w-full [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]"
      >
        <path d={r.shadeLight} style={{ fill: ink }} fillOpacity={0.05} />
        <path d={r.shadeMid} style={{ fill: ink }} fillOpacity={0.08} />
        <path d={r.shadeDark} style={{ fill: ink }} fillOpacity={0.12} />
        {p.band !== "natural" && <path d={r.water} style={{ fill: "rgb(var(--water))" }} fillOpacity={0.5} />}
        {p.band === "flood" && <path d={r.flood} style={{ fill: "rgb(var(--nir-graphic))" }} fillOpacity={0.38} />}
        <path d={c.minor} fill="none" style={{ stroke: ink }} strokeOpacity={0.22} strokeWidth={1} />
        <path d={c.major} fill="none" style={{ stroke: ink }} strokeOpacity={0.42} strokeWidth={1.6} />
      </svg>

      <div className="flex min-h-[20rem] flex-col justify-end px-4 pb-10 pt-14 sm:px-6 lg:min-h-[26rem] lg:px-10 lg:pb-12 lg:pt-20">
        <p className="enter halo label flex items-center gap-3 text-ink" style={{ ["--i" as string]: 0 }}>
          <span aria-hidden="true" className="enter-rule block h-0.5 w-10 bg-water" style={{ ["--i" as string]: 0 }} />
          <span>
            {p.index} · {p.title}
          </span>
        </p>
        <h1 className="enter mt-4 text-page font-bold font-condensed text-ink" style={{ ["--i" as string]: 1 }}>
          {p.title}
        </h1>
        <p
          className="enter halo mt-6 max-w-xl text-[1.125rem] leading-snug text-ink"
          style={{ ["--i" as string]: 2 }}
        >
          {p.intro}
        </p>
        {children && (
          <div className="enter mt-10" style={{ ["--i" as string]: 3 }}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

/** Page body: enters on the same stagger, just after the header. */
export function PageBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`enter ${className}`} style={{ ["--i" as string]: 4 }}>
      {children}
    </div>
  );
}
