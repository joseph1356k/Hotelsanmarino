import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string | null;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h1 className="text-4xl leading-tight md:text-5xl">{title}</h1>
      {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
    </div>
  );
}
