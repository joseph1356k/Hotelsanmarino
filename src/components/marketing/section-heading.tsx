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
        "max-w-3xl space-y-3 md:space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[var(--coral)]",
            "text-[0.62rem] tracking-[0.28em] md:text-[0.68rem] md:tracking-[0.34em]",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-10 bg-[linear-gradient(90deg,var(--coral),var(--sun))] md:w-12" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-balance text-[2.55rem] leading-[0.92] sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[22rem] text-[0.98rem] leading-7 text-foreground/78 sm:max-w-2xl md:text-[1.08rem] md:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
