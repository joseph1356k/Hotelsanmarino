-- Seed audit for functional layer
-- Populated entities after running this file:
--   site_settings: 1
--   contact_info: 1
--   whatsapp_ctas: 1
--   home_sections: 2
--   amenities: 8
--   rooms: 32
--   room_images: 32
--   room_amenities: 96
--   plans: 2
--   testimonials: 2
-- Not populated in this seed:
--   admin_users: 0
--   media_assets: 0

insert into public.site_settings (
  id, site_name, site_tagline, seo_title, seo_description, default_share_image
) values (
  'default',
  'Hotel San Marino Tumaco',
  'El Morro se vive aqui.',
  'Hotel San Marino Tumaco',
  'Una forma clara, comoda y cercana de vivir El Morro con atencion directa por WhatsApp.',
  '/placeholders/site.svg'
)
on conflict (id) do update set
  site_name = excluded.site_name,
  site_tagline = excluded.site_tagline,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  default_share_image = excluded.default_share_image;

insert into public.contact_info (
  id, phone, whatsapp_number, whatsapp_default_message, address, city, check_in_time, check_out_time
) values (
  'default',
  '+57 315 4974576',
  '+57 315 4974576',
  'Hola, quiero consultar disponibilidad',
  'Tumaco, Narino',
  'Tumaco',
  '15:00',
  '12:00'
)
on conflict (id) do update set
  phone = excluded.phone,
  whatsapp_number = excluded.whatsapp_number,
  whatsapp_default_message = excluded.whatsapp_default_message,
  address = excluded.address,
  city = excluded.city,
  check_in_time = excluded.check_in_time,
  check_out_time = excluded.check_out_time;

insert into public.whatsapp_ctas (
  id, key, label, message, phone_number, is_primary, display_order
) values (
  'd9a666fd-fd7f-4e76-97a7-386d3f132767',
  'primary',
  'Consultar por WhatsApp',
  'Hola, quiero consultar disponibilidad',
  '+573154974576',
  true,
  1
)
on conflict (key) do update set
  label = excluded.label,
  message = excluded.message,
  phone_number = excluded.phone_number,
  is_primary = excluded.is_primary,
  display_order = excluded.display_order;

insert into public.home_sections (
  id, key, title, subtitle, body, payload, status, display_order
) values
(
  '1d0a6ffc-0b25-4b09-bc51-f9156c5d0ea6',
  'hero',
  'El Morro se vive aqui',
  'Calma con identidad, cercania al mar y atencion directa.',
  'Hotel San Marino presenta una forma mas clara y comoda de quedarse en El Morro. En esta fase no hay reservas online: la conversacion comercial ocurre por WhatsApp.',
  '{"eyebrow":"Hotel San Marino","ctaLabel":"Consultar por WhatsApp"}'::jsonb,
  'published',
  1
),
(
  '8db85849-f64b-40bb-9aa5-4d7c253a1377',
  'featured_rooms',
  'Habitaciones para elegir con calma',
  'Imagen, capacidad y contexto para decidir mejor.',
  'Cada habitacion soporta amenities, imagen principal, galeria, SEO basico y orden de despliegue desde base de datos.',
  '{}'::jsonb,
  'published',
  2
)
on conflict (key) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  body = excluded.body,
  payload = excluded.payload,
  status = excluded.status,
  display_order = excluded.display_order;

insert into public.amenities (id, name, slug, icon_name, display_order) values
('c0f12625-6925-4f38-9916-56095ddce923', 'Aire acondicionado', 'aire-acondicionado', 'snowflake', 1),
('a0cad8d8-cc9b-4bcb-bd9f-a13f242bf3f1', 'WiFi', 'wifi', 'wifi', 2),
('c56c9c07-d790-4c58-bc6d-2eddb03d6f8a', 'TV', 'tv', 'tv', 3),
('f4e0ab09-f9ab-4f1a-9c6a-2b5d4b7ab101', 'Bano privado', 'bano-privado', 'bath', 4),
('b9fd773c-62d6-4ef2-9b49-e34a456d7202', 'Agua caliente', 'agua-caliente', 'droplets', 5),
('d0fbda8a-f95a-4c23-bf53-f55b49f52e12', 'Mini nevera', 'mini-nevera', 'refrigerator', 6),
('b9153c09-9de9-4fd4-b98a-2780dc0d8a63', 'Escritorio', 'escritorio', 'briefcase', 7),
('cb0dfc11-eac1-4c06-b693-c9d315f7e4a1', 'Ventilador', 'ventilador', 'fan', 8)
on conflict (slug) do update set
  name = excluded.name,
  icon_name = excluded.icon_name,
  display_order = excluded.display_order;

