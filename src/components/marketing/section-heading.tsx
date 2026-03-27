import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string | null;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--coral)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base font-medium leading-7 text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
