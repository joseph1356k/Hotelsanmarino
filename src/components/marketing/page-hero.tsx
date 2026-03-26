import type { ReactNode } from "react";
import { Reveal } from "@/components/marketing/reveal";
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
      <div className="ocean-panel relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-white/8 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[var(--mangrove)]/18 blur-3xl" />
          <div className="absolute bottom-[-5rem] right-[15%] h-64 w-64 animate-[drift_10s_ease-in-out_infinite] rounded-full bg-[var(--coral)]/10 blur-[120px]" />
        </div>
        <div className="relative grid gap-10 px-6 py-10 md:px-10 md:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-14 lg:py-16">
          <Reveal className="space-y-6" delay={50}>
            {eyebrow ? (
              <p className="text-xs uppercase tracking-[0.32em] text-white/62">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-balance max-w-4xl text-5xl leading-[0.9] text-[var(--ivory)] md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/76">
              {description}
            </p>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </Reveal>
          {aside ? (
            <Reveal delay={180} distance={42}>
              <div className="animate-[drift_12s_ease-in-out_infinite]">{aside}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
