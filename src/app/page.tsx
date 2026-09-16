import Link from "next/link";
import { content, getRealLinks } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaterlineDivider } from "@/components/ui/WaterlineDivider";
import { ContourBackground } from "@/components/ui/ContourBackground";
import { ArrowRightIcon, ExternalLinkIcon, MailIcon } from "@/components/ui/Icons";

export default function HomePage() {
  const {
    person,
    homeSummary,
    researchInterests,
    researchProjects,
    featuredResearchHighlights,
    collaborationCTA,
  } = content;
  const links = getRealLinks();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border dark:border-border-dark">
        <ContourBackground />
        <div className="relative mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <Avatar name={person.name} src={person.photo} size={200} className="shrink-0" />
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber/50 bg-amber-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink dark:border-amber/40 dark:bg-amber/20 dark:text-amber-soft">
                {person.currentRole.title} · {person.currentRole.organization}
              </p>
              <h1 className="font-display text-4xl font-medium leading-tight text-ink dark:text-paper sm:text-5xl">
                {person.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-ink-soft dark:text-paper/70">
                {person.headline}
              </p>
              <p className="mt-2 text-sm text-ink-soft dark:text-paper/60">
                {person.location} · {person.academicStatus}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/research"
                  className="inline-flex items-center gap-1.5 rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink dark:bg-teal-light dark:text-deep dark:hover:bg-paper"
                >
                  View Research
                  <ArrowRightIcon width={16} height={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-teal hover:text-teal dark:border-border-dark dark:text-paper dark:hover:border-teal-light dark:hover:text-teal-light"
                >
                  <MailIcon width={16} height={16} />
                  Get in Touch
                </Link>
                {links.map((link) => (
                  <a
                    key={link.key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:text-teal dark:text-paper/70 dark:hover:text-teal-light"
                  >
                    <ExternalLinkIcon width={15} height={15} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaterlineDivider className="mx-auto max-w-content" />

      {/* About Me summary */}
      <section className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-base leading-relaxed text-ink-soft dark:text-paper/80">
          {homeSummary}
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-ink dark:text-teal-light dark:hover:text-paper"
        >
          Read full biography
          <ArrowRightIcon width={16} height={16} />
        </Link>
      </section>

      <WaterlineDivider className="mx-auto max-w-content" />

      {/* Research interests */}
      <section className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Focus Areas" title="Research Interests" />
        <ul className="mt-6 flex flex-wrap gap-3">
          {researchInterests.map((interest) => (
            <li key={interest.id}>
              <Chip tone="teal" className="text-sm">
                {interest.title}
              </Chip>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured research highlights */}
      <section className="border-t border-border bg-paper-raised/60 dark:border-border-dark dark:bg-deep-raised/40">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured Research"
            description="A few highlights from ongoing and recent research work — see the full list under Research."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredResearchHighlights.map((highlight) => {
              const project = researchProjects.find((p) => p.id === highlight.refId);
              return (
                <Card key={highlight.refId} as="article">
                  <PhotoFrame
                    src={project?.image}
                    alt={highlight.title}
                    className="mb-4 aspect-[4/3] w-full"
                  />
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal dark:text-teal-light">
                    {highlight.label}
                  </p>
                  <h3 className="mt-2 font-display text-lg text-ink dark:text-paper">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft dark:text-paper/70">{highlight.blurb}</p>
                </Card>
              );
            })}
          </div>
          <Link
            href="/research/projects"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-ink dark:text-teal-light dark:hover:text-paper"
          >
            See all research projects
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <Card
          tone="inverted"
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="font-display text-2xl text-paper">{collaborationCTA.heading}</h2>
            <p className="mt-2 max-w-xl text-sm text-paper/80">{collaborationCTA.body}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-amber px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-soft"
          >
            Contact Me
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </Card>
      </section>
    </>
  );
}
