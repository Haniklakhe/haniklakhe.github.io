import type { Metadata } from "next";
import { content } from "@/lib/content";
import { PageBody, PageHeader } from "@/components/layout/PageHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { Credentials } from "@/components/sections/Credentials";
import { SkillIndex } from "@/components/sections/SkillIndex";

export const metadata: Metadata = {
  title: "About",
  description: `Biography, education, skills, and awards for ${content.person.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader page="about" />
      <PageBody className="space-y-24 px-4 pb-16 pt-4 sm:px-6 lg:space-y-32 lg:px-10 lg:pb-24">
        <AboutSection full />
        <Credentials />
        <SkillIndex />
      </PageBody>
    </>
  );
}
