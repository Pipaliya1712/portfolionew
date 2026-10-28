import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Braces, Database, Layers3, ScanLine } from 'lucide-react';
import { projects, services, site } from '@/lib/site';
import { BrandMark } from './brand-mark';
export function ArrowLink({ href, children, className = '' }: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    return <Link href={href} className={`text-link ${className}`}>{children}<ArrowUpRight size={18}/></Link>;
}
export function PageIntro({ label, title, children }: {
    label: string;
    title: string;
    children: React.ReactNode;
}) {
    return <section className="page-intro container"><div className="eyebrow"><span />{label}</div><h1>{title}</h1><div className="intro-copy">{children}</div></section>;
}
export function ContactBand() {
    return <section className="contact-band"><div className="container contact-band-inner"><div><div className="eyebrow light">A good project starts with a conversation</div><h2>What are you<br />working on?</h2></div><div><p>A new idea, a difficult workflow, or a system that needs a fresh perspective. Let’s find the right next step.</p><Link className="button button-cream" href="/contact">Tell me about your project <ArrowUpRight size={18}/></Link></div><span className="band-asterisk" aria-hidden="true">✳</span></div></section>;
}
export function SiteFooter() {
    return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Link href="/" className="footer-name"><BrandMark />parth pipaliya<span>.</span></Link><p>Thoughtful software.<br />A direct working relationship.</p></div><div><span className="footer-label">Explore</span><Link href="/services">Services</Link><Link href="/work">Selected work</Link><Link href="/about">About</Link><Link href="/insights">Insights</Link></div><div><span className="footer-label">Get in touch</span><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13}/></a><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13}/></a><span className="location">Ahmedabad, India · Working remotely</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Parth Pipaliya</span><span>Built with care, from the first conversation to the last detail.</span><Link href="/privacy">Privacy</Link></div></div></footer>;
}
export function ServiceList({ compact = false }: {
    compact?: boolean;
}) {
    const icons = [<ScanLine key="ai"/>, <Braces key="web"/>, <Database key="systems"/>, <Layers3 key="consulting"/>];
    return <div className="service-list">{services.map((service, index) => <Link href={`/services/${service.slug}`} className="service-row" key={service.slug}><span className="row-number">{service.number}</span><div className="service-row-title">{icons[index]}<h3>{service.title}</h3></div><p>{compact ? service.short : service.description}</p><ArrowUpRight className="row-arrow" size={24}/></Link>)}</div>;
}
export function ProjectVisual({ kind, large = false }: {
    kind: string;
    large?: boolean;
}) {
    return <div className={`project-visual visual-${kind} ${large ? 'visual-large' : ''}`} aria-label="Illustrative project interface" role="img">
    <div className="visual-grid"/>
    {kind === 'knowledge' ? <div className="demo-window knowledge-window"><div className="demo-top"><span className="mini-brand">m<span>g</span></span><span>Knowledge workspace</span><span className="demo-dots">•••</span></div><div className="demo-body"><div className="demo-sidebar"><span className="demo-active">Knowledge library</span><span>Conversations</span><span>Settings</span><div className="tiny-line"/><span>Product handbook</span><span>Support articles</span><span>Company policies</span></div><div className="demo-chat"><span className="demo-kicker">YOUR KNOWLEDGE, CONNECTED</span><h4>A better way to<br />find your answers.</h4><div className="demo-query">How does the onboarding process work? <ArrowUpRight size={13}/></div><div className="demo-answer"><span className="answer-dot"/><div><b>Here’s a place to start.</b><div className="skeleton"/><div className="skeleton short"/><span className="source-tag">↗ Onboarding guide</span></div></div></div></div></div>
            : kind === 'analytics' ? <div className="demo-window analytics-window"><div className="demo-top"><span className="chart-logo">▥</span><span>Business overview</span><span className="demo-dots">•••</span></div><div className="analytics-body"><div className="analytics-heading"><div><span className="demo-kicker">NATURAL-LANGUAGE ANALYTICS</span><h4>From question to clarity.</h4></div><span className="demo-badge">Overview ↗</span></div><div className="chart-question">Show the revenue trend by quarter <ArrowRight size={13}/></div><div className="chart-area"><div className="chart-labels"><span>Revenue</span><span>Illustrative data</span></div><div className="bars">{[36, 50, 44, 67, 57, 76, 69, 91].map((height, index) => <div key={index} style={{ height: `${height}%` }}><i /></div>)}</div><div className="chart-axis"><span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span></div></div></div></div>
                : kind === 'code' ? <div className="demo-window code-window"><div className="demo-top"><Braces size={15}/><span>Repository assistant</span><span className="demo-dots">•••</span></div><div className="code-body"><span className="demo-kicker">CONTEXT BEFORE COMPLETION</span><h4>Find the code.<br />Understand the context.</h4><div className="code-snippet"><span>01 <i>async function</i> retrieveContext(query) {'{'}</span><span>02 &nbsp; <i>const</i> matches = <i>await</i> search(query);</span><span>03 &nbsp; <i>return</i> matches.map(toSource);</span><span>04 {'}'}</span></div><span className="source-tag">3 relevant sources retrieved</span></div></div>
                    : <div className="document-stack"><div className="document-sheet"><span className="demo-kicker">DOCUMENT INTELLIGENCE</span><h4>From a document<br />to a clear overview.</h4><div className="document-rule"/><span className="skeleton"/><span className="skeleton short"/><div className="document-fields"><span>Experience <b>Extracted</b></span><span>Education <b>Extracted</b></span><span>Skills <b>Ready for review</b></span></div></div></div>}
    <span className="visual-caption">Interface study / illustrative</span>
  </div>;
}
export function ProjectCard({ project, index }: {
    project: typeof projects[number];
    index: number;
}) {
    return <article className="project-card"><Link href={`/work/${project.slug}`} className="project-image-link" aria-label={`Explore ${project.title}`}><ProjectVisual kind={project.visual}/></Link><div className="project-meta"><span>{String(index + 1).padStart(2, '0')} / {project.category}</span><span>{project.type}</span></div><Link className="project-title-link" href={`/work/${project.slug}`}><h3>{project.title}</h3><ArrowUpRight size={24}/></Link><p>{project.summary}</p></article>;
}
