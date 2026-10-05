import type { Metadata } from "next";
import { content } from "@/lib/content";
import { AboutSection } from "@/components/sections/AboutSection";
import { Credentials } from "@/components/sections/Credentials";
import { SkillIndex } from "@/components/sections/SkillIndex";

export const metadata: Metadata = {
  title: "About",
  description: `Biography, education, skills, and awards for ${content.person.name}.`,
};

export default function AboutPage() {
  return (
    <div className="space-y-24 px-4 py-16 sm:px-6 lg:space-y-32 lg:px-10 lg:py-24">
      <AboutSection full />
      <Credentials />
      <SkillIndex />
    </div>
  );
}
