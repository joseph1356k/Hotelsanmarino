import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function GalleryPage() {
  const content = await getPublicSiteContent();
  const galleryImages = content.rooms.flatMap((room) =>
    room.images.map((image) => ({
      id: image.id,
      src: image.storage_path,
      alt: image.alt_text ?? room.name,
    })),
  );

  const editorialGallery = [
    { id: "scene-home", src: coastalScenes.homeHero.src, alt: coastalScenes.homeHero.alt },
    { id: "scene-air", src: coastalScenes.aerial.src, alt: coastalScenes.aerial.alt },
    { id: "scene-arch", src: coastalScenes.arch.src, alt: coastalScenes.arch.alt },
    ...galleryImages,
  ];

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Galeria"
        title="Una galeria mas editorial, con Tumaco y El Morro dentro del relato visual."
        description="La composicion ya no se siente plugin-style: hay mas ritmo, mas fotografia local y una mezcla mejor entre contexto y espacios del hotel."
        imageSrc={coastalScenes.homeHero.src}
        imageAlt={coastalScenes.homeHero.alt}
      />

      <section className="section-shell">
        <Reveal className="mb-10">
          <SectionHeading
            eyebrow="Curaduria"
            title="Fotografia local y visuales del hotel en una sola parrilla."
            description="Aunque la media final del hotel siga creciendo, el sitio ya puede verse bien sin caer en cajas grises o placeholders impersonales."
          />
        </Reveal>
        <Reveal>
          <GalleryGrid items={editorialGallery} limit={18} />
        </Reveal>
      </section>
    </div>
  );
}
