create extension if not exists "pgcrypto";

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'admin' check (role = 'admin'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_users_email_not_blank check (length(trim(email)) > 3)
);

create unique index if not exists admin_users_email_unique_idx
  on public.admin_users (lower(email));

create table if not exists public.site_settings (
  id text primary key default 'default',
  site_name text not null,
  site_tagline text not null,
  seo_title text,
  seo_description text,
  logo_path text,
  default_share_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton_id check (id = 'default'),
  constraint site_settings_name_not_blank check (length(trim(site_name)) > 1),
  constraint site_settings_tagline_not_blank check (length(trim(site_tagline)) > 1)
);

create table if not exists public.contact_info (
  id text primary key default 'default',
  phone text not null,
  whatsapp_number text not null,
  whatsapp_default_message text not null,
  address text not null,
  city text not null,
  maps_embed_url text,
  email text,
  check_in_time text,
  check_out_time text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contact_info_singleton_id check (id = 'default'),
  constraint contact_phone_not_blank check (length(trim(phone)) > 6),
  constraint contact_whatsapp_not_blank check (length(trim(whatsapp_number)) > 6),
  constraint contact_message_not_blank check (length(trim(whatsapp_default_message)) > 2),
  constraint contact_address_not_blank check (length(trim(address)) > 2),
  constraint contact_city_not_blank check (length(trim(city)) > 1)
);

create table if not exists public.whatsapp_ctas (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  label text not null,
  message text not null,
  phone_number text not null,
  is_primary boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint whatsapp_cta_key_not_blank check (length(trim(key)) > 1),
  constraint whatsapp_cta_label_not_blank check (length(trim(label)) > 1),
  constraint whatsapp_cta_message_not_blank check (length(trim(message)) > 2),
  constraint whatsapp_cta_phone_not_blank check (length(trim(phone_number)) > 6),
  constraint whatsapp_cta_display_order_non_negative check (display_order >= 0)
);

create unique index if not exists whatsapp_ctas_key_unique_idx
  on public.whatsapp_ctas (key);

create unique index if not exists whatsapp_ctas_single_primary_idx
  on public.whatsapp_ctas (is_primary)
  where is_primary = true;

create index if not exists whatsapp_ctas_display_order_idx
  on public.whatsapp_ctas (display_order);

create table if not exists public.home_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  title text not null,
  subtitle text,
  body text,
  payload jsonb not null default '{}'::jsonb,
  status text not null check (status in ('draft', 'published', 'archived')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint home_sections_key_not_blank check (length(trim(key)) > 1),
  constraint home_sections_title_not_blank check (length(trim(title)) > 1),
  constraint home_sections_display_order_non_negative check (display_order >= 0)
);

create unique index if not exists home_sections_key_unique_idx
  on public.home_sections (key);

create index if not exists home_sections_status_order_idx
  on public.home_sections (status, display_order);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('room', 'plan', 'testimonial', 'home', 'site', 'contact')),
  entity_id uuid,
  bucket text not null default 'hotel-media',
  storage_path text not null,
  mime_type text,
  alt_text text,
  width integer,
  height integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_bucket_not_blank check (length(trim(bucket)) > 1),
  constraint media_assets_path_not_blank check (length(trim(storage_path)) > 1),
  constraint media_assets_dimensions_non_negative check (
    (width is null or width > 0) and
    (height is null or height > 0)
  )
);

create unique index if not exists media_assets_bucket_path_unique_idx
  on public.media_assets (bucket, storage_path);

create index if not exists media_assets_entity_idx
  on public.media_assets (entity_type, entity_id);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  short_description text not null,
  long_description text not null,
  price integer not null default 0,
  capacity integer not null default 1,
  status text not null check (status in ('available', 'maintenance', 'hidden')),
  is_featured boolean not null default false,
  display_order integer not null default 0,
  primary_image text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rooms_name_not_blank check (length(trim(name)) > 1),
  constraint rooms_slug_not_blank check (length(trim(slug)) > 1),
  constraint rooms_short_description_not_blank check (length(trim(short_description)) > 9),
  constraint rooms_long_description_not_blank check (length(trim(long_description)) > 19),
  constraint rooms_price_non_negative check (price >= 0),
  constraint rooms_capacity_positive check (capacity > 0),
  constraint rooms_display_order_non_negative check (display_order >= 0)
);

