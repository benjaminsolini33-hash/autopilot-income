export function createFitnessPlan({ minutes = 10, level = 'Principiante', kind = 'Suave y sin saltos' } = {}) {
  const allowedMinutes = [5, 10, 15, 30];
  const duration = allowedMinutes.includes(Number(minutes)) ? Number(minutes) : 10;
  const warmup = duration === 5 ? 1 : 2;
  const cooldown = duration === 5 ? 1 : 2;
  const main = duration - warmup - cooldown;
  const safeLevel = String(level || 'Principiante').slice(0, 60);
  const safeKind = String(kind || 'Suave y sin saltos').slice(0, 80);
  const lowImpact = safeKind.toLowerCase().includes('salto');
  return `PLAN GENERAL DE ${duration} MINUTOS · ${safeLevel.toUpperCase()}
Preferencia: ${safeKind}

1. INICIO (${warmup} ${warmup === 1 ? 'minuto' : 'minutos'})
Marchá suavemente en el lugar y mové hombros y tobillos sin forzar.

2. BLOQUE PRINCIPAL (${main} ${main === 1 ? 'minuto' : 'minutos'})
• Marcha cómoda en el lugar.
• Sentarse y levantarse de una silla firme, solo si resulta cómodo.
• Flexiones contra la pared.
• Movilidad suave de hombros y cadera.
Alterná cada movimiento con pausas. Reducí el rango o descansá cuando lo necesites.${lowImpact ? '\nElegí variantes lentas y de bajo impacto; no hace falta saltar.' : ''}

3. CIERRE (${cooldown} ${cooldown === 1 ? 'minuto' : 'minutos'})
Bajá el ritmo y respirá con normalidad; mové suavemente brazos y piernas.

SEGURIDAD
Esto es orientación general, no un plan médico ni una evaluación personalizada. Usá un espacio despejado y movimientos cómodos. Frená ante dolor, mareo o malestar. Si tenés una lesión, embarazo o una condición médica, consultá a un profesional antes de empezar.`;
}

