import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { ContactBand, PageIntro } from '@/components/site-parts';
import { pageMetadata, processSteps, services, site } from '@/lib/site';
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const service = services.find(item => item.slug === slug); return service ? pageMetadata(service.title, service.description, `/services/${slug}`) : {}; }
export default async function ServicePage({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;
    const service = services.find(item => item.slug === slug);
    if (!service)
        notFound();
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.description, url: `${site.url}/services/${slug}`, provider: { '@id': `${site.url}/#person` } }) }}/><PageIntro label={`Services / ${service.number}`} title={service.title}><p>{service.description}</p><Link href="/contact" className="button">Discuss your requirements <ArrowUpRight size={18}/></Link></PageIntro><section className="section container two-column border-top"><div><div className="eyebrow">A good fit when</div><h2>{service.short}</h2><p className="body-copy">{service.fit}</p></div><div><span className="small-label">Potential deliverables</span><div className="deliverables spacious">{service.deliverables.map(item => <div key={item}><Check size={18}/><h3>{item}</h3></div>)}</div></div></section><section className="section cream-section"><div className="container two-column"><div><div className="eyebrow">The approach</div><h2>First, make sure we’re<br />solving the right problem.</h2><p className="body-copy">{service.approach}</p></div><div className="process-list">{processSteps.map((step, index) => <div className="process-step" key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></div>)}</div></div></section><section className="container section"><div className="section-heading"><h2>Explore the other services.</h2><Link className="text-link" href="/services">All services <ArrowUpRight size={18}/></Link></div><div className="related-services">{services.filter(item => item.slug !== slug).map(item => <Link href={`/services/${item.slug}`} key={item.slug}><span>{item.number}</span><h3>{item.title}</h3><ArrowUpRight size={20}/></Link>)}</div></section><ContactBand /></>;
}
