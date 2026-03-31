import Image from "next/image";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SocialLinks } from "@/components/marketing/social-links";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function ContactPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  const contactBlocks = [
    {
      title: "Telefono",
      value: content.contactInfo.phone,
      icon: Phone,
    },
    {
      title: "WhatsApp",
      value: primaryCta?.phone_number ?? content.contactInfo.whatsapp_number,
      icon: MessageCircle,
    },
    {
      title: "Direccion",
      value: content.contactInfo.address,
      icon: MapPin,
    },
    {
      title: "Email",
      value: content.contactInfo.email ?? "Se coordina por WhatsApp",
      icon: Mail,
    },
    {
      title: "Check-in",
      value: content.contactInfo.check_in_time ?? "--",
      icon: Clock3,
    },
    {
      title: "Check-out",
      value: content.contactInfo.check_out_time ?? "--",
      icon: Clock3,
    },
  ];

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Contacto"
        title="Hablar con el hotel ya se siente mas directo, mas claro y mejor resuelto."
        description="No hay formularios publicos. La pagina concentra informacion util, redes y salida inmediata a WhatsApp dentro de una presentacion mucho mas fuerte."
        imageSrc={coastalScenes.homeHero.src}
        imageAlt={coastalScenes.homeHero.alt}
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label={primaryCta?.label ?? "Consultar por WhatsApp"}
          />
        }
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-6">
            <Reveal>
              <SectionHeading
                eyebrow="Datos base"
                title="Toda la informacion esencial en una sola vista."
                description="Telefono, direccion, horarios y redes dentro de una capa mucho mas ordenada y legible."
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {contactBlocks.map((block, index) => {
                const Icon = block.icon;
                return (
                  <Reveal key={block.title} delay={index * 60}>
                    <article className="premium-card p-6">
                      <div className="inline-flex size-11 items-center justify-center rounded-[22px] bg-primary/8 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <p className="mt-5 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                        {block.title}
                      </p>
                      <p className="mt-3 text-lg leading-7 text-foreground/86">
                        {block.value}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <Reveal>
              <div className="mist-panel p-6 md:p-7">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Mensaje base
                </p>
                <p className="mt-4 text-2xl leading-8 text-foreground/86">
                  {primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
                </p>
                <div className="mt-6">
                  <WhatsappCta
                    phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
                    message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
                    label="Abrir WhatsApp"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="premium-card overflow-hidden p-3">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[26px]">
                  <Image
                    src={coastalScenes.arch.src}
                    alt={coastalScenes.arch.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.04),rgba(17,47,59,0.56))]" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="premium-card p-6 md:p-7">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Redes sociales
                </p>
                <p className="mt-4 text-lg leading-8 text-foreground/86">
                  Instagram, TikTok y Facebook como extensiones activas de la marca.
                </p>
                <SocialLinks className="mt-6" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Canal principal"
        title="El siguiente paso no es un formulario: es una conversacion."
        description="San Marino usa WhatsApp como salida comercial real para atender dudas, orientar opciones y seguir la conversacion de forma directa."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Ir a WhatsApp"
          />
        }
      />
    </div>
  );
}