with room_seed as (
  select
    gs as room_number,
    (
      substr(md5('room-' || gs::text), 1, 8) || '-' ||
      substr(md5('room-' || gs::text), 9, 4) || '-' ||
      substr(md5('room-' || gs::text), 13, 4) || '-' ||
      substr(md5('room-' || gs::text), 17, 4) || '-' ||
      substr(md5('room-' || gs::text), 21, 12)
    )::uuid as id,
    lpad(gs::text, 2, '0') as room_code,
    case
      when gs between 1 and 8 then 2
      when gs between 9 and 20 then 3
      else 4
    end as capacity_value,
    case
      when gs between 1 and 8 then 175000
      when gs between 9 and 20 then 225000
      else 310000
    end as price_value,
    case
      when gs in (7, 14, 21, 28) then 'maintenance'
      else 'available'
    end as status_value,
    case
      when gs <= 8 then true
      else false
    end as featured_value
  from generate_series(1, 32) as gs
)
insert into public.rooms (
  id,
  name,
  slug,
  short_description,
  long_description,
  price,
  capacity,
  status,
  is_featured,
  display_order,
  primary_image,
  seo_title,
  seo_description
)
select
  id,
  'Habitacion ' || room_code,
  'habitacion-' || room_code,
  'Una opcion provisional bien presentada para vivir El Morro con mas comodidad.',
  'Habitacion ' || room_code || ' sembrada para validar lectura publica real, administracion persistente, amenidades relacionadas y una presentacion comercial coherente.',
  price_value,
  capacity_value,
  status_value,
  featured_value,
  room_number,
  '/placeholders/room.svg',
  'Habitacion ' || room_code || ' | Hotel San Marino Tumaco',
  'Habitacion ' || room_code || ' con contenido provisional administrado desde base de datos.'
from room_seed
on conflict (slug) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  long_description = excluded.long_description,
  price = excluded.price,
  capacity = excluded.capacity,
  status = excluded.status,
  is_featured = excluded.is_featured,
  display_order = excluded.display_order,
  primary_image = excluded.primary_image,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

with room_seed as (
  select
    gs as room_number,
    (
      substr(md5('room-' || gs::text), 1, 8) || '-' ||
      substr(md5('room-' || gs::text), 9, 4) || '-' ||
      substr(md5('room-' || gs::text), 13, 4) || '-' ||
      substr(md5('room-' || gs::text), 17, 4) || '-' ||
      substr(md5('room-' || gs::text), 21, 12)
    )::uuid as room_id,
    (
      substr(md5('room-image-' || gs::text), 1, 8) || '-' ||
      substr(md5('room-image-' || gs::text), 9, 4) || '-' ||
      substr(md5('room-image-' || gs::text), 13, 4) || '-' ||
      substr(md5('room-image-' || gs::text), 17, 4) || '-' ||
      substr(md5('room-image-' || gs::text), 21, 12)
    )::uuid as image_id,
    lpad(gs::text, 2, '0') as room_code
  from generate_series(1, 32) as gs
)
insert into public.room_images (
  id, room_id, storage_path, alt_text, is_primary, display_order
)
select
  image_id,
  room_id,
  '/placeholders/room.svg',
  'Placeholder habitacion ' || room_code,
  true,
  1
from room_seed
on conflict (id) do update set
  storage_path = excluded.storage_path,
  alt_text = excluded.alt_text,
  is_primary = excluded.is_primary,
  display_order = excluded.display_order;

