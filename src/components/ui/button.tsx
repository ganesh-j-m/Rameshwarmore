import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-maroon",
  {
    variants: {
      variant: {
        primary: "bg-maroon text-paper hover:bg-maroon-dark",
        secondary: "bg-transparent border border-ink text-ink hover:bg-ink hover:text-paper",
        gold: "bg-gold text-ink hover:bg-gold-dark hover:text-paper",
        ghost: "bg-transparent text-ink hover:bg-paperDim",
        link: "bg-transparent underline-offset-4 hover:underline text-maroon p-0 h-auto",
        destructive: "bg-red-700 text-white hover:bg-red-800",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
