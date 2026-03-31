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
    <article className={cn("premium-card overflow-hidden", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={resolveEntityImage("plan", plan.image_path)}
          alt={plan.name}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover transition duration-700 hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,79,95,0.06)_0%,rgba(24,79,95,0.18)_42%,rgba(17,47,59,0.66)_100%)]" />

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {plan.is_featured ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--coral)] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white">
              <Star className="size-3.5 fill-current" />
              Destacado
            </div>
          ) : null}
          <div className="inline-flex items-center rounded-full bg-white/92 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Plan
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6 md:p-7">
        <div className="space-y-2">
          <h3 className="text-4xl leading-[0.94]">{plan.name}</h3>
          <p className="text-sm leading-7 text-muted-foreground">
            {plan.short_description}
          </p>
        </div>

        <p className="text-sm leading-7 text-foreground/82">{plan.long_description}</p>

        <div className="flex flex-col gap-4 border-t border-border/70 pt-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
              Salida comercial
            </p>
            <p className="mt-2 text-2xl text-primary">
              {plan.price_label ?? "Consulta por WhatsApp"}
            </p>
          </div>
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
