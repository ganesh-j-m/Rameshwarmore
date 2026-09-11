import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { Timeline } from "@/components/site/Timeline";
import { profile as verifiedProfile, skills } from "@/lib/data/verified-biodata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Rameshwar Parmeshwar More — Kirtankar, Speaker, Researcher and Social Contributor from Maharashtra.",
};

export default async function AboutPage() {
  const [profile, journeyItems] = await Promise.all([
    prisma.profile.findFirst().catch(() => null),
    prisma.journeyItem
      .findMany({ where: { published: true }, orderBy: { order: "asc" } })
      .catch(() => []),
  ]);

  const aboutLong = profile?.aboutLong || verifiedProfile.aboutLong;
  const languages = (profile?.languagesSpoken || verifiedProfile.languagesSpoken)
    .split(",")
    .map((l) => l.trim());

  return (
    <>
      <PageHeader
        title="About Rameshwar More"
        description="Kirtan, literature, research, public speaking and youth development — a single, connected body of work."
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr]">
          <div className="prose-marathi">
            {aboutLong.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="font-display text-lg text-ink">Languages</h3>
              <ul className="mt-3 space-y-1 text-sm text-inkSoft">
                {languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg text-ink">Core Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.slice(0, 8).map((s) => (
                  <span
                    key={s}
                    className="rounded-sm border border-line bg-paperDim px-3 py-1 text-xs text-inkSoft"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <Link href="/education" className="block text-maroon hover:text-maroon-dark">
                View Education Journey →
              </Link>
              <Link href="/research" className="block text-maroon hover:text-maroon-dark">
                View Research Work →
              </Link>
              <Link href="/awards" className="block text-maroon hover:text-maroon-dark">
                View Awards & Honours →
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="dim">
        <SectionHeading
          title="The Journey So Far"
          description="Milestones in Rameshwar's work across Kirtan, coordination and education."
        />
        <div className="mt-10">
          {journeyItems.length > 0 ? (
            <Timeline
              entries={journeyItems.map((j) => ({
                id: j.id,
                heading: j.title,
                subheading: j.organization,
                meta: j.startYear ? `${j.startYear}${j.endYear ? ` – ${j.endYear}` : " – Present"}` : undefined,
                body: j.description,
              }))}
            />
          ) : (
            <p className="text-sm text-inkSoft">Content not yet provided.</p>
          )}
        </div>
      </Section>
    </>
  );
}
