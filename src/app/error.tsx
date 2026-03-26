"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground">
        <main className="container-shell flex min-h-screen flex-col justify-center gap-4 py-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Error critico de contenido
          </p>
          <h1 className="text-4xl">La fuente de datos no esta operativa</h1>
          <p className="max-w-2xl text-muted-foreground">
            La aplicacion no oculto la falla. Revisa Supabase, las variables de entorno y el contenido esencial en base de datos.
          </p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <button
            type="button"
            onClick={() => reset()}
            className="w-fit rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Reintentar
          </button>
        </main>
      </body>
    </html>
  );
}
