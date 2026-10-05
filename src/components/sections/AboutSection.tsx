import Link from "next/link";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tile } from "@/components/ui/Tile";

export function AboutSection({ full = false }: { full?: boolean }) {
  const { homeSummary, biography } = content;
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-4">
      <SectionTitle id="about-title" as={full ? "h1" : "h2"}>
        About
      </SectionTitle>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <Tile className="lg:col-span-8 lg:col-start-3">
          {full ? (
            <p className="max-w-[68ch] text-[1.25rem] leading-[1.6]">{biography}</p>
          ) : (
            <>
              <p className="max-w-[68ch] text-[1.25rem] leading-[1.6]">{homeSummary}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-8">
                <Reveal labelOpen="Read the full biography" labelClose="Show less">
                  <p className="mt-4 max-w-[68ch] leading-[1.65] text-ink-soft">{biography}</p>
                </Reveal>
                <Link
                  href="/about"
                  className="inline-flex min-h-11 items-center font-display text-[1rem] font-semibold font-condensed text-water underline decoration-water/40 underline-offset-4 transition-[color,transform] duration-150 ease-state hover:decoration-water active:scale-[0.98]"
                >
                  About, education and skills
                </Link>
              </div>
            </>
          )}
        </Tile>
      </div>
    </section>
  );
}
