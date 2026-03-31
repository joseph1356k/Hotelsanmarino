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
    <section className={cn("container-shell pt-3 md:pt-4", className)}>
      <div className="ocean-panel relative overflow-hidden">
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(17,47,59,0.94)_0%,rgba(24,79,95,0.86)_42%,rgba(24,79,95,0.34)_100%)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(138deg,#184f5f_0%,#215f71_40%,#102f3c_100%)]" />
        )}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-3rem] top-[-3rem] h-40 w-40 rounded-full border border-white/12 bg-white/6 blur-2xl md:h-52 md:w-52" />
          <div className="absolute right-[10%] top-6 h-28 w-28 rounded-full bg-[var(--sun)]/16 blur-3xl md:h-44 md:w-44" />
          <div className="absolute bottom-[-4rem] left-[18%] h-40 w-40 rounded-full bg-[var(--coral)]/14 blur-[110px]" />
          <div className="absolute right-10 top-1/2 hidden h-px w-28 bg-white/28 md:block" />
          <div className="absolute left-6 top-8 h-px w-20 animate-[shimmer-x_3.6s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,var(--sun),transparent)]" />
        </div>

        <div className="relative grid gap-8 px-5 py-8 sm:px-6 md:px-8 md:py-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-start lg:px-12 lg:py-12">
          <Reveal className="min-w-0 space-y-5" delay={40}>
            {eyebrow ? (
              <div className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/78">
                <span className="h-px w-12 bg-[linear-gradient(90deg,var(--sun),transparent)]" />
                <span>{eyebrow}</span>
              </div>
            ) : null}
            <h1 className="text-balance max-w-[9.5ch] text-[3.35rem] leading-[0.94] text-white sm:max-w-[10ch] sm:text-[3.9rem] md:max-w-4xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-[18rem] text-[1.02rem] leading-8 text-white/88 sm:max-w-[22rem] md:max-w-2xl md:text-[1.08rem] md:leading-8">
              {description}
            </p>
            {actions ? <div className="flex flex-wrap gap-3 pt-1">{actions}</div> : null}
          </Reveal>

          {aside ? (
            <Reveal className="min-w-0 lg:pt-2" delay={180} distance={36}>
              <div className="animate-[drift_13s_ease-in-out_infinite]">{aside}</div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
