import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../src/lib/appearance-bootstrap.ts', import.meta.url), 'utf8');
const { appearanceBootstrap } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
function browser({ savedTheme = null, dark = false, paused = false, blocked = false } = {}) {
  const values = { 'portfolio-theme': savedTheme, 'portfolio-motion': paused ? 'paused' : null };
  const dataset = {}; const mediaListeners = []; const handlers = {};
  const context = { document: { documentElement: { dataset } }, localStorage: { getItem(key) { if (blocked) throw new Error('Storage blocked'); return values[key] ?? null; } }, matchMedia: () => ({ matches: dark, addEventListener: (_, fn) => mediaListeners.push(fn) }), addEventListener: (name, fn) => { handlers[name] = fn; } };
  vm.runInNewContext(appearanceBootstrap, context);
  return { dataset, systemTheme(value) { dark = value; for (const fn of mediaListeners) fn(); }, storageTheme(value) { values['portfolio-theme'] = value; handlers.storage({ key: 'portfolio-theme' }); }, storageMotion(value) { values['portfolio-motion'] = value; handlers.storage({ key: 'portfolio-motion' }); } };
}
test('first paint follows the system until a theme is explicitly chosen', () => {
  const page = browser({ dark: true }); assert.equal(page.dataset.theme, 'dark'); assert.equal(page.dataset.themePreference, 'system');
  page.systemTheme(false); assert.equal(page.dataset.theme, 'light');
  const explicit = browser({ savedTheme: 'light', dark: true }); assert.equal(explicit.dataset.theme, 'light'); explicit.systemTheme(true); assert.equal(explicit.dataset.theme, 'light');
});
test('stored choices, cross-tab updates, invalid values and unavailable storage are handled', () => {
  const page = browser({ savedTheme: 'dark', paused: true }); assert.equal(page.dataset.theme, 'dark'); assert.equal(page.dataset.motion, 'paused');
  page.storageTheme('light'); assert.equal(page.dataset.theme, 'light'); page.storageTheme('invalid'); assert.equal(page.dataset.themePreference, 'system');
  page.storageMotion('on'); assert.equal(page.dataset.motion, 'on'); page.storageMotion('paused'); assert.equal(page.dataset.motion, 'paused');
  assert.equal(browser({ blocked: true, dark: true }).dataset.theme, 'dark');
});
function contrast(first, second) {
  function luminance(hex) { const rgb=hex.match(/[a-f0-9]{2}/gi).map(value=>parseInt(value,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4); return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]; }
  const a=luminance(first),b=luminance(second); return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
}
test('primary reading text, muted copy, and accent text meet 4.5:1 in both themes', () => {
  const css=readFileSync(new URL('../src/app/globals.css',import.meta.url),'utf8');
  const light=css.match(/:root\s*\{([\s\S]*?)\}/)[1]; const dark=css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\}/)[1];
  for(const [name,block] of [['light',light],['dark',dark]]) { const tokens=Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[a-f0-9]{6})/gi)].map(([,key,value])=>[key,value])); for(const color of ['ink','text','muted','accent']) assert.ok(contrast(tokens[color],tokens.paper)>=4.5,`${name} ${color} contrast`); assert.ok(contrast(tokens['selection-text'], tokens['selection-bg']) >= 4.5, `${name} selected text contrast`); }
});
