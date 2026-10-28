'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { ThemeToggle } from './appearance-controls';
const links = [['Services', '/services'], ['Selected work', '/work'], ['About', '/about'], ['Insights', '/insights']];
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); menuRef.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><div className="container header-inner">
    <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Parth Pipaliya home"><BrandMark /><span>parth pipaliya<span className="brand-sub">Independent technology consultant</span></span></Link>
    <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation" onClick={() => setOpen(false)}>
      {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{label}</Link>)}
      <Link href="/contact" className="nav-contact" aria-current={pathname === '/contact' ? 'page' : undefined}>Let’s talk <ArrowUpRight size={16} /></Link>
    </nav>
    <div className="header-controls"><ThemeToggle /><button ref={menuRef} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
  </div></header>;
}
