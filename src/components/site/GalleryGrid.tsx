import Image from "next/image";

export function GalleryGrid({
  images,
}: {
  images: { id: string; url: string; caption?: string | null; altText?: string | null }[];
}) {
  if (images.length === 0) {
    return (
      <p className="text-sm text-inkSoft">Photos for this album will be updated soon.</p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((img) => (
        <figure key={img.id} className="group relative aspect-square overflow-hidden rounded-md border border-line bg-paperDim">
          <Image
            src={img.url}
            alt={img.altText || img.caption || "Gallery photo"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </figure>
      ))}
    </div>
  );
}
