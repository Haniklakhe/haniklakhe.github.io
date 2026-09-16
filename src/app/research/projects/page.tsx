import type { Metadata } from "next";
import { content, isPlaceholder } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { PhotoFrame } from "@/components/ui/PhotoFrame";

export const metadata: Metadata = {
  title: "Research Projects",
  description: `Research projects led or contributed to by ${content.person.name}.`,
};

export default function ResearchProjectsPage() {
  return (
    <div className="space-y-8">
      {content.researchProjects.map((project, index) => {
        const reversed = index % 2 === 1;
        return (
          <Card key={project.id} as="article" className="overflow-hidden">
            <div
              className={`flex flex-col gap-6 sm:gap-10 sm:items-center ${
                reversed ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
            >
              <PhotoFrame
                src={project.image}
                alt={project.title}
                className="aspect-[4/3] w-full sm:w-2/5 sm:shrink-0"
              />

              <div className="sm:flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="teal" className="text-xs">
                    {project.type}
                  </Chip>
                </div>

                <h3 className="mt-3 font-display text-xl text-ink dark:text-paper">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-ink-soft dark:text-paper/70">
                  {project.institution}
                  {project.location && <> · {project.location}</>}
                </p>

                <p className="mt-1 text-xs text-ink-soft/80 dark:text-paper/50">
                  Role: {isPlaceholder(project.role) ? "Research Associate" : project.role}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-paper/70">
                  {project.description}
                </p>

                {project.collaborators && project.collaborators.length > 0 && (
                  <p className="mt-3 text-xs text-ink-soft dark:text-paper/60">
                    <span className="font-medium text-ink dark:text-paper">Collaborators: </span>
                    {project.collaborators.join(", ")}
                  </p>
                )}

                {project.fundedBy && (
                  <p className="mt-1 text-xs text-ink-soft dark:text-paper/60">
                    <span className="font-medium text-ink dark:text-paper">Funded by: </span>
                    {project.fundedBy}
                  </p>
                )}

                {project.tools && project.tools.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <li key={tool}>
                        <Chip tone="neutral" className="text-xs">
                          {tool}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
