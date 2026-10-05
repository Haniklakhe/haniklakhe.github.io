import { content, isPlaceholder } from "@/lib/content";
import { parsePeriod } from "@/lib/utils";
import type { ExperienceEntry } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

function range(entry: ExperienceEntry): { start: number; end: number } | null {
  if (entry.period && !isPlaceholder(entry.period)) return parsePeriod(entry.period);
  const parts = (entry.roles ?? []).map((r) => parsePeriod(r.period)).filter(Boolean) as { start: number; end: number }[];
  if (parts.length === 0) return null;
  return { start: Math.min(...parts.map((p) => p.start)), end: Math.max(...parts.map((p) => p.end)) };
}

/** Thin track showing where an engagement sits on the shared 2019 to now axis. */
function Track({ r, axis, current }: { r: { start: number; end: number }; axis: { min: number; max: number }; current: boolean }) {
  const span = axis.max - axis.min;
  const left = ((r.start - axis.min) / span) * 100;
  const width = Math.max(((r.end - r.start) / span) * 100, 1.5);
  return (
    <div aria-hidden="true" className="relative mt-2 h-2 w-full bg-rule/70">
      <span
        className={`absolute inset-y-0 ${current ? "bg-nir-graphic" : "bg-water"}`}
        style={{ left: `${left}%`, width: `${width}%` }}
      />
    </div>
  );
}

export function ExperienceLedger({
  headingAs = "h2" as "h1" | "h2",
  defaultOpen = false,
}: {
  headingAs?: "h1" | "h2";
  defaultOpen?: boolean;
}) {
  const entries = content.experience;
  const EntryHeading = headingAs === "h1" ? "h2" : "h3";
  const ranges = entries.map(range);
  const valid = ranges.filter(Boolean) as { start: number; end: number }[];
  const axis = {
    min: Math.floor(Math.min(...valid.map((r) => r.start))),
    max: Math.max(...valid.map((r) => r.end)),
  };
  const years: number[] = [];
  for (let y = axis.min; y <= Math.floor(axis.max); y++) years.push(y);

  return (
    <section id="experience" aria-labelledby="exp-title" className="scroll-mt-4">
      <SectionTitle
        id="exp-title"
        as={headingAs}
        note="Most recent first. The bar under each period shows where it falls between 2019 and today."
      >
        Experience
      </SectionTitle>

      <ol>
        {entries.map((e, i) => {
          const r = ranges[i];
          const showLocation = !isPlaceholder(e.location);
          const periodText = e.period && !isPlaceholder(e.period) ? e.period : null;
          return (
            <li key={e.id} className="sr grid gap-x-10 gap-y-3 border-b border-rule py-7 lg:grid-cols-12">
              <div className="lg:col-span-3">
                {periodText && <p className="label text-ink">{periodText}</p>}
                {e.totalDuration && <p className="label text-ink-soft">{e.totalDuration}</p>}
                {e.current && <p className="label mt-1 text-nir">Current role</p>}
                {r && <Track r={r} axis={axis} current={e.current} />}
                {i === 0 && (
                  <div aria-hidden="true" className="mt-1 flex justify-between text-[0.75rem] leading-none text-ink-soft">
                    <span>{axis.min}</span>
                    <span>{Math.floor(axis.max)}</span>
                  </div>
                )}
              </div>
              <div className="lg:col-span-9">
                <EntryHeading className="text-d2 max-w-[28ch] text-ink">{e.organization}</EntryHeading>
                {e.title && <p className="mt-1 font-display text-[1.125rem] font-semibold font-condensed text-water">{e.title}</p>}
                {showLocation && <p className="mt-0.5 text-[0.9375rem] text-ink-soft">{e.location}</p>}

                {e.roles && e.roles.length > 0 && (
                  <ul className="mt-3 max-w-xl border-l-2 border-rule pl-4">
                    {e.roles.map((role) => (
                      <li key={role.title} className="flex flex-wrap justify-between gap-x-6 py-0.5 text-[1rem]">
                        <span className="font-semibold text-ink">{role.title}</span>
                        <span className="text-ink-soft">{role.period}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {e.bullets && e.bullets.length > 0 && (
                  <Reveal
                    defaultOpen={defaultOpen}
                    labelOpen={`Responsibilities and outcomes (${e.bullets.length})`}
                    labelClose="Hide details"
                  >
                    <ul className="mt-3 max-w-[70ch] list-disc space-y-2 pl-5 leading-snug text-ink-soft marker:text-ink-soft">
                      {e.bullets.map((b, k) => (
                        <li key={k}>{b}</li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <span className="sr-only">{years.length} calendar years covered</span>
    </section>
  );
}
