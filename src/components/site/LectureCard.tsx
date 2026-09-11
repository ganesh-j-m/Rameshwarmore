import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LectureCard({
  title,
  type,
  organizer,
  location,
  year,
}: {
  title: string;
  type: string;
  organizer?: string | null;
  location?: string | null;
  year?: number | null;
}) {
  return (
    <Card>
      <Badge variant="teal">{type}</Badge>
      <CardTitle className="mt-3 text-lg">{title}</CardTitle>
      <p className="mt-2 text-sm text-inkSoft">
        {[organizer, location, year].filter(Boolean).join(" · ")}
      </p>
    </Card>
  );
}
