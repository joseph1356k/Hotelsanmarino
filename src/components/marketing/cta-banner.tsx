import type { ReactNode } from "react";
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
      <div className="overflow-hidden rounded-[34px] bg-primary px-6 py-10 text-primary-foreground shadow-[0_28px_60px_rgba(16,45,63,0.22)] md:px-10 md:py-12 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-4">
            {eyebrow ? (
              <p className="text-xs uppercase tracking-[0.32em] text-primary-foreground/68">
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
    </section>
  );
}
