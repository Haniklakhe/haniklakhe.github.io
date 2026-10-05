import Link from "next/link";
import { content, getRealLinks } from "@/lib/content";

const linkCls =
  "inline-flex min-h-11 items-center font-display text-[1.125rem] font-semibold font-condensed text-console-ink underline decoration-console-ink/30 underline-offset-4 transition-colors duration-150 ease-state hover:text-console-water hover:decoration-console-water";

export function ContactStrip({ headingAs = "h2" as "h1" | "h2" }) {
  const { person, collaborationCTA, cv } = content;
  const links = getRealLinks();
  const H = headingAs;
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-4 bg-console text-console-ink">
      <div className="grid gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-24">
        <div className="lg:col-span-7">
          <H id="contact-title" className="text-d1 text-console-ink">
            {collaborationCTA.heading}
          </H>
          <p className="mt-6 max-w-[56ch] text-[1.25rem] leading-[1.55] text-console-ink/85">{collaborationCTA.body}</p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <a
            href={`mailto:${person.email}`}
            className="inline-block break-all font-display text-[1.75rem] font-bold leading-tight font-condensed text-console-swir underline decoration-console-swir/40 underline-offset-4 transition-colors duration-150 ease-state hover:decoration-console-swir"
          >
            {person.email}
          </a>
          <ul className="mt-6">
            {links.map((l) => (
              <li key={l.key}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={cv.path} download className={linkCls}>
                {cv.label}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-[0.9375rem] text-console-ink/70">{person.location}</p>
          <Link href="/contact" className="sr-only">
            Contact page
          </Link>
        </div>
      </div>
    </section>
  );
}
