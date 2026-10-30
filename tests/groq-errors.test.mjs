import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const source = readFileSync(new URL('../src/app/api/chat/response/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function route(fetch, env = {}) {
  const logs = []; const exports = {};
  vm.runInNewContext(compiled, { exports, require: name => {
    if (name === 'next/server') return { NextResponse: { json: (body, options) => Response.json(body, options) } };
    if (name === '@/lib/assistant') return { SYSTEM_PROMPT: 'Test prompt' };
    throw new Error('Unexpected import');
  }, process: { env: { GROQ_API_KEY: 'test-credential-not-real', ...env } }, fetch, Response, AbortSignal, console: { error: (...args) => logs.push(args) } });
  return { post: () => exports.POST(new Request('http://localhost/api/chat/response', { method: 'POST', body: JSON.stringify({ messages: [{ role: 'user', content: 'What services are offered?' }] }) })), logs };
}
test('Groq rejection diagnostics distinguish causes without exposing credentials or raw messages', async () => {
  for (const [status, category] of [[401, 'GROQ_AUTH_FAILED'], [403, 'GROQ_ACCESS_DENIED'], [404, 'GROQ_MODEL_UNAVAILABLE'], [429, 'GROQ_RATE_LIMITED'], [400, 'GROQ_REQUEST_FAILED']]) {
    const app = route(async () => Response.json({ error: { code: 'provider_error', type: 'invalid_request_error', message: 'test-credential-not-real private provider content' } }, { status }));
    const response = await app.post(); const body = await response.json();
    assert.equal(response.status, status === 429 ? 429 : 503); assert.equal(body.code, category);
    assert.equal(app.logs[0][1].status, status);
    assert.ok(!JSON.stringify([body, app.logs]).includes('test-credential-not-real'));
    assert.ok(!JSON.stringify([body, app.logs]).includes('private provider content'));
  }
});
test('connection failures and timeouts have safe diagnostics', async () => {
  const network = route(async () => { throw Object.assign(new Error('private error'), { cause: { code: 'ECONNREFUSED' } }); });
  const response = await network.post(); assert.equal(response.status, 503); assert.equal((await response.json()).code, 'GROQ_CONNECTION_FAILED'); assert.equal(network.logs[0][1].reason, 'ECONNREFUSED');
  const timeout = route(async () => { throw Object.assign(new Error('private error'), { name: 'TimeoutError' }); });
  const timed = await timeout.post(); assert.equal(timed.status, 504); assert.equal((await timed.json()).code, 'GROQ_TIMEOUT');
});

test('the supported default uses GPT-OSS settings and returns only the visitor-facing answer', async () => {
  let payload;
  const app = route(async (_, options) => {
    payload = JSON.parse(options.body);
    return Response.json({ choices: [{ message: { content: 'I can help with AI engineering.', reasoning: 'Private model reasoning' } }] });
  });
  const response = await app.post();
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'I can help with AI engineering.');
  assert.equal(payload.model, 'openai/gpt-oss-120b');
  assert.equal(payload.reasoning_effort, 'low');
  assert.equal(payload.include_reasoning, false);
  assert.equal(payload.max_completion_tokens, 2048);
  assert.ok(!('max_tokens' in payload));
});
test('explicit alternative models retain compatible request parameters', async () => {
  let payload;
  const app = route(async (_, options) => { payload = JSON.parse(options.body); return Response.json({ choices: [{ message: { content: 'A portfolio answer.' } }] }); }, { GROQ_MODEL: 'custom/model' });
  assert.equal((await app.post()).status, 200);
  assert.equal(payload.model, 'custom/model');
  assert.equal(payload.max_tokens, 650);
  assert.ok(!('reasoning_effort' in payload));
});
