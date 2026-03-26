import { SectionHeading } from "@/components/marketing/section-heading";

export default function AboutPage() {
  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Nosotros"
        title="Narrativa institucional editable"
        description="La arquitectura reserva `home_sections` y `site_settings` para gestionar narrativa, subtítulos y bloques destacados desde base de datos."
      />
    </section>
  );
}
