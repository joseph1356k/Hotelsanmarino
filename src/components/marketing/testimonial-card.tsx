import { Star } from "lucide-react";
import type { Testimonial } from "@/types/domain";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article className="premium-card interactive-frame relative h-full overflow-hidden p-5 md:p-7">
      <div className="absolute right-5 top-2 font-serif text-7xl leading-none text-primary/8 md:right-6 md:top-3 md:text-8xl">
        &ldquo;
      </div>
      <div className="relative">
        <div className="flex items-center gap-1 text-[var(--sun)]">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={`${testimonial.id}-${index}`} className="size-4 fill-current" />
          ))}
        </div>
        <p className="mt-4 text-base leading-7 text-foreground/92 md:mt-5 md:text-lg md:leading-8">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/70 pt-4 md:mt-7">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {testimonial.guest_name}
            </p>
            {testimonial.guest_origin ? (
              <p className="text-sm text-muted-foreground">{testimonial.guest_origin}</p>
            ) : null}
          </div>
          <span className="inline-flex items-center rounded-full bg-primary/6 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
            Testimonio
          </span>
        </div>
      </div>
    </article>
  );
}
