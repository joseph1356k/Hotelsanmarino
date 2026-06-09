# Home redesign notes

## Photography assumptions

- The homepage prioritizes curated local room demo images for room cards and reservation blocks. Some runtime room photos from Supabase appeared too weak for a conversion-focused homepage, especially when beds or personal items were visible.
- Replace demo images with clean, real Hotel San Marino photography once available: exterior/arrival, pool, clean rooms, breakfast/restaurant, nearby sea/El Morro, sunset, local food, and small hospitality details.
- Supabase remains the production content source for rooms, plans, testimonials, contact info, and WhatsApp data. The redesigned homepage uses fixed narrative copy for the core brand concept so the public experience stays aligned with "El Morro se vive aqui".

## Conversion additions

- WhatsApp CTAs now support event tracking through `dataLayer`, `gtag`, `fbq`, and a browser `hotel:whatsapp-intent` event.
- The guided reservation tool prepares a WhatsApp message with dates, guests, trip type, room preference, package interest, and notes.
- The room comparison tool recommends up to three room options by guests, trip type, and climate preference.
- Local SEO landing pages were added for Tumaco, El Morro, hotel near the sea, pool, and restaurant searches.

## Production content follow-up

- Add real package content in Supabase/admin for Escapada al Morro, Tumaco en Pareja, Pacifico en Familia, and Sabor y Mar if the production database still has older plan names.
- Add real restaurant/menu photos and a current menu-of-the-day workflow if the hotel wants to manage restaurant content daily.
