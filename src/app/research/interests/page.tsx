import type { Metadata } from "next";
import { content } from "@/lib/content";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Research Interests",
  description: `Research interests of ${content.person.name}.`,
};

export default function ResearchInterestsPage() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {content.researchInterests.map((interest) => (
        <Card key={interest.id} as="article">
          <h3 className="font-display text-lg text-ink dark:text-paper">{interest.title}</h3>
          <p className="mt-2 text-sm text-ink-soft dark:text-paper/70">{interest.description}</p>
        </Card>
      ))}
    </div>
  );
}
