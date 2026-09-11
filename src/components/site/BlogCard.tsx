import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export function BlogCard({
  slug,
  title,
  excerpt,
  coverImageUrl,
  categoryName,
  publishedAt,
}: {
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImageUrl?: string | null;
  categoryName?: string | null;
  publishedAt?: Date | string | null;
}) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-paperDim">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-inkSoft">
            Image will be updated.
          </div>
        )}
      </div>
      <div className="mt-3">
        {categoryName && <p className="text-xs font-medium text-gold-dark">{categoryName}</p>}
        <h3 className="mt-1 font-display text-lg text-ink group-hover:text-maroon">{title}</h3>
        {excerpt && <p className="mt-1.5 text-sm leading-relaxed text-inkSoft line-clamp-2">{excerpt}</p>}
        {publishedAt && <p className="mt-2 text-xs text-inkSoft">{formatDate(publishedAt)}</p>}
      </div>
    </Link>
  );
}