create unique index if not exists rooms_slug_unique_idx
  on public.rooms (slug);

create index if not exists rooms_status_order_idx
  on public.rooms (status, display_order);

create index if not exists rooms_featured_order_idx
  on public.rooms (is_featured, display_order);

create table if not exists public.room_images (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms (id) on delete cascade,
  asset_id uuid references public.media_assets (id) on delete set null,
  storage_path text,
  alt_text text,
  is_primary boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint room_images_has_source check (
    asset_id is not null or (storage_path is not null and length(trim(storage_path)) > 1)
  ),
  constraint room_images_display_order_non_negative check (display_order >= 0)
);

create index if not exists room_images_room_order_idx
  on public.room_images (room_id, display_order);

create unique index if not exists room_images_single_primary_per_room_idx
  on public.room_images (room_id)
  where is_primary = true;

create table if not exists public.amenities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  icon_name text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint amenities_name_not_blank check (length(trim(name)) > 1),
  constraint amenities_slug_not_blank check (length(trim(slug)) > 1),
  constraint amenities_display_order_non_negative check (display_order >= 0)
);

create unique index if not exists amenities_name_unique_idx
  on public.amenities (lower(name));

create unique index if not exists amenities_slug_unique_idx
  on public.amenities (slug);

create index if not exists amenities_display_order_idx
  on public.amenities (display_order);

create table if not exists public.room_amenities (
  room_id uuid not null references public.rooms (id) on delete cascade,
  amenity_id uuid not null references public.amenities (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (room_id, amenity_id)
);

create index if not exists room_amenities_amenity_idx
  on public.room_amenities (amenity_id);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  short_description text not null,
  long_description text not null,
  price_label text,
  is_featured boolean not null default false,
  display_order integer not null default 0,
  image_path text,
  status text not null check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint plans_name_not_blank check (length(trim(name)) > 1),
  constraint plans_slug_not_blank check (length(trim(slug)) > 1),
  constraint plans_short_description_not_blank check (length(trim(short_description)) > 9),
  constraint plans_long_description_not_blank check (length(trim(long_description)) > 19),
  constraint plans_display_order_non_negative check (display_order >= 0)
);

create unique index if not exists plans_slug_unique_idx
  on public.plans (slug);

create index if not exists plans_status_order_idx
  on public.plans (status, display_order);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  guest_origin text,
  quote text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  is_featured boolean not null default false,
  display_order integer not null default 0,
  status text not null check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint testimonials_guest_name_not_blank check (length(trim(guest_name)) > 1),
  constraint testimonials_quote_not_blank check (length(trim(quote)) > 9),
  constraint testimonials_display_order_non_negative check (display_order >= 0)
);

create index if not exists testimonials_status_order_idx
  on public.testimonials (status, display_order);

drop trigger if exists touch_admin_users_updated_at on public.admin_users;
create trigger touch_admin_users_updated_at
before update on public.admin_users
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_site_settings_updated_at on public.site_settings;
create trigger touch_site_settings_updated_at
before update on public.site_settings
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_contact_info_updated_at on public.contact_info;
create trigger touch_contact_info_updated_at
before update on public.contact_info
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_whatsapp_ctas_updated_at on public.whatsapp_ctas;
create trigger touch_whatsapp_ctas_updated_at
before update on public.whatsapp_ctas
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_home_sections_updated_at on public.home_sections;
create trigger touch_home_sections_updated_at
before update on public.home_sections
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_media_assets_updated_at on public.media_assets;
create trigger touch_media_assets_updated_at
before update on public.media_assets
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_rooms_updated_at on public.rooms;
create trigger touch_rooms_updated_at
before update on public.rooms
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_plans_updated_at on public.plans;
create trigger touch_plans_updated_at
before update on public.plans
for each row execute procedure public.touch_updated_at();

