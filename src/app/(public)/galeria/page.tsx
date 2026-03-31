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
        title="Mira San Marino, El Morro y Tumaco desde una misma atmosfera."
        description="Una galeria para conocer mejor el hotel, su entorno y la energia costera que acompana cada estadia."
        imageSrc={coastalScenes.homeHero.src}
        imageAlt={coastalScenes.homeHero.alt}
      />

      <section className="section-shell">
        <Reveal className="mb-10">
          <SectionHeading
            eyebrow="Galeria"
            title="Una seleccion visual para sentir mejor el lugar antes de llegar."
            description="Entre espacios del hotel y escenas de Tumaco, esta galeria te ayuda a imaginar la experiencia con mas claridad."
          />
        </Reveal>
        <Reveal>
          <GalleryGrid items={editorialGallery} limit={18} />
        </Reveal>
      </section>
    </div>
  );
}
