import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  href = "/",
  compact = false,
  theme = "default",
  className,
}: {
  href?: string;
  compact?: boolean;
  theme?: "default" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-w-0 items-center gap-3",
        compact ? "gap-2.5" : "gap-3.5",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full border border-[#880c04]/12 bg-white shadow-[0_12px_34px_rgba(24,79,95,0.08)]",
          compact ? "size-10 sm:size-11 md:size-12" : "size-12 sm:size-14 md:size-[3.7rem]",
        )}
      >
        <Image
          src="/brand/logo-hsm.jpeg"
          alt="Logo Hotel San Marino"
          fill
          sizes={compact ? "48px" : "60px"}
          className="object-cover"
          priority
        />
      </div>
      <span className="min-w-0">
        <span
          className={cn(
            "block font-serif leading-[0.84] transition group-hover:text-[var(--coral)]",
            theme === "light" ? "text-white" : "text-primary",
            compact
              ? "text-[1.36rem] sm:text-[1.5rem] md:text-[1.78rem]"
              : "text-[1.6rem] sm:text-[1.9rem] md:text-[2.08rem] xl:text-[2.2rem]",
          )}
        >
          San Marino
        </span>
        <span
          className={cn(
            "mt-1 block font-semibold uppercase tracking-[0.24em] transition group-hover:text-primary",
            theme === "light" ? "text-white/72" : "text-foreground/72",
            compact
              ? "hidden text-[0.56rem] sm:block"
              : "text-[0.58rem] sm:text-[0.62rem] md:text-[0.66rem]",
          )}
        >
          Hotel en El Morro
        </span>
      </span>
    </Link>
  );
}
