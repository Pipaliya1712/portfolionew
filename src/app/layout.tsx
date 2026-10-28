import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-parts';
import { ChatWidget } from '@/components/chat-widget';
import { site } from '@/lib/site';
import { LegacyAnchorBridge } from '@/components/legacy-anchor-bridge';
import { appearanceBootstrap } from '@/lib/appearance-bootstrap';
import { PageMotion } from '@/components/page-motion';
import './globals.css';
export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: { default: 'Parth Pipaliya | AI Engineering & Software Consulting', template: '%s | Parth Pipaliya' },
    description: 'Independent AI engineering and software consulting. Practical AI applications, web development, and systems integration by Parth Pipaliya in Ahmedabad, India.',
    authors: [{ name: site.name, url: site.url }], creator: site.name,
    robots: { index: true, follow: true },
    openGraph: { type: 'website', locale: 'en_IN', siteName: 'Parth Pipaliya — Technology Consulting', images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
    icons: { icon: '/icon.svg', apple: '/apple-icon' },
};
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const schema = { '@context': 'https://schema.org', '@graph': [
            { '@type': 'Person', '@id': `${site.url}/#person`, name: site.name, url: site.url, image: `${site.url}/profile.png`, jobTitle: 'Independent AI Engineer & Technology Consultant', email: site.email, sameAs: [site.linkedin, site.github], address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', addressCountry: 'IN' }, knowsAbout: ['AI engineering', 'Retrieval-augmented generation', 'Web development', 'Systems integration'] },
            { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: 'Parth Pipaliya — Technology Consulting', publisher: { '@id': `${site.url}/#person` }, inLanguage: 'en' },
        ] };
    return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: appearanceBootstrap }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/></head><body><a className="skip-link" href="#main-content">Skip to content</a><PageMotion /><LegacyAnchorBridge /><SiteHeader /><main id="main-content">{children}</main><SiteFooter /><ChatWidget /></body></html>;
}
