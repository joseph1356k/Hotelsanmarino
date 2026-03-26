import { Star } from "lucide-react";
import type { Testimonial } from "@/types/domain";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article className="premium-card h-full p-6">
      <div className="flex items-center gap-1 text-[var(--coral)]">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={`${testimonial.id}-${index}`} className="size-4 fill-current" />
        ))}
      </div>
      <p className="mt-5 text-lg leading-8 text-foreground/90">“{testimonial.quote}”</p>
      <div className="mt-6 border-t border-border/70 pt-4">
        <p className="text-sm font-semibold text-foreground">{testimonial.guest_name}</p>
        {testimonial.guest_origin ? (
          <p className="text-sm text-muted-foreground">{testimonial.guest_origin}</p>
        ) : null}
      </div>
    </article>
  );
}
