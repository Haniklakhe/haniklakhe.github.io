import type { Metadata } from "next";
import { content, isPlaceholder } from "@/lib/content";
import { groupByYearDesc } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Conference Presentations",
  description: `Conference presentations and proceedings by ${content.person.name}.`,
};

export default function ConferencesPage() {
  const grouped = groupByYearDesc(content.conferences);
  return (
    <div className="tab-in">
      {grouped.map(([year, entries]) =>
        entries.map((e, i) => (
          <article key={e.id} className="sr row-nudge grid gap-x-8 gap-y-3 border-b border-rule py-7 lg:grid-cols-[6rem_minmax(0,1fr)_14rem]">
            <p className="sr-x font-display text-[2.5rem] font-bold leading-none font-condensed text-ink">
              {i === 0 ? year : <span className="sr-only">{year}</span>}
            </p>
            <div>
              <h2 className="nudge font-body text-[1.25rem] font-semibold leading-snug text-ink" style={{ fontStretch: "100%", letterSpacing: 0 }}>
                {e.title}
              </h2>
              <p className="mt-2 max-w-[70ch] text-[1rem] leading-snug text-ink-soft">{e.authors}</p>
              <p className="mt-1 text-[1rem] italic text-ink-soft">
                {e.conference}
                {e.reference && <>, {e.reference}</>}
                {!isPlaceholder(e.location) && <> · {e.location}</>}
              </p>
            </div>
            <div className="lg:text-right">
              <p className="label text-ink">{e.role}</p>
              <p className="label text-ink-soft">{e.date}</p>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
