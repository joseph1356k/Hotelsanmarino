# Foundation Audit

## A. Current findings resolved

- Production no longer masks a broken or missing database with fake content.
- `src/content` no longer competes with DB as a final content source.
- Admin summary no longer invents counts from local fallback data.
- Admin middleware now rejects authenticated non-admin users.
- SQL schema now has stronger constraints, indexes and update triggers.
- Storage policies now exist for bucket `hotel-media`.

## B. Seed status

Seed file: `supabase/seeds/000_foundation_seed.sql`

Exact records included today:

- 1 `site_settings`
- 1 `contact_info`
- 1 `whatsapp_ctas`
- 2 `home_sections`
- 3 `amenities`
- 2 `rooms`
- 2 `room_images`
- 5 `room_amenities`
- 2 `plans`
- 1 `testimonials`

Not seeded intentionally:

- 0 `admin_users`
- 0 `media_assets`

## C. Production behavior

- If Supabase is missing in production, the app throws an infrastructure error.
- If essential DB content is missing in production, the app throws a missing-content error.
- If an entity image is missing, the app may still use the intentional placeholder for that entity type.

## D. Ready for prompt 2

- DB-first content contract is explicit
- schema integrity is materially stronger
- RLS and Storage policies are defined
- admin gate is stricter
- essential reads are wired to DB
