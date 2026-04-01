import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SceneSection({
  id,
  children,
  className,
  immersive = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  immersive?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        immersive && "lg:flex lg:min-h-[72svh] lg:flex-col lg:justify-center",
        className,
      )}
    >
      {children}
    </section>
  );
}
