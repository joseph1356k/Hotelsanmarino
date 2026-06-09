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
        <div className="interactive-frame relative overflow-hidden rounded-[22px] border border-[#2d5365] bg-[linear-gradient(140deg,#153b52_0%,#24566a_54%,#1f2a30_100%)] px-5 py-8 text-white shadow-[0_34px_100px_rgba(21,59,82,0.25)] sm:px-6 md:px-10 md:py-12 lg:px-14">
          <div className="absolute inset-0">
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
