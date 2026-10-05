import type { Metadata } from "next";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research Interests",
  description: `Research interests of ${content.person.name}.`,
};

export default function ResearchInterestsPage() {
  return (
    <ul>
      {content.researchInterests.map((r) => (
        <li key={r.id} className="grid gap-x-10 gap-y-2 border-b border-rule py-6 lg:grid-cols-12">
          <h2 className="text-d2 text-ink lg:col-span-6">{r.title}</h2>
          <p className="max-w-[60ch] text-ink-soft lg:col-span-5 lg:col-start-8">{r.description}</p>
        </li>
      ))}
    </ul>
  );
}
