import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { LectureCard } from "@/components/site/LectureCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lectures, Workshops & Conferences",
  description:
    "Lectures, workshops, discussion sessions and conferences attended or led by Rameshwar Parmeshwar More.",
};

export default async function LecturesPage() {
  const lectures = await prisma.lecture
    .findMany({ where: { published: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <>
      <PageHeader
        title="Lectures, Workshops & Conferences"
        description="Participation as speaker, lecturer and discussant across state and national forums."
      />
      <Section tone="paper">
        {lectures.length === 0 ? (
          <p className="text-sm text-inkSoft">Content not yet provided.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lectures.map((l) => (
              <LectureCard
                key={l.id}
                title={l.title}
                type={l.type}
                organizer={l.organizer}
                location={l.location}
                year={l.year}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
