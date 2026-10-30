import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = fileURLToPath(new URL('../', import.meta.url));
const cache = new Map();
function load(relative) {
  const file = path.resolve(root, relative);
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const source = readFileSync(file, 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(compiled, { exports, URL, console, require: name => {
    if (name === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) };
    if (name.startsWith('@/') || name.startsWith('.')) {
      const base = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(file), name);
      const resolved = ['.ts', '.tsx'].map(extension => base + extension).find(existsSync);
      if (!resolved) throw new Error(`Cannot resolve ${name}`);
      return load(path.relative(root, resolved));
    }
    return require(name);
  } }, { filename: file });
  return exports;
}
const { MessageText } = load('src/components/message-text.tsx');
const renderMessage = text => renderToStaticMarkup(React.createElement(MessageText, { text }));
test('contact links remain clickable inside nested bold or italic formatting', () => {
  for (const text of ['[contact form](/contact)', '**[contact form](/contact)**', '[**contact form**](/contact)', '*[contact form](/contact)*']) {
    const html = renderMessage(text); assert.match(html, /<a href="\/contact"/); assert.ok(!html.includes('](/contact)'));
  }
  assert.match(renderMessage('Email (parthpipaliya1712@gmail.com).'), /href="mailto:parthpipaliya1712@gmail.com"/);
});
test('chat responses render real lists, headings and emphasis, without executing HTML or unsafe links', () => {
  const html = renderMessage('### A useful starting point\n\n- **AI engineering**\n- Web development\n\n1. Define the scope\n2. Discuss the work\n\n*What are you building?*');
  assert.match(html, /<h4>/); assert.match(html, /<ul>/); assert.match(html, /<ol>/); assert.match(html, /<strong>AI engineering/); assert.match(html, /<em>What are you building/);
  for (const href of ['javascript:alert(1)', '//evil.example', '/\\evil.example', 'https://github.com.evil.example/path', 'https://github.com@evil.example/path']) assert.ok(!renderMessage(`[Open](${href})`).includes('<a '), href);
  assert.ok(!renderMessage('<script>alert(1)</script>').includes('<script>'));
  assert.doesNotThrow(() => renderMessage('# \n\n**[Contact](/contact)**'));
  assert.match(renderMessage('[GitHub](https://github.com/Pipaliya1712)'), /rel="noopener noreferrer"/);
});
const { validateContact } = load('src/lib/contact-validation.ts');
const valid = { name: 'Alex Morgan', email: 'alex@example.com', company: '', subject: 'AI engineering', message: 'We would like to discuss a document search application.', consent: 'yes' };
test('shared enquiry validation gives field-specific errors and accepts a valid brief', () => {
  assert.equal(Object.keys(validateContact(valid)).length, 0);
  assert.equal(Object.keys(validateContact({ ...valid, email: ' alex@example.com ' })).length, 0);
  const missing = validateContact({}); for (const field of ['name', 'email', 'subject', 'message', 'consent']) assert.equal(typeof missing[field], 'string');
  assert.ok(validateContact({ ...valid, email: 'bad-email' }).email);
  assert.ok(validateContact({ ...valid, message: 'too short' }).message);
  assert.ok(validateContact({ ...valid, message: 'a'.repeat(5001) }).message);
  assert.ok(validateContact({ ...valid, subject: 'Enquiry\r\nBcc: bad@example.com' }).subject);
  assert.ok(validateContact({ ...valid, name: 123 }).name);
  assert.ok(validateContact({ ...valid, company: {} }).company);
  assert.ok(validateContact({ ...valid, consent: '' }).consent);
});
test('contact markup uses custom validation, an accessible themed selector, and associated field hints', () => {
  const { ContactForm } = load('src/components/contact-form.tsx');
  const html = renderToStaticMarkup(React.createElement(ContactForm));
  assert.match(html, /noValidate=""/i); assert.match(html, /role="combobox"/); assert.match(html, /aria-haspopup="listbox"/); assert.match(html, /aria-expanded="false"/);
  assert.ok(!html.includes('<select'));
  assert.match(html, /type="hidden" name="subject"/); assert.match(html, /for="contact-name"/);
  assert.match(html, /aria-describedby="contact-message-hint"/); assert.match(html, /id="contact-message-hint"/);
});
