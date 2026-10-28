import { ImageResponse } from 'next/og';
export const alt = 'Parth Pipaliya — AI engineering and software consulting';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
    return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#f8f7f3', padding: '65px 75px', color: '#183c32', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', fontSize: 25, letterSpacing: -1 }}>parth pipaliya<span style={{ color: '#b34f2c' }}>.</span></div><div style={{ display: 'flex', flexDirection: 'column', marginTop: 75, fontSize: 85, letterSpacing: -5, lineHeight: 1.1 }}><span>Good business.</span><span style={{ color: '#b34f2c', fontFamily: 'serif', fontStyle: 'italic' }}>Better software.</span></div><div style={{ display: 'flex', marginTop: 'auto', borderTop: '1px solid #cbd3c0', paddingTop: 25, justifyContent: 'space-between', fontSize: 18, color: '#626d66' }}><span>AI engineering · Web development · Technical consulting</span><span>parthpipaliya.com</span></div></div>, size);
}
