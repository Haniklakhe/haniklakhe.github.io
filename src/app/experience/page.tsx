import type { Metadata } from "next";
import { content } from "@/lib/content";
import { ExperienceLedger } from "@/components/sections/ExperienceLedger";

export const metadata: Metadata = {
  title: "Experience",
  description: `Academic, research, and professional experience for ${content.person.name}.`,
};

export default function ExperiencePage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <ExperienceLedger headingAs="h1" defaultOpen />
    </div>
  );
}
