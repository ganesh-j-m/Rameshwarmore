import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CertificationCard } from "@/components/site/CertificationCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certifications and additional qualifications held by Rameshwar Parmeshwar More.",
};

export default async function CertificationsPage() {
  const certifications = await prisma.certification
    .findMany({ where: { published: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <>
      <PageHeader
        title="Certifications & Additional Qualifications"
        description="MS-CIT and MKCL certifications."
      />
      <Section tone="paper">
        {certifications.length === 0 ? (
          <p className="text-sm text-inkSoft">Content not yet provided.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {certifications.map((c) => (
              <CertificationCard
                key={c.id}
                title={c.title}
                issuer={c.issuer}
                score={c.score}
                date={c.date}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
