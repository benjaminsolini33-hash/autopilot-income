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

const successResponse = () => new Response(
  JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Borrador generado' }] } }] }),
  { status: 200 }
);

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
    const response = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ task: 'fitness', details: '10 minutos' })
    });
    assert.equal(response.status, 503);
  });
});

test('valid request calls Gemini server-side and returns generated text', async () => {
  let request;
  await withServer({
    apiKey: 'secret-test',
    fetchImpl: async (url, options) => {
      request = { url, options };
      return successResponse();
    }
  }, async base => {
    const response = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ task: 'video_script', details: 'Reel de 20 segundos sobre movilidad' })
    });
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.equal(data.text, 'Borrador generado');
    assert.equal(request.options.headers['x-goog-api-key'], 'secret-test');
    assert.equal(request.url.includes('gemini-3.8-flash'), true);
  });
});

test('rejects unknown tasks and oversized details', async () => {
  await withServer({ apiKey: 'secret-test' }, async base => {
    const response = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ task: 'arbitrary', details: 'hola' })
    });
    assert.equal(response.status, 400);
  });
});

test('malformed JSON returns a client error without crashing the server', async () => {
  await withServer({ apiKey: 'secret-test' }, async base => {
    const response = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{'
    });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, 'La solicitud no es válida o es demasiado grande.');
  });
});

test('oversized request body returns 413 and keeps the connection usable', async () => {
  await withServer({ apiKey: 'secret-test' }, async base => {
    const response = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ task: 'fitness', details: 'x'.repeat(12_100) })
    });
    assert.equal(response.status, 413);

    const health = await fetch(base + '/api/health');
    assert.equal(health.status, 200);
  });
});

test('rate limit cannot be bypassed by changing an untrusted X-Forwarded-For header', async () => {
  await withServer({ apiKey: 'secret-test', fetchImpl: async () => successResponse() }, async base => {
    for (let i = 0; i < 8; i++) {
      const response = await fetch(base + '/api/generate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': `198.51.100.${i + 1}`
        },
        body: JSON.stringify({ task: 'fitness', details: '10 minutos' })
      });
      assert.equal(response.status, 200);
    }

    const limited = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '203.0.113.250'
      },
      body: JSON.stringify({ task: 'fitness', details: '10 minutos' })
    });
    assert.equal(limited.status, 429);
  });
});


test('maps Gemini quota exhaustion to a clear 429 response without billing activation', async () => {
  await withServer({
    apiKey: 'secret-test',
    fetchImpl: async () => new Response('{}', { status: 429 })
  }, async base => {
    const response = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ task: 'marketing', details: 'Borrador de publicación' })
    });
    assert.equal(response.status, 429);
    assert.match((await response.json()).error, /No se activó facturación/);
  });
});

test('maps Gemini authentication failures to a safe 502 response', async () => {
  for (const status of [401, 403]) {
    await withServer({
      apiKey: 'secret-test',
      fetchImpl: async () => new Response('{}', { status })
    }, async base => {
      const response = await fetch(base + '/api/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ task: 'fitness', details: '10 minutos' })
      });
      assert.equal(response.status, 502);
      assert.match((await response.json()).error, /Revisá la clave/);
    });
  }
});

test('rejects a successful Gemini response without usable text', async () => {
  await withServer({
    apiKey: 'secret-test',
    fetchImpl: async () => new Response(JSON.stringify({ candidates: [] }), { status: 200 })
  }, async base => {
    const response = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ task: 'video_script', details: 'Guion breve' })
    });
    assert.equal(response.status, 502);
    assert.match((await response.json()).error, /no devolvió contenido utilizable/);
  });
});

test('converts provider network failures into a controlled 504 response', async () => {
  await withServer({
    apiKey: 'secret-test',
    fetchImpl: async () => { throw new Error('simulated upstream network failure'); }
  }, async base => {
    const response = await fetch(base + '/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ task: 'marketing', details: 'Borrador' })
    });
    assert.equal(response.status, 504);
    assert.match((await response.json()).error, /agotó el tiempo o falló la conexión/);
  });
});
