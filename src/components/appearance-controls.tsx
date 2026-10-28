'use client';
import { Monitor, Moon, Sun, Pause, Play } from 'lucide-react';
import { setThemePreference, setMotionPaused, useThemePreference, useMotionPaused, useReducedMotion } from '@/lib/appearance';
export function ThemeToggle() {
  const theme = useThemePreference();
  const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
  const Icon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon;
  return <button className="theme-toggle" onClick={() => setThemePreference(next)} aria-label={`Theme: ${theme}. Switch to ${next} theme`} title={`Theme: ${theme} · switch to ${next}`}><Icon size={16} /><span>{theme === 'system' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}</span></button>;
}
export function MotionToggle() {
  const paused = useMotionPaused();
  const reduced = useReducedMotion();
  return <button className="motion-toggle" disabled={reduced} onClick={() => setMotionPaused(!paused)} aria-pressed={paused} aria-label={reduced ? 'Motion disabled by your device preference' : paused ? 'Enable decorative motion' : 'Pause decorative motion'} title="Motion follows your device’s reduced-motion preference">{paused ? <Play size={11} /> : <Pause size={11} />}<span>{paused ? 'Motion paused' : 'Pause motion'}</span></button>;
}
