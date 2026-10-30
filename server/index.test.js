import test from 'node:test';
import assert from 'node:assert/strict';
import { createApiServer } from './index.js';

async function withServer(options, run) {
  const server = createApiServer(options);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try { await run(`http://127.0.0.1:${port}`); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test('health reports model and key configuration without exposing secrets', async () => {
  await withServer({ apiKey: 'secret-test' }, async base => {
    const response = await fetch(base + '/api/health');
    const data = await response.json();
    assert.equal(data.configured, true);
    assert.equal(data.model, 'gemini-3.8-flash');
    assert.equal(JSON.stringify(data).includes('secret-test'), false);
  });
});

test('generation refuses requests when no key is configured', async () => {
  await withServer({ apiKey: '' }, async base => {
    const response = await fetch(base + '/api/generate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ task: 'fitness', details: '10 minutos' }) });
    assert.equal(response.status, 503);
  });
});

test('valid request calls Gemini server-side and returns generated text', async () => {
  let request;
  await withServer({ apiKey: 'secret-test', fetchImpl: async (url, options) => {
    request = { url, options };
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Borrador generado' }] } }] }), { status: 200 });
  } }, async base => {
    const response = await fetch(base + '/api/generate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ task: 'video_script', details: 'Reel de 20 segundos sobre movilidad' }) });
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.equal(data.text, 'Borrador generado');
    assert.equal(request.options.headers['x-goog-api-key'], 'secret-test');
    assert.equal(request.url.includes('gemini-3.8-flash'), true);
  });
});

test('rejects unknown tasks and oversized details', async () => {
  await withServer({ apiKey: 'secret-test' }, async base => {
    const response = await fetch(base + '/api/generate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ task: 'arbitrary', details: 'hola' }) });
    assert.equal(response.status, 400);
  });
});
