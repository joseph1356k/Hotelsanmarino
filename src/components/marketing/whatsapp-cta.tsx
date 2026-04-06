import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsappCtaProps {
  phoneNumber: string;
  message: string;
  label?: ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function WhatsappCta({
  phoneNumber,
  message,
  label = "Consultar por WhatsApp",
  className,
  variant = "default",
  size = "default",
  onClick,
}: WhatsappCtaProps) {
  const href = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={cn(
        buttonVariants({ variant, size }),
        "shadow-[0_10px_30px_rgba(16,45,63,0.12)]",
        className,
      )}
    >
      <MessageCircle className="size-4" />
      {label}
    </Link>
  );
}
