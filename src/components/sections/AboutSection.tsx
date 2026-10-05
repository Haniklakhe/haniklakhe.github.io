import Image from "next/image";
import Link from "next/link";
import { content, getRealLinks } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tile } from "@/components/ui/Tile";

const linkCls =
  "inline-flex min-h-11 items-center font-display text-[1rem] font-semibold font-condensed text-water underline decoration-water/40 underline-offset-4 transition-[color,transform] duration-150 ease-state hover:decoration-water active:scale-[0.98]";

export function AboutSection({ full = false }: { full?: boolean }) {
  const { homeSummary, biography, person, languages } = content;

  if (full) {
    return (
      <section id="about" aria-labelledby="about-title" className="scroll-mt-4">
        <SectionTitle id="about-title" as="h1">
          About
        </SectionTitle>
        {/* Photo and biography tile share one grid row, so top and bottom edges line up. */}
        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-12">
          {person.photo && (
            <div className="sr relative aspect-[4/5] w-full max-w-sm border border-rule lg:col-span-5 lg:aspect-auto lg:max-w-none">
              <Image
                src={person.photo}
                alt={`Portrait of ${person.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 28vw, 90vw"
                className="object-cover"
                style={{ objectPosition: "50% 62%" }}
              />
            </div>
          )}
          <Tile className={`sr flex flex-col justify-center ${person.photo ? "lg:col-span-7" : "lg:col-span-12"}`}>
            <p className="max-w-[68ch] text-[1.125rem] leading-[1.65]">{biography}</p>
          </Tile>
        </div>
      </section>
    );
  }

  const links = getRealLinks();
  const facts: { k: string; v: string }[] = [
    { k: "Role", v: person.currentRole.title },
    { k: "Institution", v: person.currentRole.institution },
    { k: "Location", v: person.location },
    { k: "Languages", v: languages.map((l) => l.name).join(", ") },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-4">
      <SectionTitle id="about-title">About</SectionTitle>
      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-12">
        <Tile className="sr lg:col-span-7">
          <p className="max-w-[60ch] text-[1.375rem] leading-[1.55]">{homeSummary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-8">
            <Reveal labelOpen="Read the full biography" labelClose="Show less">
              <p className="mt-4 max-w-[68ch] leading-[1.65] text-ink-soft">{biography}</p>
            </Reveal>
            <Link href="/about" className={linkCls}>
              About, education and skills
            </Link>
          </div>
        </Tile>
        <Tile tone="console" className="sr lg:col-span-5">
          <h3 className="font-display text-[1.375rem] font-bold font-condensed">At a glance</h3>
          <dl className="mt-4">
            {facts.map((f) => (
              <div key={f.k} className="grid gap-x-6 gap-y-0.5 border-t border-console-ink/20 py-3 sm:grid-cols-[7rem_1fr]">
                <dt className="label text-console-ink/70">{f.k}</dt>
                <dd className="text-console-ink">{f.v}</dd>
              </div>
            ))}
            <div className="grid gap-x-6 gap-y-0.5 border-t border-console-ink/20 pt-3 sm:grid-cols-[7rem_1fr]">
              <dt className="label text-console-ink/70">Profiles</dt>
              <dd className="flex flex-wrap gap-x-5">
                {links.map((l) => (
                  <a
                    key={l.key}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-display text-[1rem] font-semibold font-condensed text-console-swir underline decoration-console-swir/40 underline-offset-4 hover:decoration-console-swir"
                  >
                    {l.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Tile>
      </div>
    </section>
  );
}
