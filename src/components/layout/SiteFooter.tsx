import { content, getRealLinks } from "@/lib/content";
import { ExternalLinkIcon, MailIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  const links = getRealLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-border dark:border-border-dark">
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg text-ink dark:text-paper">{content.person.name}</p>
            <p className="mt-1 text-sm text-ink-soft dark:text-paper/60">
              {content.person.shortHeadline}
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a
                href={`mailto:${content.person.email}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-teal dark:text-paper/70 dark:hover:text-teal-light"
              >
                <MailIcon width={16} height={16} />
                Email
              </a>
            </li>
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-teal dark:text-paper/70 dark:hover:text-teal-light"
                >
                  <ExternalLinkIcon width={16} height={16} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-xs text-ink-soft/70 dark:text-paper/40">
          © {year} {content.person.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
