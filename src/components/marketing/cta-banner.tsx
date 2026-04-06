import type { ReactNode } from "react";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

export function CtaBanner({
  id,
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("container-shell", className)}>
      <Reveal>
        <div className="interactive-frame relative overflow-hidden rounded-[30px] border border-[#184f5f] bg-[linear-gradient(140deg,#184f5f_0%,#23687d_54%,#102f3c_100%)] px-5 py-8 text-white shadow-[0_34px_100px_rgba(24,79,95,0.25)] sm:px-6 md:rounded-[38px] md:px-10 md:py-12 lg:px-14">
          <div className="absolute inset-0">
            <div className="scene-orb absolute left-10 top-8 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
            <div className="scene-orb absolute bottom-[-2rem] right-10 h-40 w-40 rounded-full bg-[var(--sun)]/14 blur-3xl" />
            <div className="absolute right-[16%] top-10 h-px w-20 bg-[linear-gradient(90deg,transparent,var(--sun),transparent)]" />
          </div>

          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-3 md:space-y-4">
              {eyebrow ? (
                <div className="inline-flex items-center gap-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/66 md:gap-3 md:text-[0.68rem] md:tracking-[0.34em]">
                  <span className="h-px w-10 bg-[linear-gradient(90deg,var(--coral),var(--sun))]" />
                  <span>{eyebrow}</span>
                </div>
              ) : null}
              <h2 className="max-w-3xl text-balance text-[2.5rem] leading-[0.94] sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="max-w-[22rem] text-[0.98rem] leading-7 text-white/76 sm:max-w-2xl md:text-base">
                {description}
              </p>
            </div>
            {actions ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
