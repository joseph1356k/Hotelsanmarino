import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsappCtaProps {
  phoneNumber: string;
  message: string;
  label?: string;
  className?: string;
}

export function WhatsappCta({
  phoneNumber,
  message,
  label = "Consultar por WhatsApp",
  className,
}: WhatsappCtaProps) {
  const href = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(buttonVariants(), className)}
    >
      <MessageCircle className="size-4" />
      {label}
    </Link>
  );
}
