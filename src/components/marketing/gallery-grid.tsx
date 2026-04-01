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
            "interactive-frame group relative overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-[0_22px_72px_rgba(24,79,95,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(24,79,95,0.14)]",
            index % 6 === 0
              ? "lg:col-span-7 lg:row-span-2"
              : index % 4 === 0
                ? "lg:col-span-5"
                : "lg:col-span-4",
          )}
        >
          <Image
            src={resolveEntityImage("site", item.src)}
            alt={item.alt}
            width={1200}
            height={900}
            className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.02)_10%,rgba(17,47,59,0.12)_42%,rgba(17,47,59,0.72)_100%)] opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="inline-flex max-w-full translate-y-2 items-center rounded-full bg-white/90 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur transition duration-500 group-hover:translate-y-0">
              {item.alt}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
