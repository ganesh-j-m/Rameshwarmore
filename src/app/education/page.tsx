import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Education",
  description: "Academic journey of Rameshwar Parmeshwar More — SSC, HSC, B.A. and M.A. Marathi.",
};

export default async function EducationPage() {
  const education = await prisma.education
    .findMany({ where: { published: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <>
      <PageHeader
        title="Education & Academic Journey"
        description="From SSC to a Master's degree in Marathi literature."
      />
      <Section tone="paper">
        {education.length === 0 ? (
          <p className="text-sm text-inkSoft">Content not yet provided.</p>
        ) : (
          <ol className="relative border-l border-line pl-8">
            {education.map((e) => (
              <li key={e.id} className="mb-12 last:mb-0">
                <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-maroon" />
                <p className="text-xs font-medium tracking-wide text-gold-dark">{e.year}</p>
                <h3 className="mt-1 font-display text-xl text-ink">{e.level}</h3>
                <p className="mt-1 text-sm text-inkSoft">{e.institution}</p>
                <p className="mt-2 text-2xl font-display text-maroon">{e.percentage}%</p>
              </li>
            ))}
          </ol>
        )}
      </Section>
    </>
  );
}
