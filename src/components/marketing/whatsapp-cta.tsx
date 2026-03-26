import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsappCtaProps {
  phoneNumber: string;
  message: string;
  label?: string;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function WhatsappCta({
  phoneNumber,
  message,
  label = "Consultar por WhatsApp",
  className,
  variant = "default",
  size = "default",
}: WhatsappCtaProps) {
  const href = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
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
