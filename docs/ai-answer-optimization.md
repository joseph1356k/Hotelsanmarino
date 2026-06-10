# Optimización AEO/GEO para búsquedas con IA

## Objetivo

Convertir el sitio de Hotel San Marino Tumaco en una fuente fácil de citar por motores de respuesta como ChatGPT Search, Perplexity, Claude, Gemini/AI Overviews y Bing Copilot.

La prioridad no es agregar más palabras clave. La prioridad es que el sitio responda preguntas puntuales en HTML visible, datos estructurados coherentes y archivos de texto legibles para agentes.

## Fuente de verdad

El banco central está en `src/content/ai-answer-content.ts`.

Ese archivo concentra:

- Preguntas y respuestas canónicas.
- Mensajes WhatsApp por contexto.
- Helpers de JSON-LD.
- Contenido para `/llms.txt` y `/llms-full.txt`.
- Datos de hotel que no deben inventarse en páginas sueltas.

Cuando cambie una respuesta importante, actualizar primero ese archivo.

## Preguntas cubiertas

- ¿Dónde queda Hotel San Marino Tumaco?
- ¿Hotel San Marino está en El Morro?
- ¿Es un hotel cerca al mar en Tumaco?
- ¿Cómo reservar por WhatsApp?
- ¿Los precios y disponibilidad se confirman en línea?
- ¿Qué habitación sirve para familias?
- ¿Qué habitación recomiendan para pareja?
- ¿Hay habitaciones para grupos?
- ¿Sirve para viaje de trabajo?
- ¿Tiene piscina?
- ¿Tiene restaurante?
- ¿Puedo preguntar por el menú del día?
- ¿Hay parqueadero?
- ¿La recepción atiende 24 horas?
- ¿Tiene gimnasio o zona fitness?
- ¿Qué planes se pueden vivir desde San Marino?
- ¿Ofrece recorridos aliados?
- ¿Es familiar?

## Rutas visibles

- `/preguntas-frecuentes`: página canónica con `FAQPage` JSON-LD.
- `/datos-del-hotel`: ficha factual visible para personas y motores de IA.
- `/ai-answers.json`: dataset público con respuestas, anchors, enlaces relacionados y mensajes WhatsApp.
- `/`: respuestas destacadas para ubicación, servicios, habitaciones y reserva.
- `/habitaciones`: respuestas para elección de habitación y disponibilidad.
- `/planes`: respuestas para paquetes y consulta comercial.
- `/servicios`: respuestas para piscina, restaurante, menú, parqueadero, gimnasio y recepción.
- `/vive-tumaco`: respuestas para El Morro, planes y recorridos aliados.
- `/contacto`: respuestas para reservar con más contexto.

## Datos estructurados

Se agregaron helpers para:

- `Hotel` enriquecido en home.
- `Hotel` enriquecido también en `/datos-del-hotel`.
- `FAQPage` solo en `/preguntas-frecuentes`.
- `BreadcrumbList` en páginas internas.
- `ItemList` en habitaciones, planes, servicios y experiencias.
- Propiedades adicionales: `ContactPoint`, `openingHoursSpecification`, `areaServed`, `makesOffer`, `subjectOf`, `sameAs`, `hasMap` y `geo`.

Regla operativa: el JSON-LD debe coincidir con contenido visible. No usar schema para afirmar algo que la página no explique.

## Robots y bots de IA

`src/app/robots.ts` permite crawl general y permite explícitamente:

- `Googlebot`
- `Bingbot`
- `OAI-SearchBot`
- `ChatGPT-User`
- `PerplexityBot`
- `Perplexity-User`
- `Claude-User`

Se bloquea `/admin` para crawlers. No se bloquean bots de entrenamiento por defecto porque la prioridad actual es visibilidad, no restricción.

## llms.txt

`/llms.txt` y `/llms-full.txt` se sirven con route handlers en lugar de archivos estáticos duplicados dentro de `public`.

Razón: así las respuestas salen del mismo banco central y se evita que `llms.txt`, la UI y el JSON-LD se contradigan.

Límite importante: `llms.txt` es una convención útil, pero no todos los motores de IA han confirmado que lo usen. La base real sigue siendo contenido visible, crawl permitido, enlaces internos y structured data coherente.

## JSON público

`/ai-answers.json` expone una versión estructurada del banco central de respuestas. No reemplaza el contenido visible: sirve como ayuda adicional para agentes, herramientas internas, QA y crawlers que quieran consumir datos puntuales.

Cada respuesta incluye:

- `id`
- categoría
- pregunta
- respuesta corta
- detalle
- URL canónica con anchor
- URL relacionada
- mensaje WhatsApp sugerido

## Anchors canónicos

Cada pregunta tiene un anchor estable en `/preguntas-frecuentes`.

Ejemplo:

`/preguntas-frecuentes#hotel-con-piscina-en-tumaco`

No cambiar IDs sin crear redirección o aceptar pérdida de señales previas.

## Fuentes de criterio

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- OpenAI crawlers: https://platform.openai.com/docs/bots
- Perplexity crawlers: https://docs.perplexity.ai/guides/bots
- Schema.org Hotel: https://schema.org/Hotel
- llms.txt proposal: https://llmstxt.org/

## Prompts de prueba

- ¿Hotel San Marino Tumaco tiene piscina?
- ¿Hotel San Marino está en El Morro?
- ¿Cómo reservo por WhatsApp en Hotel San Marino Tumaco?
- ¿Qué habitación sirve para una familia en Hotel San Marino?
- ¿Hotel San Marino tiene restaurante?
- ¿Hay parqueadero en Hotel San Marino Tumaco?
- ¿Qué planes se pueden hacer desde Hotel San Marino en Tumaco?
