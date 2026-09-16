export interface SiteMeta {
  name: string;
  title: string;
  description: string;
  url: string;
  locale: string;
}

export interface PersonLinks {
  linkedin: string;
  orcid: string;
  googleScholar: string;
  researchGate: string;
  github: string;
}

export interface CurrentRole {
  title: string;
  organization: string;
  institution: string;
}

export interface Person {
  name: string;
  headline: string;
  shortHeadline: string;
  location: string;
  photo: string | null;
  currentRole: CurrentRole;
  academicStatus: string;
  email: string;
  links: PersonLinks;
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  type: string;
  period: string;
  role: string;
  institution: string;
  location?: string;
  fundedBy?: string;
  collaborators?: string[];
  tools?: string[];
  grade?: string;
  advisor?: string;
  description: string;
  image?: string | null;
}

export interface Publication {
  id: string;
  year: number;
  authors: string;
  title: string;
  venue: string;
  volumeInfo: string;
  doi: string;
  authorHighlight: string;
}

export interface ConferenceEntry {
  id: string;
  year: number;
  date: string;
  authors: string;
  title: string;
  conference: string;
  reference?: string;
  location: string;
  role: string;
}

export interface ExperienceSubRole {
  title: string;
  period: string;
  bullets?: string[];
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  title?: string;
  location: string;
  period?: string;
  current: boolean;
  bullets?: string[];
  roles?: ExperienceSubRole[];
  totalDuration?: string;
}

export interface ThesisInfo {
  title: string;
  grade?: string;
  advisor?: string;
  tools?: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  degree: string;
  period: string;
  gpa?: string;
  funding?: string;
  honors?: string;
  thesis?: ThesisInfo;
  notes?: string;
}

export type SkillLevel = "Intermediate" | "Basic" | null;

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface LanguageItem {
  name: string;
  level: string | null;
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  location: string;
  role: string;
  year: number | string;
}

export interface FeaturedHighlight {
  refId: string;
  label: string;
  title: string;
  blurb: string;
}

export interface CVInfo {
  path: string;
  label: string;
  note: string;
}

export interface CollaborationCTA {
  heading: string;
  body: string;
}

export interface ContentData {
  site: SiteMeta;
  person: Person;
  homeSummary: string;
  biography: string;
  researchInterests: ResearchInterest[];
  researchProjects: ResearchProject[];
  publications: Publication[];
  conferences: ConferenceEntry[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  languages: LanguageItem[];
  certifications: unknown[];
  teachingSupervision: unknown[];
  awards: Award[];
  featuredResearchHighlights: FeaturedHighlight[];
  cv: CVInfo;
  collaborationCTA: CollaborationCTA;
}
