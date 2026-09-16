import type { Metadata } from "next";
import { content, isPlaceholder } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillRow } from "@/components/ui/SkillRow";
import { WaterlineDivider } from "@/components/ui/WaterlineDivider";

export const metadata: Metadata = {
  title: "About",
  description: `Biography, education, skills, and awards for ${content.person.name}.`,
};

export default function AboutPage() {
  const { person, biography, education, skills, languages, awards, certifications } = content;

  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 sm:grid-cols-[minmax(240px,320px)_1fr] sm:items-stretch">
        <div className="relative h-72 w-full sm:h-auto">
          <Avatar name={person.name} src={person.photo} fill className="mx-auto sm:mx-0" />
        </div>
        <div>
          <SectionHeading eyebrow="About" title="Biography" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft dark:text-paper/80">
            {biography}
          </p>
        </div>
      </div>

      <WaterlineDivider className="my-14 max-w-3xl" />

      <SectionHeading eyebrow="Academic Background" title="Education" />
      <div className="mt-8 space-y-6">
        {education.map((edu) => (
          <Card key={edu.id}>
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="font-display text-xl text-ink dark:text-paper">{edu.institution}</h3>
              <span className="text-sm font-medium text-teal dark:text-teal-light">{edu.period}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-ink-soft dark:text-paper/70">{edu.degree}</p>
            <p className="text-xs text-ink-soft/80 dark:text-paper/50">{edu.location}</p>

            <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-soft dark:text-paper/70">
              {edu.gpa && (
                <div className="flex gap-1">
                  <dt className="font-medium text-ink dark:text-paper">GPA:</dt>
                  <dd>{edu.gpa}</dd>
                </div>
              )}
              {edu.funding && (
                <div className="flex gap-1">
                  <dt className="font-medium text-ink dark:text-paper">Funding:</dt>
                  <dd>{edu.funding}</dd>
                </div>
              )}
              {edu.honors && (
                <div className="flex gap-1">
                  <dt className="font-medium text-ink dark:text-paper">Honors:</dt>
                  <dd>{edu.honors}</dd>
                </div>
              )}
            </dl>

            {edu.thesis && (
              <div className="mt-4 rounded-lg border border-border bg-paper p-4 dark:border-border-dark dark:bg-deep">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal dark:text-teal-light">
                  Thesis
                </p>
                <p className="mt-1 text-sm font-medium text-ink dark:text-paper">
                  {edu.thesis.title}
                </p>
                <p className="mt-1 text-xs text-ink-soft dark:text-paper/60">
                  {edu.thesis.advisor && <>Advisor: {edu.thesis.advisor}</>}
                  {edu.thesis.grade && <> · Grade: {edu.thesis.grade}</>}
                </p>
                {edu.thesis.tools && edu.thesis.tools.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {edu.thesis.tools.map((tool) => (
                      <li key={tool}>
                        <Chip tone="neutral" className="text-xs">
                          {tool}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {edu.notes && (
              <p className="mt-3 text-xs text-ink-soft dark:text-paper/60">{edu.notes}</p>
            )}
          </Card>
        ))}
      </div>

      <WaterlineDivider className="my-14 max-w-3xl" />

      <SectionHeading
        eyebrow="Capabilities"
        title="Technical Skills"
        description="Grouped by domain. Where a proficiency level isn't self-rated in the source CV, only the tool name is shown."
      />
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {skills.map((group) => {
          const hasLevels = group.items.some((item) => item.level);
          return (
            <Card key={group.category}>
              <h3 className="font-display text-lg text-ink dark:text-paper">{group.category}</h3>
              {hasLevels ? (
                <div className="mt-3">
                  {group.items.map((item) => (
                    <SkillRow key={item.name} name={item.name} level={item.level} />
                  ))}
                </div>
              ) : (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Chip tone="neutral" className="text-xs">
                        {item.name}
                      </Chip>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>

      <WaterlineDivider className="my-14 max-w-3xl" />

      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Fluency" title="Languages" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {languages.map((lang) => (
              <li key={lang.name}>
                <Chip tone="teal">{lang.name}</Chip>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading eyebrow="Recognition" title="Awards" />
          <ul className="mt-6 space-y-4">
            {awards.map((award) => (
              <li key={award.id} className="border-l-2 border-amber/60 pl-4 dark:border-amber/50">
                <p className="font-medium text-ink dark:text-paper">{award.name}</p>
                <p className="text-sm text-ink-soft dark:text-paper/60">
                  {award.role}
                  {!isPlaceholder(award.issuer) && <> · {award.issuer}</>}
                  {!isPlaceholder(String(award.year)) && <> · {award.year}</>}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {certifications.length > 0 && (
        <>
          <WaterlineDivider className="my-14 max-w-3xl" />
          <SectionHeading eyebrow="Credentials" title="Certifications" />
        </>
      )}
    </div>
  );
}
