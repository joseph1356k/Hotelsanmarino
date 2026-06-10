import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AiAnswerSection } from "@/components/marketing/ai-answer-section";
import { JsonLdScript } from "@/components/marketing/json-ld-script";
import { PageHero } from "@/components/marketing/page-hero";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import {
  aiAnswerCategoryLabels,
  aiAnswers,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  getAiAnswerCanonicalPath,
  getAiAnswersByCategory,
  type AiAnswerCategory,
} from "@/content/ai-answer-content";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Hotel San Marino Tumaco",
  description:
    "Respuestas directas sobre Hotel San Marino Tumaco: ubicación en El Morro, piscina, restaurante, habitaciones, parqueadero, recepción 24h y reserva por WhatsApp.",
  keywords: [
    "preguntas Hotel San Marino Tumaco",
    "hotel en El Morro Tumaco",
    "hotel con piscina en Tumaco",
    "hotel con restaurante en Tumaco",
    "reservar hotel Tumaco WhatsApp",
  ],
};

const answerGroups: AiAnswerCategory[] = [
  "ubicacion",
  "reservas",
  "habitaciones",
  "servicios",
  "restaurante",
  "planes",
  "confianza",
];

export default async function PreguntasFrecuentesPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const whatsappPhone = primaryCta?.phone_number ?? content.contactInfo.whatsapp_number;
  const jsonLd = [
    buildFaqJsonLd(aiAnswers),
    buildBreadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
    ]),
  ];

  return (
    <div className="pb-16 md:pb-24">
      <JsonLdScript data={jsonLd} />

      <PageHero
        eyebrow="Preguntas frecuentes"
        title="Respuestas claras antes de escribir por WhatsApp."
        description="Esta página concentra respuestas canónicas para personas y motores de IA: ubicación, servicios, habitaciones, planes y reserva directa."
        imageSrc={coastalScenes.arch.src}
        imageAlt="El Morro en Tumaco, ubicación de referencia para Hotel San Marino"
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message="Hola, tengo una pregunta sobre Hotel San Marino Tumaco."
            label="Preguntar por WhatsApp"
            trackingSource="faq_hero"
            trackingLabel="Preguntar por WhatsApp"
          />
        }
        aside={
          <div className="mist-panel p-6">
            <MessageCircle className="size-6 text-[var(--coral)]" aria-hidden />
            <p className="mt-4 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
              Respuesta directa
            </p>
            <p className="mt-3 text-2xl leading-8 text-primary">
              Si necesitas confirmar fechas, tarifas o disponibilidad, el canal final
              sigue siendo WhatsApp.
            </p>
          </div>
        }
      />

      <section className="section-shell pb-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {answerGroups.slice(0, 4).map((category) => (
            <Link
              key={category}
              href={`#faq-${category}`}
              className="group rounded-[16px] border border-[#d8cbbb] bg-[#fffaf2] p-5 shadow-[0_18px_56px_rgba(21,59,82,0.07)] transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(21,59,82,0.11)]"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mangrove)]">
                Tema
              </p>
              <h2 className="mt-3 text-3xl leading-none text-primary">
                {aiAnswerCategoryLabels[category]}
              </h2>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:text-[var(--coral)]">
                Ver respuestas
                <ArrowRight className="size-4" aria-hidden />
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-[20px] border border-[#d8cbbb] bg-[#fffaf2] p-5 shadow-[0_18px_56px_rgba(21,59,82,0.07)] md:p-7">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mangrove)]">
            Atajos por pregunta
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {aiAnswers.map((answer) => (
              <Link
                key={answer.id}
                href={getAiAnswerCanonicalPath(answer)}
                className="group rounded-[12px] border border-[#d8cbbb] bg-white px-4 py-3 text-sm font-semibold leading-6 text-primary transition hover:border-primary/30 hover:bg-primary/5"
              >
                {answer.question}
                <ArrowRight
                  className="ml-2 inline size-4 transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {answerGroups.map((category, index) => {
        const answers = getAiAnswersByCategory([category]);

        return (
          <AiAnswerSection
            key={category}
            id={`faq-${category}`}
            eyebrow={aiAnswerCategoryLabels[category]}
            title={`Preguntas sobre ${aiAnswerCategoryLabels[category].toLowerCase()}.`}
            description="Cada respuesta empieza con una frase corta y luego aclara lo que sí se puede afirmar sin inventar datos."
            answers={answers}
            phoneNumber={whatsappPhone}
            trackingSource={`faq_${category}`}
            ctaLabel="Consultar por WhatsApp"
            variant={index % 2 === 0 ? "ivory" : "sand"}
          />
        );
      })}
    </div>
  );
}
