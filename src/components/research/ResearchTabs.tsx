"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/research/interests", label: "Interests" },
  { href: "/research/projects", label: "Projects" },
  { href: "/research/publications", label: "Publications" },
  { href: "/research/conferences", label: "Conferences" },
];

export function ResearchTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Research sections" className="flex flex-wrap gap-x-8 gap-y-1 border-b border-rule">
      {TABS.map((tab) => {
        const active = pathname === tab.href || pathname === `${tab.href}/`;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px inline-flex min-h-11 items-center border-b-2 font-display text-[1.125rem] font-semibold font-condensed transition-colors duration-150 ease-state ${
              active ? "border-water text-ink" : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
