import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResearchTabs } from "@/components/research/ResearchTabs";

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Research"
        title="Research"
        description="Interests, projects, publications, and conference presentations."
      />
      <div className="mt-8">
        <ResearchTabs />
      </div>
      <div className="mt-10">{children}</div>
    </div>
  );
}
