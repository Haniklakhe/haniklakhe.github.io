import Link from "next/link";
import { content } from "@/lib/content";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tile } from "@/components/ui/Tile";

export function FeaturedMosaic() {
  const { featuredResearchHighlights: hl, researchProjects: projects } = content;
  const items = hl.map((h) => ({ h, p: projects.find((p) => p.id === h.refId) }));
  const [lead, ...rest] = items;
  return (
    <section id="featured" aria-labelledby="featured-title" className="scroll-mt-4">
      <SectionTitle
        id="featured-title"
        note={
          <Link
            href="/research/projects"
            className="font-display text-[1rem] font-semibold font-condensed text-water underline decoration-water/40 underline-offset-4 hover:decoration-water"
          >
            All {projects.length} research projects
          </Link>
        }
      >
        Selected work
      </SectionTitle>
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {lead && (
          <Tile as="article" interactive flush className="flex flex-col lg:col-span-7 lg:row-span-2">
            <PhotoFrame
              src={lead.p?.image}
              alt={lead.h.title}
              className="aspect-[4/3] w-full border-0 border-b lg:aspect-auto lg:min-h-[22rem] lg:flex-1"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="p-6 sm:p-8">
              <p className="label text-ink-soft">{lead.h.label}</p>
              <h3 className="text-d2 mt-2 text-ink">{lead.h.title}</h3>
              <p className="mt-3 max-w-[56ch] text-ink-soft">{lead.h.blurb}</p>
            </div>
          </Tile>
        )}
        {rest.map(({ h, p }) => (
          <Tile as="article" interactive key={h.refId} className="grid content-start gap-5 p-5 sm:p-6 lg:col-span-5">
            <PhotoFrame src={p?.image} alt={h.title} className="aspect-[16/9] w-full" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div>
              <p className="label text-ink-soft">{h.label}</p>
              <h3 className="mt-1 font-display text-[1.375rem] font-bold leading-tight font-condensed text-ink">{h.title}</h3>
              <p className="mt-2 text-[1rem] leading-snug text-ink-soft">{h.blurb}</p>
            </div>
          </Tile>
        ))}
      </div>
    </section>
  );
}
