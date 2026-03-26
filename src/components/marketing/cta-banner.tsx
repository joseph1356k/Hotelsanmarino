import type { ReactNode } from "react";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

export function CtaBanner({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-shell", className)}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[38px] bg-[linear-gradient(145deg,#153b52_0%,#102d3f_100%)] px-6 py-10 text-primary-foreground shadow-[0_34px_78px_rgba(16,45,63,0.28)] md:px-10 md:py-12 lg:px-14">
          <div className="absolute inset-0">
            <div className="absolute left-10 top-8 h-32 w-32 rounded-full bg-[rgba(238,242,241,0.1)] blur-3xl" />
            <div className="absolute bottom-[-2rem] right-10 h-40 w-40 rounded-full bg-[var(--coral)]/1 blur-3xl" />
          </div>
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-4">
              {eyebrow ? (
                <p className="text-xs uppercase tracking-[0.32em] text-primary-foreground/62">
                  {eyebrow}
                </p>
              ) : null}
              <h2 className="max-w-3xl text-balance text-4xl leading-tight md:text-5xl">
                {title}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-primary-foreground/78">
                {description}
              </p>
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
