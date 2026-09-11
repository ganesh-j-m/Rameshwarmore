import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of Rameshwar Parmeshwar More's Kirtan programs, awards, and events.",
};

export default async function GalleryPage() {
  const albums = await prisma.galleryAlbum
    .findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      include: { images: { orderBy: { order: "asc" } } },
    })
    .catch(() => []);

  return (
    <>
      <PageHeader title="Gallery" description="Photographs across Kirtan, awards, conferences and social activities." />
      <Section tone="paper">
        {albums.length === 0 ? (
          <p className="text-sm text-inkSoft">Photos will be updated soon.</p>
        ) : (
          <div className="space-y-16">
            {albums.map((album) => (
              <div key={album.id}>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-2xl text-ink">{album.title}</h2>
                  <Badge variant="gold">{album.category}</Badge>
                </div>
                <div className="mt-6">
                  <GalleryGrid images={album.images} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
