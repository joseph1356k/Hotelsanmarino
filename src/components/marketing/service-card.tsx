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
    <article className="h-full rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-[0_16px_40px_rgba(16,45,63,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(16,45,63,0.12)]">
      <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-6 text-3xl leading-none">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}
