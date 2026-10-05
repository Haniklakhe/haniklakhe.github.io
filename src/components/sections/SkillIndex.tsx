import { content } from "@/lib/content";
import type { SkillLevel } from "@/lib/types";
import { SectionTitle } from "@/components/ui/SectionTitle";

const SEGMENTS: Record<Exclude<SkillLevel, null>, number> = { Basic: 1, Intermediate: 2 };

function Level({ level }: { level: Exclude<SkillLevel, null> }) {
  const filled = SEGMENTS[level];
  return (
    <span className="ml-2 inline-flex translate-y-[-1px] gap-[2px] align-middle" role="img" aria-label={`${level} level`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`h-2.5 w-1.5 ${n <= filled ? "bg-water" : "bg-rule"}`} />
      ))}
    </span>
  );
}

export function SkillIndex({ headingAs = "h2" as "h1" | "h2" }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-4">
      <SectionTitle
        id="skills-title"
        as={headingAs}
        note="The bars next to each skill indicate the level of proficiency"
      >
        Tools and methods
      </SectionTitle>
      <div>
        {content.skills.map((g) => (
          <div key={g.category} className="sr grid gap-x-10 gap-y-2 border-b border-rule py-5 lg:grid-cols-12">
            <h3 className="font-display text-[1.375rem] font-bold leading-tight font-condensed text-ink lg:col-span-4">{g.category}</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 lg:col-span-8">
              {g.items.map((item) => (
                <li key={item.name} className="text-[1.0625rem]">
                  {item.name}
                  {item.level && <Level level={item.level} />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