export function makeDraft({ platform = 'General', format = 'Video vertical', audience = '', goal = 'Crear confianza' } = {}) {
  const safeAudience = String(audience).trim().slice(0, 240) || 'personas ocupadas que quieren moverse en casa';
  const safePlatform = String(platform).slice(0, 80);
  const safeGoal = String(goal).slice(0, 100);
  const cta = 'https://autopilot-income.floot.app/entrenador';
  if (format === 'Plan semanal') return `PLAN SEMANAL DE CONTENIDO · ${safePlatform.toUpperCase()}
Público: ${safeAudience}
Objetivo: ${safeGoal}

DÍA 1 · IDENTIFICACIÓN
Gancho: “¿Sentís que no te alcanza el día?”
Idea: normalizar empezar con pocos minutos.
Formato: video breve con texto en pantalla.
CTA: probá organizar un momento para vos.

DÍA 2 · CONSEJO PRÁCTICO
Gancho: “Una pausa activa que podés hacer en casa”
Idea: mostrar marcha suave en el lugar y movilidad cómoda de hombros.
Nota: ofrecer una alternativa sentada.

DÍA 3 · MITO Y REALIDAD
Gancho: “No hace falta hacerlo perfecto para empezar”
Idea: explicar que la constancia realista importa más que una rutina ideal.
Evitar promesas sobre pérdida de peso o resultados garantizados.

DÍA 4 · PARTICIPACIÓN
Pregunta: “¿Qué te cuesta más: encontrar tiempo o empezar?”
Objetivo: invitar a comentar sin pedir datos personales.

DÍA 5 · MINI RUTINA
Idea: secuencia general de movilidad suave con opciones de pausa.
Seguridad: adaptar movimientos y frenar ante dolor, mareo o malestar.

DÍA 6 · DETRÁS DE ESCENA
Idea: mostrar cómo se prepara una rutina sencilla y realista.
CTA: guardar la publicación para revisarla más tarde.

DÍA 7 · RESUMEN Y RECURSO
Idea: resumir tres ideas útiles de la semana.
CTA: conocer el asistente gratuito: ${cta}

CHECKLIST ANTES DE PUBLICAR
- Revisar exactitud, accesibilidad y lenguaje inclusivo.
- Añadir subtítulos y texto alternativo cuando corresponda.
- Verificar enlaces y cualquier oferta afiliada; declarar la relación comercial.
- Confirmar que no haya promesas médicas, resultados garantizados ni material con derechos ajenos.

Nota: calendario de ideas generado localmente, no publicaciones automáticas ni garantía de alcance o ingresos.`;
  if (format === 'Prompt para video IA') return `PROMPT PARA VIDEO VERTICAL 9:16\n\nCrear un video de 20–25 segundos para ${safeAudience}, en una casa argentina luminosa, con tono cálido y realista. Mostrar a una persona adulta con ropa cómoda haciendo movimientos suaves en un espacio despejado, sin equipamiento ni saltos. Usar planos breves, cámara estable y luz natural.\n\nSECUENCIA\n0–3 s: gancho visual de una persona que encuentra un pequeño momento libre.\n3–10 s: marcha suave en el lugar y movilidad de hombros.\n10–17 s: variante sentada o flexiones contra la pared.\n17–22 s: pausa y respiración normal.\n22–25 s: cierre con espacio para texto y CTA.\n\nTEXTO EN PANTALLA\n“¿Poco tiempo? Empezá suave”.\n“Adaptá los movimientos a tu comodidad”.\n“Conocé Autopilot Fit AI: ${cta}”\n\nAUDIO: música instrumental genérica, sin canciones protegidas. Añadir subtítulos legibles en español rioplatense. No mostrar antes/después, promesas médicas, pérdida de peso garantizada, marcas ni logotipos ajenos.\n\nObjetivo: ${safeGoal}. Revisar el video generado, los derechos de audio y el enlace antes de publicar. Esto es un prompt; no genera el archivo de video por sí solo.`;
  if (format === 'Video vertical') return `BORRADOR PARA ${safePlatform.toUpperCase()}
Público: ${safeAudience}
Objetivo: ${safeGoal}

GANCHO (0–3 s)
“¿Tenés poco tiempo y querés moverte un poco más?”

GUION (3–25 s)
“No necesitás una hora libre para empezar. Elegí unos minutos, despejá un espacio y hacé movimientos cómodos a tu ritmo. Podés empezar suave y descansar cuando lo necesites. Lo importante es encontrar una opción realista para tu día.”

TEXTO EN PANTALLA
“5–10 minutos también cuentan”

CIERRE / CTA
“Conocé el asistente de movimiento de Autopilot Fit AI: ${cta}”

COPY
Una idea simple para sumar movimiento sin buscar la rutina perfecta. Adaptá todo a tu comodidad y frená si sentís dolor o malestar.

HASHTAGS
#MovimientoEnCasa #HábitosSaludables #RutinaRealista #Autocuidado

REVISIÓN
Borrador ilustrativo generado localmente; no es asesoramiento médico ni un archivo de video. Verificá el enlace y revisá el contenido antes de publicarlo.`;
  return `BORRADOR PARA ${safePlatform.toUpperCase()}
Público: ${safeAudience}
Objetivo: ${safeGoal}

¿Querés sumar movimiento sin complicarte? Autopilot Fit AI propone ideas generales para organizar ratos breves de actividad en casa, a tu ritmo y sin exigirte perfección.

Empezá con una opción suave, adaptá cada movimiento a tu comodidad y descansá cuando lo necesites. Si tenés una lesión, embarazo, una condición médica o dolor, consultá a un profesional antes de empezar.

CTA: Conocé el prototipo en ${cta}

Nota: borrador ilustrativo generado localmente. No inventa ni verifica ofertas afiliadas. Revisá enlaces, afirmaciones y condiciones antes de publicar.`;
}
