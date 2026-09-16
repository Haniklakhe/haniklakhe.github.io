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
    <nav aria-label="Research sections" className="flex flex-wrap gap-2">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-teal bg-teal text-paper dark:border-teal-light dark:bg-teal-light dark:text-deep"
                : "border-border text-ink-soft hover:border-teal hover:text-teal dark:border-border-dark dark:text-paper/70 dark:hover:border-teal-light dark:hover:text-teal-light"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
