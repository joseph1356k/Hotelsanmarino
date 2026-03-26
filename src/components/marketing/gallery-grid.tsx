import Image from "next/image";
import { resolveEntityImage } from "@/lib/media";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  src?: string | null;
  alt: string;
}

export function GalleryGrid({
  items,
  limit,
}: {
  items: GalleryItem[];
  limit?: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
      {items.slice(0, limit).map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "relative overflow-hidden rounded-[28px] bg-muted",
            index % 5 === 0
              ? "lg:col-span-7 lg:row-span-2"
              : index % 3 === 0
                ? "lg:col-span-5"
                : "lg:col-span-4",
          )}
        >
          <Image
            src={resolveEntityImage("room", item.src)}
            alt={item.alt}
            width={1200}
            height={900}
            className="aspect-[4/3] h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
          />
        </div>
      ))}
    </div>
  );
}
