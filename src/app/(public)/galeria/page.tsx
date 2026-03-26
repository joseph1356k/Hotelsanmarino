import Image from "next/image";
import { SectionHeading } from "@/components/marketing/section-heading";
import { getPublicSiteContent } from "@/lib/content/public-content";
import { resolveEntityImage } from "@/lib/media";

export default async function GalleryPage() {
  const content = await getPublicSiteContent();
  const galleryImages = content.rooms.flatMap((room) =>
    room.images.map((image) => ({
      id: image.id,
      src: resolveEntityImage("room", image.storage_path),
      alt: image.alt_text ?? room.name,
    })),
  );

  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Galeria"
        title="Imagenes reales o fallback estructural"
        description="La galeria consume room_images desde DB. Si una habitacion aun no tiene asset real, conserva fallback editorial explicito."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {galleryImages.slice(0, 12).map((image) => (
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            width={800}
            height={800}
            className="aspect-square w-full rounded-[var(--radius)] border object-cover"
          />
        ))}
      </div>
    </section>
  );
}
