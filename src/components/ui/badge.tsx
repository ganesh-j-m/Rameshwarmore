import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "gold" | "teal" }) {
  const variants = {
    default: "bg-paperDim text-inkSoft border border-line",
    gold: "bg-gold/15 text-gold-dark border border-gold/30",
    teal: "bg-teal/10 text-teal border border-teal/25",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
