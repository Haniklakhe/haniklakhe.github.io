import { content, isPlaceholder } from "@/lib/content";
import { groupByYearDesc } from "@/lib/utils";
import type { Publication } from "@/lib/types";
import { CopyCitationButton } from "@/components/research/CopyCitationButton";
import { HighlightedAuthors } from "@/components/research/HighlightedAuthors";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function buildCitation(pub: Publication): string {
  const doiPart = isPlaceholder(pub.doi) ? "" : ` ${pub.doi}`;
  return `${pub.authors} (${pub.year}). ${pub.title} ${pub.venue}, ${pub.volumeInfo}.${doiPart}`;
}

export function PubList({ headingAs = "h2" as "h1" | "h2", showTitle = true }) {
  const ItemHeading = showTitle ? "h3" : "h2";
  const grouped = groupByYearDesc(content.publications);
  return (
    <section id="publications" aria-labelledby="pubs-title" className="scroll-mt-4">
      {showTitle && (
        <SectionTitle id="pubs-title" as={headingAs}>
          Publications
        </SectionTitle>
      )}
      <div>
        {grouped.map(([year, pubs]) =>
          pubs.map((pub, i) => (
            <article key={pub.id} className="grid gap-x-8 gap-y-3 border-b border-rule py-7 lg:grid-cols-[6rem_minmax(0,1fr)_auto]">
              <p className="font-display text-[2.5rem] font-bold leading-none font-condensed text-ink" aria-label={i === 0 ? `Year ${year}` : undefined}>
                {i === 0 ? year : <span className="sr-only">{year}</span>}
              </p>
              <div>
                <ItemHeading className="font-body text-[1.25rem] font-semibold leading-snug text-ink" style={{ fontStretch: "100%", letterSpacing: 0 }}>
                  {pub.title}
                </ItemHeading>
                <p className="mt-2 max-w-[70ch] text-[1rem] leading-snug text-ink-soft">
                  <HighlightedAuthors authors={pub.authors} highlight={pub.authorHighlight} />
                </p>
                <p className="mt-1 text-[1rem] italic text-ink-soft">
                  {pub.venue}, {pub.volumeInfo}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-3 lg:justify-end">
                {!isPlaceholder(pub.doi) && (
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-display text-[1rem] font-semibold font-condensed text-water underline decoration-water/40 underline-offset-4 transition-colors duration-150 ease-state hover:decoration-water"
                  >
                    View DOI
                  </a>
                )}
                <CopyCitationButton citation={buildCitation(pub)} />
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
