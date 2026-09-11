import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { VideoCard } from "@/components/site/VideoCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Videos",
  description: "Kirtan programs, lectures and interviews of Rameshwar Parmeshwar More.",
};

export default async function VideosPage() {
  const videos = await prisma.video
    .findMany({ where: { published: true }, orderBy: { date: "desc" } })
    .catch(() => []);

  return (
    <>
      <PageHeader title="Videos" description="Recorded Kirtan programs, lectures and interviews." />
      <Section tone="paper">
        {videos.length === 0 ? (
          <p className="text-sm text-inkSoft">Videos will be updated soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} title={v.title} youtubeUrl={v.youtubeUrl} description={v.description} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
