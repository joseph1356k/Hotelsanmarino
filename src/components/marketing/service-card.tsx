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
    <article className="premium-card interactive-frame group h-full overflow-hidden p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex size-[3.25rem] items-center justify-center rounded-[24px] bg-[linear-gradient(145deg,rgba(24,79,95,0.12),rgba(102,182,193,0.12))] text-primary transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]">
          <Icon className="size-5" />
        </div>
        <span className="mt-2 h-px w-12 bg-[linear-gradient(90deg,var(--coral),transparent)] transition-all duration-500 group-hover:w-20" />
      </div>
      <h3 className="mt-8 text-3xl leading-[0.96]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
    </article>
  );
}
