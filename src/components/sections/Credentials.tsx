import { content, isPlaceholder } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tile } from "@/components/ui/Tile";

export function Credentials({ headingAs = "h2" as "h1" | "h2" }) {
  const { education, awards, languages } = content;
  return (
    <section id="credentials" aria-labelledby="cred-title" className="scroll-mt-4">
      <SectionTitle id="cred-title" as={headingAs}>
        Education and awards
      </SectionTitle>
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <Tile className="lg:col-span-7">
          <h3 className="font-display text-[1.375rem] font-bold font-condensed">Education</h3>
          <ul className="mt-4">
            {education.map((edu) => (
              <li key={edu.id} className="grid gap-x-6 gap-y-1 border-t border-rule py-4 first:border-t-0 first:pt-0 sm:grid-cols-[8rem_1fr]">
                <p className="label text-ink-soft">{edu.period}</p>
                <div>
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-ink-soft">{edu.institution}</p>
                  {(edu.gpa || edu.funding) && (
                    <p className="mt-1 text-[0.9375rem] text-ink-soft">
                      {edu.gpa && <>GPA {edu.gpa}</>}
                      {edu.gpa && edu.funding && <> · </>}
                      {edu.funding}
                    </p>
                  )}
                  {edu.thesis && (
                    <p className="mt-2 text-[0.9375rem] leading-snug">
                      <span className="font-semibold">Thesis: </span>
                      {edu.thesis.title}
                      {edu.thesis.advisor && <span className="text-ink-soft"> (advisor {edu.thesis.advisor}</span>}
                      {edu.thesis.grade && <span className="text-ink-soft">, grade {edu.thesis.grade}</span>}
                      {edu.thesis.advisor && <span className="text-ink-soft">)</span>}
                    </p>
                  )}
                  {edu.notes && <p className="mt-2 text-[0.9375rem] text-ink-soft">{edu.notes}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Tile>

        <div className="flex flex-col gap-6 lg:col-span-5 lg:mt-12">
          <Tile>
            <h3 className="font-display text-[1.375rem] font-bold font-condensed">Awards</h3>
            <ul className="mt-4">
              {awards.map((a) => (
                <li key={a.id} className="border-t border-rule py-3 first:border-t-0 first:pt-0">
                  <p className="font-semibold leading-snug">{a.name}</p>
                  <p className="text-[0.9375rem] text-ink-soft">
                    {[a.role, isPlaceholder(a.issuer) ? null : a.issuer, isPlaceholder(String(a.year)) ? null : a.year]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </Tile>
          <Tile tone="ground">
            <h3 className="font-display text-[1.375rem] font-bold font-condensed">Languages</h3>
            <p className="mt-2">{languages.map((l) => l.name).join(", ")}</p>
          </Tile>
        </div>
      </div>
    </section>
  );
}
