export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-b border-line bg-paperDim">
      <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-inkSoft">{description}</p>
        )}
      </div>
    </div>
  );
}
