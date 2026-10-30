import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ContactBand, ProjectVisual } from '@/components/site-parts';
import { pageMetadata, projects } from '@/lib/site';
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const project = projects.find(item => item.slug === slug); return project ? pageMetadata(project.title, project.summary, `/work/${slug}`) : {}; }
export default async function ProjectPage({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;
    const project = projects.find(item => item.slug === slug);
    if (!project)
        notFound();
    const next = projects[(projects.indexOf(project) + 1) % projects.length];
    return <><section className="container case-intro"><Link className="back-link" href="/work"><ArrowLeft size={15}/>Selected work</Link><div className="eyebrow">{project.category} / Project overview</div><h1>{project.title}</h1><p>{project.summary}</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></section><div className="container"><ProjectVisual kind={project.visual} large/><p className="image-note">Illustrative interface study. This is not a production screenshot.</p></div><section className="section container case-content"><aside><span className="small-label">Project focus</span><h3>{project.type}</h3><p>Selected engineering work</p><Link className="text-link" href="/contact">Discuss similar work <ArrowUpRight size={16}/></Link></aside><div><article><span className="eyebrow">01 / The context</span><h2>The problem worth solving.</h2><p>{project.context}</p></article><article><span className="eyebrow">02 / The contribution</span><h2>Where the engineering comes in.</h2><p>{project.contribution}</p><p className="muted-note">This overview describes technical contributions, rather than claiming sole delivery or ownership of the wider project.</p></article><article><span className="eyebrow">03 / Design considerations</span><h2>Decisions that matter.</h2><ul className="considerations">{project.decisions.map(item => <li key={item}>{item}</li>)}</ul></article><blockquote>{project.takeaway}</blockquote></div></section><section className="next-project container"><span className="eyebrow">Next project</span><Link href={`/work/${next.slug}`}><h2>{next.title}</h2><ArrowUpRight size={40}/></Link></section><ContactBand /></>;
}
