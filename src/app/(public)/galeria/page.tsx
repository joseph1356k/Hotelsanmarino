import Image from "next/image";
import { SectionHeading } from "@/components/marketing/section-heading";

export default function GalleryPage() {
  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Galería"
        title="Media preparada para Storage + fallback"
        description="La galería final se alimentará desde `media_assets` y `room_images`. Por ahora se muestran placeholders estructurales."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Image
            key={index}
            src="/placeholders/gallery.svg"
            alt={`Placeholder galería ${index + 1}`}
            width={800}
            height={800}
            className="aspect-square w-full rounded-[var(--radius)] border object-cover"
          />
        ))}
      </div>
    </section>
  );
}
