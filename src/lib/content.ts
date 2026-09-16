import raw from "../../content/content.json";
import type { ContentData } from "./types";

export const content = raw as unknown as ContentData;

/**
 * Any content string starting with "ADD_" is a placeholder the site owner
 * hasn't filled in yet. Never render these raw — treat the field as absent.
 */
export function isPlaceholder(value: string | number | null | undefined): boolean {
  if (value === null || value === undefined) return true;
  return typeof value === "string" && value.startsWith("ADD_");
}

export interface RealLink {
  key: keyof ContentData["person"]["links"];
  url: string;
  label: string;
}

const LINK_LABELS: Record<keyof ContentData["person"]["links"], string> = {
  linkedin: "LinkedIn",
  orcid: "ORCID",
  googleScholar: "Google Scholar",
  researchGate: "ResearchGate",
  github: "GitHub",
};

/** Returns only the social/profile links that have real (non-placeholder) URLs. */
export function getRealLinks(): RealLink[] {
  const entries = Object.entries(content.person.links) as [
    keyof ContentData["person"]["links"],
    string
  ][];
  return entries
    .filter(([, url]) => !isPlaceholder(url))
    .map(([key, url]) => ({ key, url, label: LINK_LABELS[key] }));
}

export function getSiteUrl(): string {
  return isPlaceholder(content.site.url) ? "http://localhost:3000" : content.site.url;
}
