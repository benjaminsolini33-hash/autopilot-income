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
