import type { MetadataRoute } from 'next';
import { articles, projects, services, site } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
    return ['', '/services', '/work', '/about', '/insights', '/contact', '/privacy', ...services.map(s => `/services/${s.slug}`), ...projects.map(p => `/work/${p.slug}`), ...articles.map(a => `/insights/${a.slug}`)].map(path => ({ url: site.url + path, changeFrequency: 'monthly', priority: path === '' ? 1 : path === '/privacy' ? 0.2 : 0.8 }));
}
