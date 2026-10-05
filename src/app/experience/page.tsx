import type { Metadata } from "next";
import { content } from "@/lib/content";
import { PageBody, PageHeader } from "@/components/layout/PageHeader";
import { ExperienceLedger } from "@/components/sections/ExperienceLedger";

export const metadata: Metadata = {
  title: "Experience",
  description: `Academic, research, and professional experience for ${content.person.name}.`,
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader page="experience" />
      <PageBody className="border-t border-rule px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <ExperienceLedger headingAs="h1" showTitle={false} defaultOpen />
      </PageBody>
    </>
  );
}
