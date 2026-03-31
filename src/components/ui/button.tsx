import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--coral)] px-5 py-3 text-white shadow-[0_18px_44px_rgba(211,15,8,0.24)] hover:bg-[var(--accent-hover)]",
        secondary:
          "border border-primary/20 bg-white px-5 py-3 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground",
        outline:
          "border border-primary/30 bg-transparent px-5 py-3 text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "px-4 py-2 hover:bg-primary/6",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button };
