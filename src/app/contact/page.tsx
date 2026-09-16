import type { Metadata } from "next";
import { content, getRealLinks } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DownloadIcon, ExternalLinkIcon, MailIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${content.person.name} — email, professional links, and CV.`,
};

export default function ContactPage() {
  const { person, cv, collaborationCTA } = content;
  const links = getRealLinks();

  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Contact"
        description={collaborationCTA.body}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg text-ink dark:text-paper">Contact Details</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-teal dark:text-paper dark:hover:text-teal-light"
              >
                <MailIcon width={17} height={17} />
                {person.email}
              </a>
            </li>
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-teal dark:text-paper dark:hover:text-teal-light"
                >
                  <ExternalLinkIcon width={16} height={16} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-soft dark:text-paper/50">{person.location}</p>
        </Card>

        <Card className="no-print flex flex-col justify-between">
          <div>
            <h3 className="font-display text-lg text-ink dark:text-paper">Curriculum Vitae</h3>
            <p className="mt-2 text-sm text-ink-soft dark:text-paper/70">
              Download a copy of my full CV for detailed education, experience, and publication
              history.
            </p>
          </div>
          <a
            href={cv.path}
            download
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink dark:bg-teal-light dark:text-deep dark:hover:bg-paper"
          >
            <DownloadIcon width={16} height={16} />
            {cv.label}
          </a>
        </Card>
      </div>

      <Card tone="amber" className="mt-6">
        <h3 className="font-display text-xl text-ink dark:text-paper">{collaborationCTA.heading}</h3>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft dark:text-paper/80">
          {collaborationCTA.body}
        </p>
      </Card>
    </div>
  );
}
