import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-shell pt-10 md:pt-14", className)}>
      <div className="editorial-panel overflow-hidden">
        <div className="grid gap-10 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-14 lg:py-16">
          <div className="space-y-6">
            {eyebrow ? (
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--mangrove)]">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-balance max-w-4xl text-5xl leading-[0.94] md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {description}
            </p>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
