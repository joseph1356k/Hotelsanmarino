import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { PageHero } from "@/components/marketing/page-hero";
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

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Galeria"
        title="Imagenes tratadas con ritmo y aire"
        description="La galeria toma room_images desde DB y las presenta con una composicion editorial limpia, preparada para crecer sin volverse un collage caotico."
      />
      <section className="section-shell">
        <GalleryGrid items={galleryImages} limit={18} />
      </section>
    </div>
  );
}
