import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import { getAiAnswerAnchor, type AiAnswer } from "@/content/ai-answer-content";
import { cn } from "@/lib/utils";

type AiAnswerVariant = "ivory" | "sand" | "marine";

const variantClassNames: Record<
  AiAnswerVariant,
  {
    section: string;
    eyebrow: string;
    title: string;
    description: string;
    card: string;
    question: string;
    answer: string;
    detail: string;
    link: string;
  }
> = {
  ivory: {
    section: "bg-[#f7f3ec]",
    eyebrow: "text-[var(--mangrove)]",
    title: "text-primary",
    description: "text-foreground/74",
    card: "border-[#d8cbbb] bg-white shadow-[0_18px_56px_rgba(21,59,82,0.07)]",
    question: "text-primary",
    answer: "text-foreground/88",
    detail: "text-foreground/70",
    link: "text-primary hover:text-[var(--coral)]",
  },
  sand: {
    section: "bg-[#e9dfcf]",
    eyebrow: "text-[var(--mangrove)]",
    title: "text-primary",
    description: "text-foreground/74",
    card: "border-[#d8cbbb] bg-[#fffaf2] shadow-[0_18px_56px_rgba(21,59,82,0.07)]",
    question: "text-primary",
    answer: "text-foreground/88",
    detail: "text-foreground/70",
    link: "text-primary hover:text-[var(--coral)]",
  },
  marine: {
    section: "bg-[#153b52] text-white",
    eyebrow: "text-white/58",
    title: "text-white",
    description: "text-white/74",
    card: "border-white/12 bg-white/8 shadow-[0_18px_56px_rgba(0,0,0,0.08)]",
    question: "text-white",
    answer: "text-white/90",
    detail: "text-white/68",
    link: "text-white hover:text-[var(--marine-mist)]",
  },
};

export function AiAnswerSection({
  id,
  eyebrow = "Respuestas rápidas",
  title,
  description,
  answers,
  phoneNumber,
  trackingSource,
  ctaLabel = "Preguntar por WhatsApp",
  variant = "ivory",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  answers: readonly AiAnswer[];
  phoneNumber?: string;
  trackingSource: string;
  ctaLabel?: string;
  variant?: AiAnswerVariant;
  className?: string;
}) {
  if (answers.length === 0) {
    return null;
  }

  const styles = variantClassNames[variant];
  const headingId = id ? `${id}-title` : undefined;
  const firstAnswer = answers[0];

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(styles.section, "py-16 md:py-24", className)}
    >
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="max-w-3xl lg:sticky lg:top-28">
            <div
              className={cn(
                "inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em]",
                styles.eyebrow,
              )}
            >
              <span className="h-px w-10 bg-[linear-gradient(90deg,var(--coral),var(--sun))]" />
              <span>{eyebrow}</span>
            </div>
            <h2
              id={headingId}
              className={cn(
                "mt-4 text-balance text-[2.45rem] leading-[0.94] sm:text-5xl lg:text-6xl",
                styles.title,
              )}
            >
              {title}
            </h2>
            {description ? (
              <p className={cn("mt-5 max-w-2xl text-base leading-8", styles.description)}>
                {description}
              </p>
            ) : null}
            {phoneNumber ? (
              <TrackedWhatsappCta
                phoneNumber={phoneNumber}
                message={firstAnswer.ctaMessage}
                label={ctaLabel}
                trackingSource={trackingSource}
                trackingLabel={ctaLabel}
                trackingDetail={firstAnswer.question}
                className="mt-7"
              />
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {answers.map((answer, index) => (
              <article
                key={answer.id}
                id={getAiAnswerAnchor(answer)}
                className={cn(
                  "group flex h-full scroll-mt-28 flex-col rounded-[16px] border p-5 transition duration-300 hover:-translate-y-1 md:p-6",
                  styles.card,
                )}
              >
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--coral)]/12 text-[var(--coral)]">
                  {index === 0 ? (
                    <MessageCircle className="size-4" aria-hidden />
                  ) : (
                    <Sparkles className="size-4" aria-hidden />
                  )}
                </div>
                <h3 className={cn("mt-5 text-2xl leading-[1.05]", styles.question)}>
                  {answer.question}
                </h3>
                <p className={cn("mt-4 text-sm font-semibold leading-7", styles.answer)}>
                  {answer.shortAnswer}
                </p>
                <p className={cn("mt-2 flex-1 text-sm leading-7", styles.detail)}>
                  {answer.detail}
                </p>
                <Link
                  href={answer.relatedHref}
                  className={cn(
                    "mt-5 inline-flex items-center gap-2 text-sm font-semibold transition",
                    styles.link,
                  )}
                >
                  {answer.relatedLabel}
                  <ArrowRight
                    className="size-4 transition group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