with room_seed as (
  select
    gs as room_number,
    (
      substr(md5('room-' || gs::text), 1, 8) || '-' ||
      substr(md5('room-' || gs::text), 9, 4) || '-' ||
      substr(md5('room-' || gs::text), 13, 4) || '-' ||
      substr(md5('room-' || gs::text), 17, 4) || '-' ||
      substr(md5('room-' || gs::text), 21, 12)
    )::uuid as room_id
  from generate_series(1, 32) as gs
),
amenity_cycle as (
  select * from (
    values
      (1, 'c0f12625-6925-4f38-9916-56095ddce923'::uuid),
      (2, 'a0cad8d8-cc9b-4bcb-bd9f-a13f242bf3f1'::uuid),
      (3, 'c56c9c07-d790-4c58-bc6d-2eddb03d6f8a'::uuid),
      (4, 'f4e0ab09-f9ab-4f1a-9c6a-2b5d4b7ab101'::uuid),
      (5, 'b9fd773c-62d6-4ef2-9b49-e34a456d7202'::uuid),
      (6, 'd0fbda8a-f95a-4c23-bf53-f55b49f52e12'::uuid),
      (7, 'b9153c09-9de9-4fd4-b98a-2780dc0d8a63'::uuid),
      (8, 'cb0dfc11-eac1-4c06-b693-c9d315f7e4a1'::uuid)
  ) as amenity_cycle(idx, amenity_id)
)
insert into public.room_amenities (room_id, amenity_id)
select room_id, amenity_id
from (
  select
    room_seed.room_id,
    amenity_cycle.amenity_id,
    row_number() over (
      partition by room_seed.room_id
      order by amenity_cycle.idx
    ) as rn
  from room_seed
  join amenity_cycle
    on amenity_cycle.idx in (
      ((room_seed.room_number - 1) % 8) + 1,
      ((room_seed.room_number + 1) % 8) + 1,
      ((room_seed.room_number + 3) % 8) + 1
    )
) seeded_relations
where rn <= 3
on conflict do nothing;

insert into public.plans (
  id, name, slug, short_description, long_description, price_label, is_featured, display_order, image_path, status
) values
(
  '22b94f1c-2f6d-4a66-8180-85cb487663c6',
  'Plan Corporativo',
  'plan-corporativo',
  'Una opcion clara para viajes de trabajo en Tumaco.',
  'Plan base para estadias corporativas con presentacion publica, persistencia real y cierre comercial por WhatsApp.',
  'Desde $210.000 por noche',
  true,
  1,
  '/placeholders/plan.svg',
  'published'
),
(
  '4d1ebd48-f570-4697-b564-f7bcbccb3158',
  'Plan Escapada',
  'plan-escapada',
  'Una salida breve para quedarse cerca del mar con mas calma.',
  'Plan semilla pensado para escapadas cortas, sin reservas online ni checkout en esta fase.',
  'Consulta por WhatsApp',
  false,
  2,
  '/placeholders/plan.svg',
  'published'
)
on conflict (slug) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  long_description = excluded.long_description,
  price_label = excluded.price_label,
  is_featured = excluded.is_featured,
  display_order = excluded.display_order,
  image_path = excluded.image_path,
  status = excluded.status;

insert into public.testimonials (
  id, guest_name, guest_origin, quote, rating, is_featured, display_order, status
) values
(
  '4c4feb18-c263-4283-8186-b1f920a52fda',
  'Andrea M.',
  'Tumaco',
  'La ubicacion se siente practica y el contacto por WhatsApp hace todo mas claro desde el primer mensaje.',
  5,
  true,
  1,
  'published'
),
(
  '7073ad4b-e5da-46fc-91d6-f911987529c0',
  'Carlos R.',
  'Pasto',
  'Es una estadia sencilla, bien presentada y con una atencion mas directa de lo habitual.',
  4,
  false,
  2,
  'published'
)
on conflict (id) do update set
  guest_name = excluded.guest_name,
  guest_origin = excluded.guest_origin,
  quote = excluded.quote,
  rating = excluded.rating,
  is_featured = excluded.is_featured,
  display_order = excluded.display_order,
  status = excluded.status;
