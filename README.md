# Hotel San Marino Tumaco

Foundation layer hardened for DB-first content and admin access control.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Zod

## Required environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_ENABLE_DEV_CONTENT_FALLBACK=true
```

`NEXT_PUBLIC_ENABLE_DEV_CONTENT_FALLBACK` exists only for local development.
In production the app must fail loudly if essential DB content is missing or Supabase is down.

## Source of truth

- Editable content source of truth: Supabase tables
- Non-editable constants: `src/lib/constants`
- Development-only defaults: `src/content/dev-content.ts`
- Editorial image placeholders: `public/placeholders`

`src/content/dev-content.ts` is not a production content source.
It exists only to unblock local development when Supabase is not configured.

## Minimum verified DB reads

Server-side reads are implemented in:

- `site_settings`
- `contact_info`
- `whatsapp_ctas`
- `home_sections`
- `rooms`

Reference file:

- `src/lib/content/public-content.ts`

The loader behavior is strict:

- development + fallback enabled: local defaults allowed
- production without Supabase: infrastructure error
- production with missing essential content: missing-content error
- editorial placeholders for missing images remain intentional

## Seed audit

Current reproducible seed file:

- `supabase/seeds/000_foundation_seed.sql`

Current seeded counts:

- `site_settings`: 1
- `contact_info`: 1
- `whatsapp_ctas`: 1
- `home_sections`: 2
- `amenities`: 3
- `rooms`: 2
- `room_images`: 2
- `room_amenities`: 5
- `plans`: 2
- `testimonials`: 1
- `admin_users`: 0
- `media_assets`: 0

Inventory not yet loaded:

- 30 rooms pending for phase 2

## Security and RLS

Schema, constraints, indexes, RLS and Storage policies live in:

- `supabase/migrations/20260326170000_foundation.sql`

Highlights:

- RLS enabled on all editable public tables
- public read only where the site needs it
- admin writes restricted by `public.is_admin()`
- admin access checked in middleware and server layout
- Storage policies restricted to bucket `hotel-media`

## Local commands

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

## Out of scope in this phase

- reservations
- payments
- checkout
- public forms
- real availability logic
- multi-role auth