drop trigger if exists touch_testimonials_updated_at on public.testimonials;
create trigger touch_testimonials_updated_at
before update on public.testimonials
for each row execute procedure public.touch_updated_at();

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_info enable row level security;
alter table public.whatsapp_ctas enable row level security;
alter table public.home_sections enable row level security;
alter table public.media_assets enable row level security;
alter table public.rooms enable row level security;
alter table public.room_images enable row level security;
alter table public.amenities enable row level security;
alter table public.room_amenities enable row level security;
alter table public.plans enable row level security;
alter table public.testimonials enable row level security;

create policy "admin_users_select_self"
on public.admin_users
for select
using (auth.uid() = id);

create policy "admin_users_update_self"
on public.admin_users
for update
using (auth.uid() = id)
with check (auth.uid() = id and role = 'admin');

create policy "site_settings_public_read"
on public.site_settings
for select
using (true);

create policy "site_settings_admin_write"
on public.site_settings
for all
using (public.is_admin())
with check (public.is_admin());

create policy "contact_info_public_read"
on public.contact_info
for select
using (true);

create policy "contact_info_admin_write"
on public.contact_info
for all
using (public.is_admin())
with check (public.is_admin());

create policy "whatsapp_ctas_public_read"
on public.whatsapp_ctas
for select
using (true);

create policy "whatsapp_ctas_admin_write"
on public.whatsapp_ctas
for all
using (public.is_admin())
with check (public.is_admin());

create policy "home_sections_public_read"
on public.home_sections
for select
using (status = 'published');

create policy "home_sections_admin_write"
on public.home_sections
for all
using (public.is_admin())
with check (public.is_admin());

create policy "media_assets_public_read"
on public.media_assets
for select
using (true);

create policy "media_assets_admin_write"
on public.media_assets
for all
using (public.is_admin())
with check (public.is_admin());

create policy "rooms_public_read"
on public.rooms
for select
using (status <> 'hidden');

create policy "rooms_admin_write"
on public.rooms
for all
using (public.is_admin())
with check (public.is_admin());

create policy "room_images_public_read"
on public.room_images
for select
using (
  exists (
    select 1
    from public.rooms
    where rooms.id = room_images.room_id
      and rooms.status <> 'hidden'
  )
);

create policy "room_images_admin_write"
on public.room_images
for all
using (public.is_admin())
with check (public.is_admin());

create policy "amenities_public_read"
on public.amenities
for select
using (true);

create policy "amenities_admin_write"
on public.amenities
for all
using (public.is_admin())
with check (public.is_admin());

create policy "room_amenities_public_read"
on public.room_amenities
for select
using (
  exists (
    select 1
    from public.rooms
    where rooms.id = room_amenities.room_id
      and rooms.status <> 'hidden'
  )
);

create policy "room_amenities_admin_write"
on public.room_amenities
for all
using (public.is_admin())
with check (public.is_admin());

create policy "plans_public_read"
on public.plans
for select
using (status = 'published');

create policy "plans_admin_write"
on public.plans
for all
using (public.is_admin())
with check (public.is_admin());

create policy "testimonials_public_read"
on public.testimonials
for select
using (status = 'published');

create policy "testimonials_admin_write"
on public.testimonials
for all
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'hotel-media',
  'hotel-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "hotel_media_public_read"
on storage.objects
for select
using (bucket_id = 'hotel-media');

create policy "hotel_media_admin_insert"
on storage.objects
for insert
with check (bucket_id = 'hotel-media' and public.is_admin());

create policy "hotel_media_admin_update"
on storage.objects
for update
using (bucket_id = 'hotel-media' and public.is_admin())
with check (bucket_id = 'hotel-media' and public.is_admin());

create policy "hotel_media_admin_delete"
on storage.objects
for delete
using (bucket_id = 'hotel-media' and public.is_admin());
