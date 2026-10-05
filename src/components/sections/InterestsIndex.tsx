import { content } from "@/lib/content";
import { MotionFigure } from "@/components/ui/MotionFigure";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function InterestsIndex({ headingAs = "h2" as "h1" | "h2" }) {
  return (
    <section id="interests" aria-labelledby="interests-title" className="scroll-mt-4">
      <SectionTitle id="interests-title" as={headingAs}>
        Research interests
      </SectionTitle>
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <ul className="lg:col-span-8">
          {content.researchInterests.map((r) => (
            <li key={r.id} className="sr row-nudge grid gap-x-8 gap-y-2 border-b border-rule py-6 xl:grid-cols-2">
              <h3 className="nudge text-d2 text-ink">
                {r.title}
              </h3>
              <p className="max-w-[60ch] text-ink-soft">{r.description}</p>
            </li>
          ))}
        </ul>
        <div className="lg:col-span-4 lg:pt-6">
          <MotionFigure
            className="lg:sticky lg:top-8"
            mp4="/media/flood-rise.mp4"
            webm="/media/flood-rise.webm"
            poster="/media/flood-rise-poster.webp"
            caption="An illustrative flood rises over a river as its hydrograph peaks and recedes. Terrain and curve are made for this page, not measured data."
          />
        </div>
      </div>
    </section>
  );
}
