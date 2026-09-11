export type TimelineEntry = {
  id: string;
  heading: string;
  subheading?: string | null;
  meta?: string | null;
  body?: string | null;
};

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <ol className="relative border-l border-line pl-8">
      {entries.map((entry) => (
        <li key={entry.id} className="mb-10 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
          {entry.meta && <p className="text-xs font-medium tracking-wide text-gold-dark">{entry.meta}</p>}
          <h3 className="mt-1 font-display text-lg text-ink">{entry.heading}</h3>
          {entry.subheading && <p className="mt-0.5 text-sm text-inkSoft">{entry.subheading}</p>}
          {entry.body && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-inkSoft">{entry.body}</p>}
        </li>
      ))}
    </ol>
  );
}
