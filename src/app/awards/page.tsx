import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { AwardCard } from "@/components/site/AwardCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Awards & Honours",
  description: "Awards and honours received by Rameshwar Parmeshwar More.",
};

export default async function AwardsPage() {
  const awards = await prisma.award
    .findMany({ where: { published: true }, orderBy: [{ featured: "desc" }, { order: "asc" }] })
    .catch(() => []);

  return (
    <>
      <PageHeader
        title="Awards & Honours"
        description="Recognition received for contributions to Kirtan, Marathi literature and social work."
      />
      <Section tone="paper">
        {awards.length === 0 ? (
          <p className="text-sm text-inkSoft">Content not yet provided.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((a) => (
              <AwardCard
                key={a.id}
                title={a.title}
                organization={a.organization}
                year={a.year}
                location={a.location}
                description={a.description}
                imageUrl={a.imageUrl}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
