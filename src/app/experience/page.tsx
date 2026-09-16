import type { Metadata } from "next";
import { content } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceItem } from "@/components/experience/ExperienceItem";

export const metadata: Metadata = {
  title: "Experience",
  description: `Academic, research, and professional experience timeline for ${content.person.name}.`,
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Timeline"
        title="Experience"
        description="Academic, research, and professional activities, most recent first."
      />

      <ol className="mt-10 max-w-3xl space-y-10 border-l-2 border-teal/25 pl-0 dark:border-teal-light/25">
        {content.experience.map((entry) => (
          <ExperienceItem key={entry.id} entry={entry} />
        ))}
      </ol>
    </div>
  );
}
