import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-sm border border-line bg-white px-3.5 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";
