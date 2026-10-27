import test from 'node:test';
import assert from 'node:assert/strict';
import { createFitnessPlan, makeDraft } from './agentLogic.js';

test('fitness plan includes selected duration and safety guidance', () => {
  const plan = createFitnessPlan({ minutes: 15, level: 'Principiante', kind: 'Suave y sin saltos' });
  assert.match(plan, /PLAN GENERAL DE 15 MINUTOS/);
  assert.match(plan, /no hace falta saltar/);
  assert.match(plan, /Frená ante dolor, mareo o malestar/);
});

test('fitness plan rejects unsupported durations and falls back to 10 minutes', () => {
  assert.match(createFitnessPlan({ minutes: 999 }), /PLAN GENERAL DE 10 MINUTOS/);
});

test('video marketing draft includes hook, script, CTA and human review warning', () => {
  const draft = makeDraft({ platform: 'TikTok', format: 'Video vertical', audience: 'Adultos ocupados', goal: 'Atraer visitas' });
  assert.match(draft, /BORRADOR PARA TIKTOK/);
  assert.match(draft, /GANCHO/);
  assert.match(draft, /GUION/);
  assert.match(draft, /autopilot-income\.floot\.app\/entrenador/);
  assert.match(draft, /revisá el contenido antes de publicarlo/);
});

test('non-video marketing draft does not invent an affiliate link', () => {
  const draft = makeDraft({ platform: 'Facebook', format: 'Publicación', audience: '', goal: 'Crear confianza' });
  assert.match(draft, /personas ocupadas que quieren moverse en casa/);
  assert.match(draft, /No inventa ni verifica ofertas afiliadas/);
  assert.doesNotMatch(draft, /go\.hotmart\.com/);
});

test('fitness plan bounds user-provided labels and handles empty values', () => {
  const plan = createFitnessPlan({ level: 'L'.repeat(200), kind: '' });
  assert.ok(plan.includes('L'.repeat(60).toUpperCase()));
  assert.ok(!plan.includes('L'.repeat(61)));
  assert.match(plan, /Preferencia: Suave y sin saltos/);
});

test('marketing draft bounds audience, platform and goal input lengths', () => {
  const draft = makeDraft({
    platform: 'P'.repeat(200),
    format: 'Publicación',
    audience: 'A'.repeat(500),
    goal: 'G'.repeat(200)
  });
  assert.ok(draft.includes('P'.repeat(80).toUpperCase()));
  assert.ok(draft.includes('A'.repeat(240)));
  assert.ok(!draft.includes('A'.repeat(241)));
  assert.ok(draft.includes('G'.repeat(100)));
  assert.ok(!draft.includes('G'.repeat(101)));
});

test('unknown marketing format uses the safe generic draft, not video claims', () => {
  const draft = makeDraft({ format: 'formato desconocido' });
  assert.match(draft, /borrador ilustrativo generado localmente/i);
  assert.doesNotMatch(draft, /GANCHO \(0–3 s\)/);
  assert.doesNotMatch(draft, /go\.hotmart\.com/);
});

test('five-minute fitness plan allocates exactly five minutes', () => {
  const plan = createFitnessPlan({ minutes: 5 });
  assert.match(plan, /INICIO \(1 minuto\)/);
  assert.match(plan, /BLOQUE PRINCIPAL \(3 minutos\)/);
  assert.match(plan, /CIERRE \(1 minuto\)/);
});

test('supported fitness durations have matching section totals', () => {
  for (const minutes of [5, 10, 15, 30]) {
    const plan = createFitnessPlan({ minutes });
    const sectionMinutes = [...plan.matchAll(/\((\d+) minutos?\)/g)]
      .map(match => Number(match[1]))
      .slice(0, 3)
      .reduce((sum, value) => sum + value, 0);
    assert.equal(sectionMinutes, minutes, `duration ${minutes} should sum correctly`);
  }
});

test('weekly marketing plan includes seven daily ideas and responsible review checklist', () => {
  const draft = makeDraft({ platform: 'Instagram / Reels', format: 'Plan semanal', audience: 'Adultos ocupados', goal: 'Crear comunidad' });
  for (const day of ['DÍA 1', 'DÍA 2', 'DÍA 3', 'DÍA 4', 'DÍA 5', 'DÍA 6', 'DÍA 7']) {
    assert.ok(draft.includes(day), `weekly plan should include ${day}`);
  }
  assert.match(draft, /CHECKLIST ANTES DE PUBLICAR/);
  assert.match(draft, /declarar la relación comercial/);
  assert.match(draft, /no publicaciones automáticas/i);
  assert.doesNotMatch(draft, /go\.hotmart\.com/);
});
