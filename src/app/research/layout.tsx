import { PageBody, PageHeader } from "@/components/layout/PageHeader";
import { ResearchTabs } from "@/components/research/ResearchTabs";

/**
 * The header and tabs persist across tab changes, so they enter once on load.
 * Each tab's page root uses .tab-in: its first rows rise in on a stagger on every switch.
 */
export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader page="research">
        <ResearchTabs />
      </PageHeader>
      <PageBody className="px-4 pb-16 pt-12 sm:px-6 lg:px-10 lg:pb-24">{children}</PageBody>
    </>
  );
}
