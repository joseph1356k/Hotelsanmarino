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
    <section className={cn("container-shell pt-4 md:pt-6", className)}>
      <div className="ocean-panel relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute left-4 top-6 h-40 w-40 rounded-full bg-white/8 blur-3xl md:h-52 md:w-52" />
            <div className="absolute right-4 top-0 h-52 w-52 rounded-full bg-[var(--sky)]/18 blur-3xl md:h-72 md:w-72" />
            <div className="absolute bottom-[-4rem] right-[10%] h-44 w-44 animate-[drift_10s_ease-in-out_infinite] rounded-full bg-[var(--sun)]/12 blur-[110px] md:h-64 md:w-64" />
          </div>
        <div className="relative grid gap-8 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:px-12 lg:py-12">
          <Reveal className="space-y-5" delay={50}>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/78">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-balance max-w-4xl text-5xl font-semibold leading-[0.9] text-[var(--ivory)] md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg font-medium leading-8 text-white/90">
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
