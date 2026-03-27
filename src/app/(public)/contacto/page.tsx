import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SocialLinks } from "@/components/marketing/social-links";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
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
        title="Hablar con el hotel debe sentirse facil"
        description="No hay formularios publicos en esta fase. La web concentra informacion clara y lleva la conversacion comercial a WhatsApp."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label={primaryCta?.label ?? "Consultar por WhatsApp"}
          />
        }
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {contactBlocks.map((block, index) => {
              const Icon = block.icon;
              return (
                <Reveal key={block.title} delay={index * 70}>
                  <article className="premium-card p-6">
                    <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-muted text-primary">
                      <Icon className="size-5" />
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {block.title}
                    </p>
                    <p className="mt-3 text-lg leading-7 text-foreground/86">{block.value}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="space-y-5">
            <div className="mist-panel p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Mensaje base
              </p>
              <p className="mt-4 text-xl leading-8 text-foreground/86">
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
            <div className="rounded-[32px] border border-dashed border-primary/25 bg-[linear-gradient(180deg,rgba(238,242,241,0.78),rgba(247,243,236,0.94))] p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Mapa y referencia
              </p>
              <p className="mt-4 text-lg leading-7 text-foreground/86">
                {content.contactInfo.address}. Si necesitas una referencia puntual
                para llegar, la forma correcta es escribir y confirmar por WhatsApp.
              </p>
            </div>
            <div className="premium-card p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Redes sociales
              </p>
              <p className="mt-4 text-lg leading-7 text-foreground/86">
                Tambien puedes seguir a San Marino en Instagram, TikTok y Facebook.
              </p>
              <SocialLinks className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Canal principal"
        title="El siguiente paso no es un formulario: es una conversacion"
        description="San Marino usa WhatsApp como salida comercial real para atender dudas, orientar opciones y seguir la conversacion de forma directa."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Ir a WhatsApp"
            className="bg-white text-primary hover:bg-white/92"
          />
        }
      />
    </div>
  );
}
