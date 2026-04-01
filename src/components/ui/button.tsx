import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 will-change-transform disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--coral)] px-5 py-3 text-white shadow-[0_18px_44px_rgba(211,15,8,0.24)] before:absolute before:inset-y-0 before:left-[-30%] before:w-12 before:rotate-[18deg] before:bg-white/24 before:opacity-0 before:blur-md before:content-[''] hover:-translate-y-[1px] hover:bg-[var(--accent-hover)] hover:shadow-[0_24px_54px_rgba(211,15,8,0.28)] hover:before:animate-[beam-sweep_900ms_ease]",
        secondary:
          "border border-primary/20 bg-white px-5 py-3 text-primary shadow-[0_12px_34px_rgba(24,79,95,0.05)] before:absolute before:inset-y-0 before:left-[-30%] before:w-12 before:rotate-[18deg] before:bg-[rgba(102,182,193,0.2)] before:opacity-0 before:blur-md before:content-[''] hover:-translate-y-[1px] hover:border-primary hover:bg-primary hover:text-primary-foreground hover:before:animate-[beam-sweep_900ms_ease]",
        outline:
          "border border-primary/30 bg-transparent px-5 py-3 text-primary before:absolute before:inset-y-0 before:left-[-30%] before:w-12 before:rotate-[18deg] before:bg-[rgba(102,182,193,0.18)] before:opacity-0 before:blur-md before:content-[''] hover:-translate-y-[1px] hover:border-primary hover:bg-primary hover:text-primary-foreground hover:before:animate-[beam-sweep_900ms_ease]",
        ghost: "px-4 py-2 hover:-translate-y-[1px] hover:bg-primary/6",
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
