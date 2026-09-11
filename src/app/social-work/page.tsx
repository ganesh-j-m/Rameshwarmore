import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Social Work",
  description: "Social activities and community initiatives led or supported by Rameshwar Parmeshwar More.",
};

export default async function SocialWorkPage() {
  const activities = await prisma.socialWork
    .findMany({ where: { published: true }, orderBy: { date: "desc" } })
    .catch(() => []);

  return (
    <>
      <PageHeader title="Social Work" description="Community and social initiatives." />
      <Section tone="paper">
        {activities.length === 0 ? (
          <p className="text-sm text-inkSoft">Content not yet provided.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {activities.map((a) => (
              <Card key={a.id}>
                {a.imageUrl && (
                  <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-sm border border-line bg-paperDim">
                    <Image
                      src={a.imageUrl}
                      alt={a.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <CardTitle>{a.title}</CardTitle>
                <p className="mt-1 text-sm text-inkSoft">
                  {[a.organization, a.location].filter(Boolean).join(" · ")}
                </p>
                {a.description && <CardDescription>{a.description}</CardDescription>}
                {a.date && <p className="mt-3 text-xs text-inkSoft">{formatDate(a.date)}</p>}
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
