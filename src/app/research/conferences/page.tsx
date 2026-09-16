import type { Metadata } from "next";
import { content, isPlaceholder } from "@/lib/content";
import { groupByYearDesc } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Conference Presentations",
  description: `Conference presentations and proceedings by ${content.person.name}.`,
};

export default function ConferencesPage() {
  const grouped = groupByYearDesc(content.conferences);

  return (
    <div className="space-y-12">
      {grouped.map(([year, entries]) => (
        <section key={year}>
          <h3 className="font-display text-2xl text-ink dark:text-paper">{year}</h3>
          <div className="mt-4 space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} as="article">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="amber" className="text-xs">
                    {entry.role}
                  </Chip>
                  <span className="text-xs font-medium text-ink-soft dark:text-paper/60">
                    {entry.date}
                  </span>
                </div>
                <p className="mt-3 font-display text-lg text-ink dark:text-paper">{entry.title}</p>
                <p className="mt-1 text-sm text-ink-soft dark:text-paper/70">{entry.authors}</p>
                <p className="mt-1 text-sm italic text-ink-soft dark:text-paper/60">
                  {entry.conference}
                  {entry.reference && <>, {entry.reference}</>}
                  {!isPlaceholder(entry.location) && <> · {entry.location}</>}
                </p>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
