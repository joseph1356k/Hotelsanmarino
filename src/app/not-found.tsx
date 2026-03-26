import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[60vh] flex-col items-start justify-center gap-4 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="text-4xl">Ruta no encontrada</h1>
      <p className="max-w-lg text-muted-foreground">
        La arquitectura base ya define las rutas obligatorias; si llegaste aquí, la URL no pertenece al alcance actual.
      </p>
      <Link href="/" className="text-sm font-semibold text-primary">
        Volver al inicio
      </Link>
    </main>
  );
}
