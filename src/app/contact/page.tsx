import type { Metadata } from "next";
import { content } from "@/lib/content";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${content.person.name}: email, professional profiles, and CV.`,
};

export default function ContactPage() {
  return <ContactStrip headingAs="h1" />;
}
