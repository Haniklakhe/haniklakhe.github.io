import type { Metadata } from "next";
import { content } from "@/lib/content";
import { PubList } from "@/components/sections/PubList";

export const metadata: Metadata = {
  title: "Publications",
  description: `Publications by ${content.person.name}.`,
};

export default function PublicationsPage() {
  return <PubList showTitle={false} />;
}
