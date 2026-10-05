import { SectionTitle } from "@/components/ui/SectionTitle";
import { ResearchTabs } from "@/components/research/ResearchTabs";

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <SectionTitle as="h1" note="Interests, projects, publications and conference presentations.">
        Research
      </SectionTitle>
      <div className="mt-6">
        <ResearchTabs />
      </div>
      <div className="mt-12">{children}</div>
    </div>
  );
}
