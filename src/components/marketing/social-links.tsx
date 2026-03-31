import Link from "next/link";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/constants/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.25 4.5c.34 1.74 1.6 3.23 3.25 3.86v2.68a8.02 8.02 0 0 1-3.25-.86v5.03a4.77 4.77 0 1 1-4.77-4.76c.2 0 .39.01.57.04v2.73a2.31 2.31 0 1 0 1.74 2.23V4.5h2.46Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M13.32 20.5v-7.02h2.36l.35-2.73h-2.71V9.02c0-.79.22-1.33 1.36-1.33h1.45V5.25c-.25-.03-1.1-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.6v2h-2.35v2.73h2.35v7.02h2.79Z"
        fill="currentColor"
      />
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const iconMap = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  facebook: FacebookIcon,
} as const;

export function SocialLinks({
  className,
  variant = "light",
  size = "default",
}: {
  className?: string;
  variant?: "light" | "dark";
  size?: "default" | "compact";
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {socialLinks.map((social) => {
        const Icon = iconMap[social.key];

        return (
          <Link
            key={social.key}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center rounded-full border font-semibold transition duration-300",
              size === "compact"
                ? "justify-center gap-0 p-0 size-9"
                : "gap-2 px-4 py-2.5 text-sm",
              variant === "light"
                ? "border-primary/10 bg-white text-primary hover:-translate-y-0.5 hover:border-[var(--coral)] hover:text-[var(--coral)]"
                : "border-white/16 bg-white/8 text-white hover:-translate-y-0.5 hover:border-[var(--sun)] hover:bg-white hover:text-primary",
            )}
            aria-label={social.label}
            title={social.label}
          >
            <Icon className="size-4" />
            {size === "compact" ? <span className="sr-only">{social.label}</span> : social.label}
          </Link>
        );
      })}
    </div>
  );
}
