# Hotel San Marino Tumaco

Base arquitectónica inicial del nuevo sitio web con:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth / PostgreSQL / Storage
- Zod

## Variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Ejecución local

```bash
npm install
npm run dev
```

## Estructura

- `src/app/(public)`: rutas públicas
- `src/app/admin/login`: acceso admin
- `src/app/admin/(protected)`: panel protegido
- `src/components`: componentes UI, marketing y layout
- `src/lib/supabase`: clientes y middleware de Supabase
- `src/lib/auth`: guardas y helpers de admin
- `src/lib/content`: acceso a contenido editable con fallback
- `src/content`: contenido provisional mientras se conecta DB
- `supabase/migrations`: esquema SQL base
- `supabase/seeds`: seed reproducible inicial

## Alcance de fase 1

- Rutas públicas y admin base creadas
- Integración inicial con Supabase
- Login admin básico
- Dominio modelado para habitaciones, planes, testimonios, home, settings, contacto, media y WhatsApp CTA
- Estrategia de placeholders y media fallback
- Semilla reproducible inicial

## Fuera de alcance en esta fase

- Reservas
- Pagos
- Checkout
- Formularios públicos
- Disponibilidad real
- Multi-rol
- Blog
- SEO avanzado
