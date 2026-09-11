import { Card, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

export function CertificationCard({
  title,
  issuer,
  score,
  date,
}: {
  title: string;
  issuer: string;
  score?: string | null;
  date?: Date | string | null;
}) {
  return (
    <Card className="flex items-start gap-4">
      <BadgeCheck className="mt-1 shrink-0 text-teal" size={22} />
      <div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="mt-1 text-sm text-inkSoft">{issuer}</p>
        <div className="mt-2 flex gap-3 text-sm">
          {score && <span className="font-medium text-maroon">{score}</span>}
          {date && <span className="text-inkSoft">{formatDate(date)}</span>}
        </div>
      </div>
    </Card>
  );
}
