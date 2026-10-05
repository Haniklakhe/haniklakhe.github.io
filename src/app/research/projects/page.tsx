import type { Metadata } from "next";
import { content, isPlaceholder } from "@/lib/content";
import { summarize } from "@/lib/utils";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Tile } from "@/components/ui/Tile";

export const metadata: Metadata = {
  title: "Research Projects",
  description: `Research projects led or contributed to by ${content.person.name}.`,
};

export default function ResearchProjectsPage() {
  return (
    <div className="space-y-6">
      {content.researchProjects.map((p, i) => {
        const { summary, truncated } = summarize(p.description);
        const role = isPlaceholder(p.role) ? "Research Associate" : p.role;
        const flip = i % 2 === 1;
        const meta = [
          p.fundedBy && ["Funded by", p.fundedBy],
          p.collaborators && p.collaborators.length > 0 && ["Collaborators", p.collaborators.join(", ")],
        ].filter(Boolean) as string[][];
        return (
          <Tile as="article" key={p.id} flush>
            <div className="grid lg:grid-cols-12">
              <PhotoFrame
                src={p.image}
                alt={p.title}
                priority={i === 0}
                className={`aspect-[4/3] w-full border-0 lg:col-span-5 lg:aspect-auto lg:min-h-[18rem] ${
                  flip ? "lg:order-2 lg:border-l" : "lg:border-r"
                } border-b lg:border-b-0`}
              />
              <div className={`p-6 sm:p-8 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                <p className="label text-ink-soft">{p.type}</p>
                <h2 className="text-d2 mt-2 max-w-[30ch] text-ink">{p.title}</h2>
                <p className="mt-2 font-display text-[1.0625rem] font-semibold font-condensed text-water">
                  {role} · {p.institution}
                  {p.location && <> · {p.location}</>}
                </p>
                {truncated ? (
                  <Reveal summary={<p className="mt-4 max-w-[62ch] leading-[1.6] text-ink-soft">{summary}</p>}>
                    <p className="mt-4 max-w-[62ch] leading-[1.6] text-ink-soft">{p.description}</p>
                  </Reveal>
                ) : (
                  <p className="mt-4 max-w-[62ch] leading-[1.6] text-ink-soft">{p.description}</p>
                )}
                {meta.length > 0 && (
                  <dl className="mt-3 space-y-1 text-[0.9375rem]">
                    {meta.map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <dt className="font-semibold">{k}:</dt>
                        <dd className="text-ink-soft">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {p.tools && p.tools.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                    {p.tools.map((t) => (
                      <li key={t} className="label border-l-2 border-water pl-2 text-ink">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Tile>
        );
      })}
    </div>
  );
}
