import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-sm border border-line bg-white px-3.5 text-sm text-ink placeholder:text-inkSoft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
