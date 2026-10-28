import { brandPaths } from '@/lib/brand';
export function BrandMark({ className = '' }: { className?: string }) {
  return <svg className={`brand-symbol ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d={brandPaths.first} stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" /><path d={brandPaths.second} className="brand-accent" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" /><path d="M10 57h44" stroke="currentColor" strokeWidth="1" opacity=".3" /></svg>;
}
