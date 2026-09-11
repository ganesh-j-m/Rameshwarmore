import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Research",
  description: "Research and academic work by Rameshwar Parmeshwar More in Marathi literature.",
};

export default async function ResearchPage() {
  const [projects, publications] = await Promise.all([
    prisma.researchProject
      .findMany({ where: { published: true }, orderBy: { order: "asc" } })
      .catch(() => []),
    prisma.publication
      .findMany({ where: { published: true }, orderBy: { order: "asc" } })
      .catch(() => []),
  ]);

  return (
    <>
      <PageHeader
        title="Research & Academic Work"
        description="Dissertations and published research completed as part of Rameshwar's M.A. Marathi curriculum and independent study."
      />

      <Section tone="paper">
        <SectionHeading title="Dissertations & Academic Discussions" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.length === 0 ? (
            <p className="text-sm text-inkSoft">Content not yet provided.</p>
          ) : (
            projects.map((p) => (
              <Card key={p.id}>
                <Badge variant="teal">{p.type}</Badge>
                <CardTitle className="mt-3">{p.title}</CardTitle>
                {p.description && <CardDescription>{p.description}</CardDescription>}
                {p.year && <p className="mt-3 text-xs text-inkSoft">{p.year}</p>}
              </Card>
            ))
          )}
        </div>
      </Section>

      <Section tone="dim">
        <SectionHeading title="Published Research" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {publications.length === 0 ? (
            <p className="text-sm text-inkSoft">Content not yet provided.</p>
          ) : (
            publications.map((p) => (
              <Card key={p.id}>
                <CardTitle>{p.title}</CardTitle>
                <p className="mt-2 text-sm text-inkSoft">{p.journal}</p>
                {p.publisher && <p className="text-sm text-inkSoft">{p.publisher}</p>}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-inkSoft">
                  {p.month && <span>{p.month}</span>}
                  <span>{p.year}</span>
                  {p.eIssn && <span>E-ISSN: {p.eIssn}</span>}
                </div>
              </Card>
            ))
          )}
        </div>
      </Section>
    </>
  );
}
