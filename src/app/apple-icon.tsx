import { ImageResponse } from 'next/og';
import { brandPaths } from '@/lib/brand';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export default function AppleIcon() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#183c32', borderRadius: 24 }}><svg width="140" height="140" viewBox="0 0 64 64" fill="none"><path d={brandPaths.first} stroke="#f8f7f3" strokeWidth="4.5" strokeLinejoin="round" /><path d={brandPaths.second} stroke="#dfa17b" strokeWidth="4.5" strokeLinejoin="round" /></svg></div>, size);
}
