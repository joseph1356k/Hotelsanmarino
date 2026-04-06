import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  imageSrc,
  imageAlt = "Visual editorial de Hotel San Marino",
  className,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}) {
  return (
    <section className={cn("container-shell pt-2 md:pt-4", className)}>
      <div className="ocean-panel interactive-frame relative overflow-hidden">
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-[1.03] animate-[drift_18s_ease-in-out_infinite]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(17,47,59,0.94)_0%,rgba(24,79,95,0.86)_42%,rgba(24,79,95,0.34)_100%)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(138deg,#184f5f_0%,#215f71_40%,#102f3c_100%)]" />
        )}

        <div className="absolute inset-0 overflow-hidden">
          <div className="scene-orb absolute left-[-3rem] top-[-3rem] h-32 w-32 rounded-full border border-white/12 bg-white/6 blur-2xl md:h-52 md:w-52" />
          <div className="scene-orb absolute right-[10%] top-6 h-24 w-24 rounded-full bg-[var(--sun)]/16 blur-3xl md:h-44 md:w-44" />
          <div className="scene-orb absolute bottom-[-4rem] left-[18%] h-32 w-32 rounded-full bg-[var(--coral)]/14 blur-[110px] md:h-40 md:w-40" />
          <div className="absolute right-10 top-1/2 hidden h-px w-28 bg-white/28 md:block" />
          <div className="absolute left-6 top-8 h-px w-20 animate-[shimmer-x_3.6s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,var(--sun),transparent)]" />
        </div>

        <div className="relative grid gap-5 px-4 py-5 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-start lg:px-12 lg:py-12">
          <Reveal className="min-w-0 space-y-4 sm:space-y-5" delay={40}>
            {eyebrow ? (
              <div className="inline-flex items-center gap-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/78 sm:gap-3 sm:text-[0.68rem] sm:tracking-[0.34em]">
                <span className="h-px w-10 bg-[linear-gradient(90deg,var(--sun),transparent)] sm:w-12" />
                <span>{eyebrow}</span>
              </div>
            ) : null}
            <h1 className="text-balance max-w-[8.2ch] text-[2.72rem] leading-[0.9] text-white sm:max-w-[8.8ch] sm:text-[3.45rem] md:max-w-4xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-[18.75rem] text-[0.96rem] leading-[1.8] text-white/88 sm:max-w-[22rem] md:max-w-2xl md:text-[1.08rem] md:leading-8">
              {description}
            </p>
            {actions ? (
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
                {actions}
              </div>
            ) : null}
          </Reveal>

          {aside ? (
            <Reveal className="min-w-0 lg:pt-2" delay={180} distance={36}>
              <div className="motion-safe:animate-[drift_13s_ease-in-out_infinite]">{aside}</div>
            </Reveal>
          ) : null}
        </div>

        <div className="pointer-events-none absolute bottom-5 right-5 hidden items-center gap-3 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/72 backdrop-blur md:inline-flex">
          <span className="h-px w-8 bg-[linear-gradient(90deg,var(--sun),transparent)]" />
          <span>Desliza</span>
        </div>
      </div>
    </section>
  );
}
