'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
const destinations: Record<string, string> = { '#about': '/about', '#projects': '/work', '#services': '/services', '#skills': '/about', '#contact': '/contact' };
export function LegacyAnchorBridge() {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (pathname !== '/')
            return;
        const redirect = () => { const destination = destinations[window.location.hash]; if (destination)
            router.replace(destination); };
        redirect();
        window.addEventListener('hashchange', redirect);
        return () => window.removeEventListener('hashchange', redirect);
    }, [pathname, router]);
    return null;
}
