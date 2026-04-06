import type { LucideIcon } from "lucide-react";

export function ServiceCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="premium-card interactive-frame group h-full overflow-hidden p-5 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex size-12 items-center justify-center rounded-[20px] bg-[linear-gradient(145deg,rgba(24,79,95,0.12),rgba(102,182,193,0.12))] text-primary transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04] md:size-[3.25rem] md:rounded-[24px]">
          <Icon className="size-[1.15rem] md:size-5" />
        </div>
        <span className="mt-2 h-px w-12 bg-[linear-gradient(90deg,var(--coral),transparent)] transition-all duration-500 group-hover:w-20" />
      </div>
      <h3 className="mt-6 text-[2rem] leading-[0.96] md:mt-8 md:text-3xl">{title}</h3>
      <p className="mt-3 text-sm leading-[1.65rem] text-muted-foreground md:mt-4 md:leading-7">
        {description}
      </p>
    </article>
  );
}
