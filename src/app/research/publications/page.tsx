import type { Metadata } from "next";
import { content, isPlaceholder } from "@/lib/content";
import { groupByYearDesc } from "@/lib/utils";
import type { Publication } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { CopyCitationButton } from "@/components/research/CopyCitationButton";
import { HighlightedAuthors } from "@/components/research/HighlightedAuthors";
import { ExternalLinkIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Publications",
  description: `Peer-reviewed publications by ${content.person.name}.`,
};

function buildCitation(pub: Publication): string {
  const doiPart = isPlaceholder(pub.doi) ? "" : ` ${pub.doi}`;
  return `${pub.authors} (${pub.year}). ${pub.title} ${pub.venue}, ${pub.volumeInfo}.${doiPart}`;
}

export default function PublicationsPage() {
  const grouped = groupByYearDesc(content.publications);

  return (
    <div className="space-y-12">
      {grouped.map(([year, pubs]) => (
        <section key={year}>
          <h3 className="font-display text-2xl text-ink dark:text-paper">{year}</h3>
          <div className="mt-4 space-y-4">
            {pubs.map((pub) => (
              <Card key={pub.id} as="article">
                <p className="text-sm text-ink-soft dark:text-paper/70">
                  <HighlightedAuthors authors={pub.authors} highlight={pub.authorHighlight} />
                </p>
                <p className="mt-2 font-display text-lg text-ink dark:text-paper">{pub.title}</p>
                <p className="mt-1 text-sm italic text-ink-soft dark:text-paper/60">
                  {pub.venue}, {pub.volumeInfo}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {!isPlaceholder(pub.doi) && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-ink dark:text-teal-light dark:hover:text-paper"
                    >
                      <ExternalLinkIcon width={15} height={15} />
                      View DOI
                    </a>
                  )}
                  <CopyCitationButton citation={buildCitation(pub)} />
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
