import Image from "next/image";
import Link from "next/link";
import { content, getRealLinks } from "@/lib/content";
import { buildContours, buildRasters } from "@/lib/terrain";
import { HeroStage } from "./HeroStage";

const ink = "rgb(var(--ink))";

/** Four corner ticks that frame the portrait like a scene chip. */
function Ticks() {
  const common = { stroke: "rgb(var(--ink))", strokeWidth: 2, fill: "none" } as const;
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)]">
      <path d="M0 14V0h14" {...common} />
      <path d="M86 0h14v14" {...common} />
      <path d="M100 86v14H86" {...common} />
      <path d="M14 100H0V86" {...common} />
    </svg>
  );
}

export function Hero() {
  const { person } = content;
  const links = getRealLinks();
  const contours = buildContours();
  const r = buildRasters();
  const pitch = person.headline.split("|").map((s) => s.trim());
  const [first, last] = person.name.split(" ");

  const base = (
    <>
      <path d={r.shadeLight} style={{ fill: ink }} fillOpacity={0.05} />
      <path d={r.shadeMid} style={{ fill: ink }} fillOpacity={0.09} />
      <path d={r.shadeDark} style={{ fill: ink }} fillOpacity={0.14} />
      <path d={contours.minor} fill="none" style={{ stroke: ink }} strokeOpacity={0.26} strokeWidth={1} />
      <path d={contours.major} fill="none" style={{ stroke: ink }} strokeOpacity={0.5} strokeWidth={1.6} />
    </>
  );
  const water = <path d={r.water} style={{ fill: "rgb(var(--water))" }} fillOpacity={0.55} />;
  const flood = <path d={r.flood} style={{ fill: "rgb(var(--nir-graphic))" }} fillOpacity={0.42} />;

  return (
    <section aria-labelledby="hero-title">
      <HeroStage base={base} water={water} flood={flood}>
        <div className="flex flex-1 flex-col justify-between gap-16 px-4 pb-10 pt-10 sm:px-6 lg:px-10 lg:pt-12">
          <div className="flex items-start justify-between gap-6">
            <div className="enter halo max-w-md" style={{ ["--i" as string]: 0 }}>
              <p className="font-display text-d2 font-bold font-condensed text-ink">{person.currentRole.title}</p>
              <p className="mt-1 text-[1.0625rem] leading-snug text-ink">{person.currentRole.institution}</p>
              <p className="mt-1 text-[0.9375rem] leading-snug text-ink-soft">{person.currentRole.organization}</p>
            </div>

            <figure className="enter shrink-0" style={{ ["--i" as string]: 1 }}>
              <div className="relative h-24 w-24 sm:h-44 sm:w-44">
                <div className="relative h-full w-full overflow-hidden border border-ink bg-panel">
                  <Image
                    src={(person.photo ?? "/images/profile.jpg").replace(/\.jpg$/, "-chip.jpg")}
                    alt={`Portrait of ${person.name}`}
                    fill
                    priority
                    sizes="176px"
                    className="object-cover"
                    style={{ objectPosition: "50% 58%" }}
                  />
                </div>
                <Ticks />
              </div>
              <figcaption className="label halo mt-4 hidden max-w-44 text-ink sm:block">
                {person.location.split(",").slice(0, 2).join(",")}
              </figcaption>
            </figure>
          </div>

          <div>
            <h1 id="hero-title" className="text-hero font-bold font-condensed text-ink">
              <span className="enter block" style={{ ["--i" as string]: 2 }}>
                {first}
              </span>
              <span className="enter block" style={{ ["--i" as string]: 3 }}>
                {last}
              </span>
            </h1>
            <ul
              className="enter halo mt-8 flex max-w-3xl flex-wrap gap-x-5 gap-y-1 font-display text-[1.125rem] font-semibold font-condensed text-ink"
              style={{ ["--i" as string]: 4 }}
            >
              {pitch.map((p, i) => (
                <li key={p} className={i > 0 ? "relative pl-5 before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-ink" : ""}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </HeroStage>

      <div className="bg-console text-console-ink">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 sm:px-6 lg:px-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-display text-[1rem] font-semibold font-condensed text-console-ink underline decoration-console-ink/30 underline-offset-4 transition-colors duration-150 ease-state hover:text-console-water hover:decoration-console-water"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={content.cv.path}
                download
                className="inline-flex min-h-11 items-center font-display text-[1rem] font-semibold font-condensed text-console-ink underline decoration-console-ink/30 underline-offset-4 transition-colors duration-150 ease-state hover:text-console-water hover:decoration-console-water"
              >
                {content.cv.label}
              </a>
            </li>
          </ul>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center bg-console-swir px-5 font-display text-[1rem] font-bold font-condensed text-console transition-[transform,background-color] duration-150 ease-state hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
