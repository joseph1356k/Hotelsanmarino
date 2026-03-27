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
            "group relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#ffffff,#faf7f2)] shadow-[0_16px_44px_rgba(15,95,143,0.08)]",
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
            className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F5F8F]/24 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
}
