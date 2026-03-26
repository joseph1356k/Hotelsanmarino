insert into public.site_settings (
  id, site_name, site_tagline, seo_title, seo_description, default_share_image
) values (
  'default',
  'Hotel San Marino Tumaco',
  'Estadía frente al Pacífico con operación simple y contenido editable.',
  'Hotel San Marino Tumaco',
  'Sitio institucional con contenido editable desde Supabase y CTA comercial único vía WhatsApp.',
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
  'Tumaco, Nariño',
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
  'Hotel San Marino Tumaco',
  'Base comercial enfocada en conversación directa por WhatsApp.',
  'Sin reservas online en esta fase. Sin formularios públicos. La conversión central es abrir conversación con el hotel.',
  '{"eyebrow":"Foundation layer","ctaLabel":"Consultar por WhatsApp"}'::jsonb,
  'published',
  1
),
(
  '8db85849-f64b-40bb-9aa5-4d7c253a1377',
  'featured_rooms',
  'Habitaciones editables desde base de datos',
  'La arquitectura queda lista para crecer hasta 32 habitaciones.',
  'Cada habitación soporta amenities, imágenes relacionadas, SEO básico y orden de despliegue.',
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
('c56c9c07-d790-4c58-bc6d-2eddb03d6f8a', 'TV', 'tv', 'tv', 3)
on conflict (slug) do update set
  name = excluded.name,
  icon_name = excluded.icon_name,
  display_order = excluded.display_order;

insert into public.rooms (
  id, name, slug, short_description, long_description, price, capacity, status, is_featured, display_order, primary_image, seo_title, seo_description
) values
(
  '4e3c9d4d-77f5-4fba-a521-4ca47b3405db',
  'Habitación Estándar',
  'habitacion-estandar',
  'Solución operativa para viajeros que priorizan descanso y ubicación.',
  'Habitación provisional para la fase fundacional del sitio. La arquitectura queda preparada para sustituir textos, fotos y precio por data real desde admin sin tocar código.',
  180000,
  2,
  'available',
  true,
  1,
  '/placeholders/room.svg',
  'Habitación Estándar | Hotel San Marino Tumaco',
  'Habitación base editable desde admin para la nueva arquitectura del sitio.'
),
(
  '6f8f059c-2f71-4960-901e-f5966521f5f2',
  'Habitación Familiar',
  'habitacion-familiar',
  'Configuración provisional para grupos pequeños o familias.',
  'Preparada para crecer hasta 32 habitaciones sin cambiar el modelo de dominio. El estado es puramente administrativo y no representa disponibilidad real.',
  320000,
  4,
  'available',
  true,
  2,
  '/placeholders/room.svg',
  'Habitación Familiar | Hotel San Marino Tumaco',
  'Habitación familiar provisional orientada a edición desde base de datos.'
)
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

insert into public.room_images (
  id, room_id, storage_path, alt_text, is_primary, display_order
) values
('7ae36933-fcf4-4f8d-976b-b4ddb52e250f', '4e3c9d4d-77f5-4fba-a521-4ca47b3405db', '/placeholders/room.svg', 'Placeholder de habitación estándar', true, 1),
('44f1db1e-c3b6-4da4-9393-dac573ec3ee1', '6f8f059c-2f71-4960-901e-f5966521f5f2', '/placeholders/room.svg', 'Placeholder de habitación familiar', true, 1)
on conflict (id) do update set
  storage_path = excluded.storage_path,
  alt_text = excluded.alt_text,
  is_primary = excluded.is_primary,
  display_order = excluded.display_order;

insert into public.room_amenities (room_id, amenity_id) values
('4e3c9d4d-77f5-4fba-a521-4ca47b3405db', 'c0f12625-6925-4f38-9916-56095ddce923'),
('4e3c9d4d-77f5-4fba-a521-4ca47b3405db', 'a0cad8d8-cc9b-4bcb-bd9f-a13f242bf3f1'),
('6f8f059c-2f71-4960-901e-f5966521f5f2', 'c0f12625-6925-4f38-9916-56095ddce923'),
('6f8f059c-2f71-4960-901e-f5966521f5f2', 'a0cad8d8-cc9b-4bcb-bd9f-a13f242bf3f1'),
('6f8f059c-2f71-4960-901e-f5966521f5f2', 'c56c9c07-d790-4c58-bc6d-2eddb03d6f8a')
on conflict do nothing;

insert into public.plans (
  id, name, slug, short_description, long_description, price_label, is_featured, display_order, image_path, status
) values
(
  '22b94f1c-2f6d-4a66-8180-85cb487663c6',
  'Plan Corporativo',
  'plan-corporativo',
  'Tarifa provisional para viajeros de trabajo.',
  'Bloque editable pensado para destacar valor comercial y derivar la conversación a WhatsApp.',
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
  'Contenido inicial para estadías cortas.',
  'La fase 1 define estructura, validaciones y persistencia; el detalle comercial fino llega en fase 2.',
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
) values (
  '4c4feb18-c263-4283-8186-b1f920a52fda',
  'Cliente provisional',
  'Tumaco',
  'La base del sitio está lista para que los testimonios se administren desde panel sin hardcodear el contenido final.',
  5,
  true,
  1,
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
