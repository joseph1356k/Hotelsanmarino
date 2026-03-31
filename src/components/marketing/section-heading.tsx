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
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[var(--coral)]",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-12 bg-[linear-gradient(90deg,var(--coral),var(--sun))]" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-balance text-4xl leading-[0.92] md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-[1.02rem] leading-8 text-foreground/78 md:text-[1.08rem] md:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
