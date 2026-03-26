import Image from "next/image";
import { Star } from "lucide-react";
import { resolveEntityImage } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { Plan, WhatsappCta } from "@/types/domain";
import { WhatsappCta as WhatsappButton } from "@/components/marketing/whatsapp-cta";

export function PlanCard({
  plan,
  primaryCta,
  className,
}: {
  plan: Plan;
  primaryCta?: WhatsappCta | null;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "premium-card overflow-hidden",
        className,
      )}
    >
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={resolveEntityImage("plan", plan.image_path)}
          alt={plan.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
        {plan.is_featured ? (
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary-foreground">
            <Star className="size-3.5" />
            Destacado
          </div>
        ) : null}
      </div>
      <div className="space-y-5 p-6 md:p-7">
        <div className="space-y-2">
          <h3 className="text-3xl leading-none">{plan.name}</h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {plan.short_description}
          </p>
        </div>
        <p className="text-sm leading-6 text-foreground/82">{plan.long_description}</p>
        <div className="flex flex-col gap-4 border-t border-border/70 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-lg font-semibold text-primary">
            {plan.price_label ?? "Consulta por WhatsApp"}
          </p>
          {primaryCta ? (
            <WhatsappButton
              phoneNumber={primaryCta.phone_number}
              message={`${primaryCta.message} sobre ${plan.name}`}
              label="Consultar plan"
              variant="secondary"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
