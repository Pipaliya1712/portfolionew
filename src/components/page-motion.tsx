'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMotionPaused } from '@/lib/appearance';
export function PageMotion() {
  const pathname = usePathname(); const paused = useMotionPaused();
  useEffect(() => {
    if (paused || !('IntersectionObserver' in window)) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.section-heading, .service-row, .project-card, .process-step, .article-card, .page-intro, .service-detail, .about-story, .principles-grid article'));
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.reveal = 'visible'; observer.unobserve(entry.target); } }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    document.documentElement.classList.add('motion-ready');
    elements.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 45}ms`);
      element.dataset.reveal = element.getBoundingClientRect().top < window.innerHeight * .92 ? 'visible' : 'pending';
      observer.observe(element);
    });
    return () => { observer.disconnect(); elements.forEach(element => { delete element.dataset.reveal; element.style.removeProperty('--reveal-delay'); }); document.documentElement.classList.remove('motion-ready'); };
  }, [pathname, paused]);
  return null;
}
