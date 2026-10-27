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
