import type { Metadata } from "next";
import Image from "next/image";
import { content } from "@/lib/content";
import { AboutSection } from "@/components/sections/AboutSection";
import { Credentials } from "@/components/sections/Credentials";
import { SkillIndex } from "@/components/sections/SkillIndex";

export const metadata: Metadata = {
  title: "About",
  description: `Biography, education, skills, and awards for ${content.person.name}.`,
};

export default function AboutPage() {
  const { person } = content;
  return (
    <div className="space-y-24 px-4 py-16 sm:px-6 lg:space-y-32 lg:px-10 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        {person.photo && (
          <div className="relative aspect-[4/5] w-full max-w-sm border border-ink lg:col-span-4">
            <Image
              src={person.photo}
              alt={`Portrait of ${person.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 28vw, 90vw"
              className="object-cover"
              style={{ objectPosition: "50% 55%" }}
            />
          </div>
        )}
        <div className="lg:col-span-8">
          <AboutSection full />
        </div>
      </div>
      <Credentials />
      <SkillIndex />
    </div>
  );
}
