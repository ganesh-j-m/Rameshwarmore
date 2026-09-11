function getYoutubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function VideoCard({
  title,
  youtubeUrl,
  description,
}: {
  title: string;
  youtubeUrl: string;
  description?: string | null;
}) {
  const id = getYoutubeId(youtubeUrl);
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white">
      <div className="aspect-video w-full bg-paperDim">
        {id ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            className="h-full w-full"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-inkSoft">
            Video will be updated.
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base text-ink">{title}</h3>
        {description && <p className="mt-1 text-sm text-inkSoft">{description}</p>}
      </div>
    </div>
  );
}
