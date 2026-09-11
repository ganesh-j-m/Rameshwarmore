import Image from "next/image";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function EventCard({
  title,
  eventDate,
  venue,
  city,
  status,
  description,
  posterUrl,
}: {
  title: string;
  eventDate?: Date | string | null;
  venue?: string | null;
  city?: string | null;
  status: string;
  description?: string | null;
  posterUrl?: string | null;
}) {
  const statusVariant = status === "UPCOMING" ? "gold" : status === "CANCELLED" ? "default" : "teal";
  return (
    <Card className="flex h-full flex-col">
      {posterUrl && (
        <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-sm border border-line bg-paperDim">
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        <Badge variant={statusVariant as "gold" | "teal" | "default"}>{status}</Badge>
        {eventDate && (
          <span className="flex items-center gap-1.5 text-xs text-inkSoft">
            <CalendarDays size={14} /> {formatDate(eventDate)}
          </span>
        )}
      </div>
      <CardTitle className="mt-4">{title}</CardTitle>
      {(venue || city) && (
        <p className="mt-1 flex items-center gap-1.5 text-sm text-inkSoft">
          <MapPin size={14} /> {[venue, city].filter(Boolean).join(", ")}
        </p>
      )}
      {description && <CardDescription>{description}</CardDescription>}
    </Card>
  );
}
