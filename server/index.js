import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const MODEL = 'gemini-3.8-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;
const MAX_BODY = 12_000;

const SYSTEM = `Sos el asistente de Autopilot Fit AI para adultos ocupados de Argentina. Respondé en español rioplatense claro. En fitness, brindá orientación general prudente, opciones de bajo impacto y pausas; nunca diagnostiques, prometas resultados ni reemplaces profesionales. En marketing, no inventes enlaces, testimonios, precios, comisiones ni afirmaciones médicas. Producí borradores revisables, no publiques ni afirmes haber publicado. Para guiones de video, incluí gancho, escenas, texto en pantalla, voz/sonido y CTA sin enlaces inventados.`;

function send(res, status, data) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > MAX_BODY) { reject(new Error('too_large')); req.destroy(); }
    });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); } catch { reject(new Error('invalid_json')); }
    });
    req.on('error', reject);
  });
}

export function createApiServer({ apiKey = process.env.GEMINI_API_KEY, fetchImpl = fetch, now = Date.now } = {}) {
  const buckets = new Map();
  return http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/api/health') {
      return send(res, 200, { ok: true, provider: 'Gemini', model: MODEL, configured: Boolean(apiKey) });
    }
    if (req.method !== 'POST' || req.url !== '/api/generate') return send(res, 404, { error: 'Ruta no encontrada.' });
    if (!apiKey) return send(res, 503, { error: 'La IA todavía no está configurada en el servidor.' });

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const current = now();
    const bucket = (buckets.get(ip) || []).filter(time => current - time < WINDOW_MS);
    if (bucket.length >= MAX_REQUESTS) return send(res, 429, { error: 'Límite temporal alcanzado. Probá de nuevo en un minuto.' });
    bucket.push(current);
    buckets.set(ip, bucket);

    let body;
    try { body = await readBody(req); }
    catch (error) {
      return send(res, error.message === 'too_large' ? 413 : 400, { error: 'La solicitud no es válida o es demasiado grande.' });
    }
    const tasks = new Set(['fitness', 'marketing', 'video_script']);
    const task = typeof body.task === 'string' ? body.task : '';
    const details = typeof body.details === 'string' ? body.details.trim() : '';
    if (!tasks.has(task) || !details || details.length > 5_000) {
      return send(res, 400, { error: 'Indicá una tarea válida y detalles de hasta 5.000 caracteres.' });
    }

    try {
      const upstream = await fetchImpl(API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
        signal: AbortSignal.timeout(30_000),
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents: [{ role: 'user', parts: [{ text: `Tarea: ${task}\nDatos y preferencias: ${details}\nDevolvé un borrador útil y concreto para revisión humana.` }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 1200 }
        })
      });
      if (!upstream.ok) {
        if (upstream.status === 429) return send(res, 429, { error: 'La cuota o el límite de Gemini está temporalmente agotado. No se activó facturación.' });
        if (upstream.status === 401 || upstream.status === 403) return send(res, 502, { error: 'Gemini rechazó la autenticación o el acceso del proyecto. Revisá la clave y el nivel de acceso.' });
        return send(res, 502, { error: 'El proveedor de IA no pudo completar la solicitud.' });
      }
      const payload = await upstream.json();
      const text = payload.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
      if (!text) return send(res, 502, { error: 'Gemini no devolvió contenido utilizable.' });
      return send(res, 200, { text, model: MODEL });
    } catch {
      return send(res, 504, { error: 'La solicitud a Gemini agotó el tiempo o falló la conexión.' });
    }
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const port = Number(process.env.PORT || 8787);
  createApiServer().listen(port, '127.0.0.1', () => {
    console.log(`Autopilot API escuchando en http://127.0.0.1:${port}`);
  });
}
