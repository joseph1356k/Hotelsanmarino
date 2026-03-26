create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'admin' check (role = 'admin'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id text primary key,
  site_name text not null,
  site_tagline text not null,
  seo_title text,
  seo_description text,
  logo_path text,
  default_share_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_info (
  id text primary key,
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
  updated_at timestamptz not null default now()
);

create table if not exists public.whatsapp_ctas (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  message text not null,
  phone_number text not null,
  is_primary boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.home_sections (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  subtitle text,
  body text,
  payload jsonb not null default '{}'::jsonb,
  status text not null check (status in ('draft', 'published', 'archived')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
  updated_at timestamptz not null default now()
);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
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
  updated_at timestamptz not null default now()
);

create table if not exists public.room_images (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms (id) on delete cascade,
  asset_id uuid references public.media_assets (id) on delete set null,
  storage_path text,
  alt_text text,
  is_primary boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.amenities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  icon_name text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.room_amenities (
  room_id uuid not null references public.rooms (id) on delete cascade,
  amenity_id uuid not null references public.amenities (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (room_id, amenity_id)
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text not null,
  long_description text not null,
  price_label text,
  is_featured boolean not null default false,
  display_order integer not null default 0,
  image_path text,
  status text not null check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
  updated_at timestamptz not null default now()
);

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

create policy "public read site settings" on public.site_settings for select using (true);
create policy "public read contact info" on public.contact_info for select using (true);
create policy "public read whatsapp ctas" on public.whatsapp_ctas for select using (true);
create policy "public read published home sections" on public.home_sections for select using (status = 'published');
create policy "public read visible rooms" on public.rooms for select using (status <> 'hidden');
create policy "public read room images" on public.room_images for select using (true);
create policy "public read amenities" on public.amenities for select using (true);
create policy "public read room amenities" on public.room_amenities for select using (true);
create policy "public read published plans" on public.plans for select using (status = 'published');
create policy "public read published testimonials" on public.testimonials for select using (status = 'published');

create policy "admins manage everything: admin_users" on public.admin_users for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "admins manage everything: site_settings" on public.site_settings for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: contact_info" on public.contact_info for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: whatsapp_ctas" on public.whatsapp_ctas for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: home_sections" on public.home_sections for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: media_assets" on public.media_assets for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: rooms" on public.rooms for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: room_images" on public.room_images for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: amenities" on public.amenities for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: room_amenities" on public.room_amenities for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: plans" on public.plans for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));

create policy "admins manage everything: testimonials" on public.testimonials for all
  using (exists (select 1 from public.admin_users where id = auth.uid()))
  with check (exists (select 1 from public.admin_users where id = auth.uid()));
