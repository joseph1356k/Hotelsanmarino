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
    <article className="premium-card h-full overflow-hidden p-6">
      <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-muted text-primary">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-6 text-3xl leading-none">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}
