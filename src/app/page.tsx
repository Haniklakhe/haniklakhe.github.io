import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { InterestsIndex } from "@/components/sections/InterestsIndex";
import { FeaturedMosaic } from "@/components/sections/FeaturedMosaic";
import { PubList } from "@/components/sections/PubList";
import { ExperienceLedger } from "@/components/sections/ExperienceLedger";
import { SkillIndex } from "@/components/sections/SkillIndex";
import { Credentials } from "@/components/sections/Credentials";
import { ContactStrip } from "@/components/sections/ContactStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="space-y-24 px-4 py-20 sm:px-6 lg:space-y-32 lg:px-10 lg:py-28">
        <AboutSection />
        <div className="space-y-20 lg:space-y-24">
          <InterestsIndex />
          <FeaturedMosaic />
        </div>
        <PubList />
        <ExperienceLedger />
        <SkillIndex />
        <Credentials />
      </div>
      <ContactStrip />
    </>
  );
}
