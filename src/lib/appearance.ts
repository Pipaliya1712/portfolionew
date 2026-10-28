'use client';
import { useSyncExternalStore } from 'react';
const eventName = 'portfolio-appearance';
export type Theme = 'system' | 'light' | 'dark';
function read(key: string) { try { return localStorage.getItem(key); } catch { return null; } }
function subscribe(callback: () => void) {
  const theme = window.matchMedia('(prefers-color-scheme: dark)');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  window.addEventListener('storage', callback); window.addEventListener(eventName, callback);
  theme.addEventListener('change', callback); motion.addEventListener('change', callback);
  return () => { window.removeEventListener('storage', callback); window.removeEventListener(eventName, callback); theme.removeEventListener('change', callback); motion.removeEventListener('change', callback); };
}
function themeSnapshot(): Theme { const value = read('portfolio-theme') || document.documentElement.dataset.themePreference; return value === 'light' || value === 'dark' ? value : 'system'; }
function motionSnapshot() { return (read('portfolio-motion') || document.documentElement.dataset.motion) === 'paused' || window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
export function useThemePreference() { return useSyncExternalStore(subscribe, themeSnapshot, () => 'system' as Theme); }
export function useMotionPaused() { return useSyncExternalStore(subscribe, motionSnapshot, () => false); }
export function setThemePreference(theme: Theme) {
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* The choice still applies for this page. */ }
  document.documentElement.dataset.theme = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
  document.documentElement.dataset.themePreference = theme;
  window.dispatchEvent(new Event(eventName));
}
export function setMotionPaused(paused: boolean) {
  try { localStorage.setItem('portfolio-motion', paused ? 'paused' : 'on'); } catch { /* Browser storage may be unavailable. */ }
  document.documentElement.dataset.motion = paused ? 'paused' : 'on';
  window.dispatchEvent(new Event(eventName));
}

export function useReducedMotion() { return useSyncExternalStore(subscribe, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false); }
