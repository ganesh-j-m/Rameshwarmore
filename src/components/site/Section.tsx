import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  tone = "paper",
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tone?: "paper" | "dim" | "ink";
}) {
  const toneClasses = {
    paper: "bg-paper",
    dim: "bg-paperDim",
    ink: "bg-ink text-paper",
  };
  return (
    <section id={id} className={cn("py-16 sm:py-24", toneClasses[tone], className)}>
      <div className="mx-auto max-w-content px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  align = "left",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-inkSoft">{description}</p>}
    </div>
  );
}
