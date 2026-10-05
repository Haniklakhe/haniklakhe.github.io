"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { content } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function sceneName(pathname: string): string {
  const item = NAV_ITEMS.find((i) => isActive(pathname, i.href) && i.href !== "/");
  return item ? item.label : "Home";
}

/** Vertical gauge. The marker follows page scroll (CSS scroll-driven, no JS). */
function Gauge() {
  const ticks = Array.from({ length: 13 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="relative ml-1 h-52 w-6" style={{ ["--gauge-range" as string]: "12.25rem" }}>
      <svg viewBox="0 0 24 208" className="absolute inset-0 h-full w-full text-ink-soft/60">
        {ticks.map((t) => (
          <line
            key={t}
            x1="0"
            x2={t % 4 === 0 ? 16 : 9}
            y1={t * 16 + 4}
            y2={t * 16 + 4}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>
      <span className="gauge-marker absolute left-0 top-0 block h-[3px] w-6 bg-water" />
    </div>
  );
}

export function SceneRail() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { person } = content;

  return (
    <>
      {/* Desktop rail */}
      <aside
        aria-label="Site"
        className="no-print fixed inset-y-0 left-0 z-40 hidden w-60 flex-col justify-between border-r border-rule bg-ground px-6 py-6 lg:flex"
      >
        <div>
          <Link href="/" className="block font-display text-[1.75rem] font-bold leading-[0.95] tracking-tight text-ink font-condensed">
            Hanik
            <br />
            Lakhe
          </Link>
          <p className="label mt-3 text-ink-soft">{person.currentRole.title}</p>

          <nav aria-label="Primary" className="mt-10">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative block py-2 pl-4 font-display text-[1.125rem] font-semibold font-condensed transition-colors duration-150 ease-state ${
                        active ? "text-ink" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-water transition-[transform,opacity] duration-150 ease-state ${
                          active ? "w-2.5 opacity-100" : "w-2.5 origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                        }`}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <Gauge />
            <p className="label mt-3 text-ink-soft">Viewing: {sceneName(pathname)}</p>
            <p className="mt-0.5 font-body text-[0.875rem] leading-snug text-ink-soft">
              {person.location.split(",").slice(-2).join(",").trim()}
            </p>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile / tablet bar */}
      <header className="no-print sticky top-0 z-40 border-b border-rule bg-ground lg:hidden">
        <div className="flex items-center justify-between px-4 py-2 sm:px-6">
          <Link
            href="/"
            className="font-display text-[1.375rem] font-bold tracking-tight text-ink font-condensed"
            onClick={() => setOpen(false)}
          >
            {person.name}
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center border border-rule text-ink-soft transition-[transform,color,border-color] duration-150 ease-state hover:border-water hover:text-water active:scale-95"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-rule">
            <ul className="px-4 py-2 sm:px-6">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`block py-3 font-display text-[1.25rem] font-semibold font-condensed ${
                        active ? "text-water" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
