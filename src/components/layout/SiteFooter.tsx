import { content } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print border-t border-rule">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-4 py-8 sm:px-6 lg:px-10">
        <p className="font-display text-[1.125rem] font-bold font-condensed">{content.person.name}</p>
        <p className="text-[0.9375rem] text-ink-soft">
          {content.person.shortHeadline.split("|").map((s) => s.trim()).join(", ")}
        </p>
        <p className="text-[0.9375rem] text-ink-soft">© {year} {content.person.name}</p>
      </div>
    </footer>
  );
}
