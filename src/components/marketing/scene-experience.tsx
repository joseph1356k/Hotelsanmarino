"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface SceneItem {
  id: string;
  label: string;
}

export function SceneExperience({
  items,
  className,
}: {
  items: SceneItem[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.dataset.sceneMode = "immersive";
    body.dataset.sceneMode = "immersive";

    const sections = itemIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-16% 0px -36% 0px",
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    let frame = 0;

    const updateProgress = () => {
      frame = window.requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.cancelAnimationFrame(frame);
      delete root.dataset.sceneMode;
      delete body.dataset.sceneMode;
    };
  }, [itemIds]);

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div
        className={cn(
          "pointer-events-auto relative rounded-[28px] border border-primary/10 bg-white/84 px-3 py-4 shadow-[0_18px_54px_rgba(24,79,95,0.12)] backdrop-blur-xl",
          className,
        )}
      >
        <div className="absolute bottom-4 right-[14px] top-4 w-px rounded-full bg-primary/10">
          <div
            className="w-full rounded-full bg-[linear-gradient(180deg,var(--sky)_0%,var(--coral)_62%,var(--sun)_100%)] transition-[height] duration-200"
            style={{ height: `${Math.max(progress * 100, 8)}%` }}
          />
        </div>
        
        <div className="pr-4">
          <div className="flex flex-col gap-3">
            {items.map((item, index) => {
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="group flex items-center justify-end gap-3"
                  aria-label={`Ir a ${item.label}`}
                >
                  <span
                    className={cn(
                      "max-w-0 overflow-hidden whitespace-nowrap text-right text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary/70 opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100",
                      isActive && "max-w-[10rem] opacity-100 text-[var(--coral)]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")} {item.label}
                  </span>
                  <span
                    className={cn(
                      "relative block size-2.5 rounded-full bg-primary/22 transition-all duration-300",
                      isActive && "size-3.5 bg-[var(--coral)] shadow-[0_0_0_5px_rgba(211,15,8,0.14)]",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
