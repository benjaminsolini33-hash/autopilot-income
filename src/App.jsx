import { useState } from 'react';
import { Activity, Bot, CheckCircle2, Copy, Dumbbell, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const starter = '¡Hola! Soy tu asistente de movimiento en casa. Contame cuánto tiempo tenés hoy (5, 10, 15 o 30 minutos) y si preferís movilidad, ejercicios suaves o una rutina general.';

function makeDraft({ platform, format, audience, goal }) {
  const safeAudience = audience.trim() || 'personas ocupadas que quieren moverse en casa';
  if (format === 'Video vertical') return `BORRADOR PARA ${platform.toUpperCase()}\nPúblico: ${safeAudience}\nObjetivo: ${goal}\n\nGANCHO (0–3 s)\n“¿Tenés poco tiempo y querés moverte un poco más?”\n\nGUION (3–25 s)\n“No necesitás una hora libre para empezar. Elegí unos minutos, despejá un espacio y hacé movimientos cómodos a tu ritmo. Podés empezar suave y descansar cuando lo necesites. Lo importante es encontrar una opción realista para tu día.”\n\nTEXTO EN PANTALLA\n“5–10 minutos también cuentan”\n\nCIERRE / CTA\n“Conocé el asistente de movimiento de Autopilot Fit AI: https://autopilot-income.floot.app/entrenador”\n\nCOPY\nUna idea simple para sumar movimiento sin buscar la rutina perfecta. Adaptá todo a tu comodidad y frená si sentís dolor o malestar.\n\nHASHTAGS\n#MovimientoEnCasa #HábitosSaludables #RutinaRealista #Autocuidado\n\nREVISIÓN\nBorrador ilustrativo generado localmente; no es asesoramiento médico ni un archivo de video. Verificá el enlace y revisá el contenido antes de publicarlo.`;
  return `BORRADOR PARA ${platform.toUpperCase()}\nPúblico: ${safeAudience}\nObjetivo: ${goal}\n\n¿Querés sumar movimiento sin complicarte? Autopilot Fit AI propone ideas generales para organizar ratos breves de actividad en casa, a tu ritmo y sin exigirte perfección.\n\nEmpezá con una opción suave, adaptá cada movimiento a tu comodidad y descansá cuando lo necesites. Si tenés una lesión, embarazo, una condición médica o dolor, consultá a un profesional antes de empezar.\n\nCTA: Conocé el prototipo en https://autopilot-income.floot.app/entrenador\n\nNota: borrador ilustrativo generado localmente. No inventa ni verifica ofertas afiliadas. Revisá enlaces, afirmaciones y condiciones antes de publicar.`;
}

export default function App() {
  const [tab, setTab] = useState('fit');
  const [minutes, setMinutes] = useState('10');
  const [level, setLevel] = useState('Principiante');
  const [kind, setKind] = useState('Suave y sin saltos');
  const [fitnessDraft, setFitnessDraft] = useState('');
  const [platform, setPlatform] = useState('Instagram / Reels');
  const [format, setFormat] = useState('Video vertical');
  const [audience, setAudience] = useState('Adultos ocupados en Argentina');
  const [goal, setGoal] = useState('Atraer visitas al asistente gratuito');
  const [marketingDraft, setMarketingDraft] = useState('');
  const [notice, setNotice] = useState('');

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); setNotice('Texto copiado.'); }
    catch { setNotice('No se pudo copiar automáticamente; seleccioná el texto y copialo manualmente.'); }
  }

  function createFitnessPlan() {
    const lowImpact = kind.toLowerCase().includes('salto');
    setFitnessDraft(`PLAN GENERAL DE ${minutes} MINUTOS · ${level.toUpperCase()}\nPreferencia: ${kind}\n\n1. INICIO (2 minutos)\nMarchá suavemente en el lugar y mové hombros y tobillos sin forzar.\n\n2. BLOQUE PRINCIPAL (${Math.max(2, Number(minutes) - 4)} minutos)\n• Marcha cómoda en el lugar.\n• Sentarse y levantarse de una silla firme, solo si resulta cómodo.\n• Flexiones contra la pared.\n• Movilidad suave de hombros y cadera.\nAlterná cada movimiento con pausas. Reducí el rango o descansá cuando lo necesites.${lowImpact ? '\nElegí variantes lentas y de bajo impacto; no hace falta saltar.' : ''}\n\n3. CIERRE (2 minutos)\nBajá el ritmo y respirará con normalidad; mové suavemente brazos y piernas.\n\nSEGURIDAD\nEsto es orientación general, no un plan médico ni una evaluación personalizada. Usá un espacio despejado y movimientos cómodos. Frená ante dolor, mareo o malestar. Si tenés una lesión, embarazo o una condición médica, consultá a un profesional antes de empezar.`);
    setNotice('Plan general preparado en este navegador; no se llamó a un servicio de IA.');
  }

  function createMarketingDraft() {
    setMarketingDraft(makeDraft({ platform, format, audience, goal }));
    setNotice('Borrador local listo para revisión. No se publicó nada.');
  }

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#inicio"><span className="brand-icon"><Bot size={22}/></span><span><strong>Autopilot Fit AI</strong><small>Movimiento realista · marketing responsable</small></span></a><span className="status"><span className="status-dot"/> Prototipo local</span></header>
    <main id="inicio">
      <section className="hero"><div className="eyebrow"><Sparkles size={15}/> TU ASISTENTE PARA DÍAS OCUPADOS</div><h1>Un poco de movimiento.<br/><em>A tu ritmo.</em></h1><p>Prepará ideas generales para moverte en casa y borradores de contenido orgánico. Sin promesas mágicas ni publicaciones automáticas.</p><div className="hero-points"><span><ShieldCheck size={16}/> Seguridad primero</span><span><CheckCircle2 size={16}/> Sin gasto automático</span></div></section>
      <nav className="tabs" aria-label="Herramientas"><button className={tab === 'fit' ? 'active' : ''} onClick={() => { setTab('fit'); setNotice(''); }}><Activity size={17}/> Movimiento</button><button className={tab === 'marketing' ? 'active' : ''} onClick={() => { setTab('marketing'); setNotice(''); }}><FileText size={17}/> Marketing orgánico</button></nav>
      {tab === 'fit' ? <section className="workspace"><div className="section-intro"><div className="section-icon"><Dumbbell size={20}/></div><div><h2>Organizá unos minutos para vos</h2><p>{starter}</p></div></div><div className="form-grid"><label>Tiempo disponible<select value={minutes} onChange={e => setMinutes(e.target.value)}><option value="5">5 minutos</option><option value="10">10 minutos</option><option value="15">15 minutos</option><option value="30">30 minutos</option></select></label><label>Experiencia<select value={level} onChange={e => setLevel(e.target.value)}><option>Principiante</option><option>Intermedio</option><option>Prefiero algo muy suave</option></select></label><label className="wide">Preferencia<select value={kind} onChange={e => setKind(e.target.value)}><option>Suave y sin saltos</option><option>Movilidad general</option><option>Rutina general</option></select></label></div><button className="primary" onClick={createFitnessPlan}><Sparkles size={17}/> Preparar plan general</button>{fitnessDraft && <Draft text={fitnessDraft} onCopy={() => copy(fitnessDraft)}/>}<p className="fineprint">Prototipo informativo: no reemplaza a profesionales de salud ni a entrenadores certificados.</p></section> : <section className="workspace"><div className="section-intro"><div className="section-icon"><FileText size={20}/></div><div><h2>Prepará contenido sin presupuesto</h2><p>Genera una estructura de borrador dentro del navegador. Aún no está conectado a una IA ni a redes sociales.</p></div></div><div className="form-grid"><label>Plataforma<select value={platform} onChange={e => setPlatform(e.target.value)}><option>Instagram / Reels</option><option>TikTok</option><option>YouTube Shorts</option><option>Facebook</option><option>Blog</option></select></label><label>Formato<select value={format} onChange={e => setFormat(e.target.value)}><option>Video vertical</option><option>Publicación</option></select></label><label className="wide">Público objetivo<input value={audience} onChange={e => setAudience(e.target.value)} maxLength={160}/></label><label className="wide">Objetivo<select value={goal} onChange={e => setGoal(e.target.value)}><option>Atraer visitas al asistente gratuito</option><option>Educar sobre hábitos de movimiento</option><option>Crear comunidad</option><option>Presentar un recurso afiliado verificado</option></select></label></div><button className="primary" onClick={createMarketingDraft}><Sparkles size={17}/> Crear borrador</button>{marketingDraft && <Draft text={marketingDraft} onCopy={() => copy(marketingDraft)}/>}<div className="warning"><ShieldCheck size={18}/><p><strong>Antes de publicar:</strong> verificá cualquier HotLink en Hotmart. El enlace afiliado anterior fue reportado como problemático; este prototipo no inventa ni reemplaza enlaces y no publica contenido.</p></div></section>}
      {notice && <p className="notice" role="status">{notice}</p>}
      <section className="migration-note"><strong>Estado técnico</strong><p>Esta es una base inicial independiente para migrar el proyecto. Todavía no conecta la base de datos, las cuentas, el servicio de IA ni las automatizaciones originales de Floot. No se ejecutan tareas en segundo plano.</p><a href="https://autopilot-income.floot.app" target="_blank" rel="noreferrer">Abrir versión actual en Floot ↗</a></section>
    </main><footer>Autopilot Income · Prototipo de migración · Sin garantía de ingresos ni de resultados físicos</footer>
  </div>;
}

function Draft({ text, onCopy }) {
  return <section className="draft"><div className="draft-head"><h3>Borrador para revisar</h3><button className="secondary" onClick={onCopy}><Copy size={15}/> Copiar</button></div><pre>{text}</pre></section>;
}
