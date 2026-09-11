import Image from "next/image";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award as AwardIcon } from "lucide-react";

export function AwardCard({
  title,
  organization,
  year,
  location,
  description,
  imageUrl,
}: {
  title: string;
  organization: string;
  year?: number | null;
  location?: string | null;
  description?: string | null;
  imageUrl?: string | null;
}) {
  return (
    <Card className="flex h-full flex-col">
      {imageUrl ? (
        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-sm border border-line bg-paperDim">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <AwardIcon className="text-gold" size={22} />
      )}
      <CardTitle className="mt-4">{title}</CardTitle>
      <p className="mt-1 text-sm text-maroon">{organization}</p>
      {description && <CardDescription>{description}</CardDescription>}
      <div className="mt-4 flex flex-wrap gap-2">
        {year && <Badge variant="gold">{year}</Badge>}
        {location && <Badge>{location}</Badge>}
      </div>
    </Card>
  );
}
