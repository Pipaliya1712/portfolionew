import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ContactBand, PageIntro } from '@/components/site-parts';
import { articles, pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Insights on AI, Websites & Software Delivery', 'Practical notes from Parth Pipaliya on planning AI assistants, commissioning business websites, and building maintainable systems integrations.', '/insights');
export default function InsightsPage() { return <><PageIntro label="Insights / Practical notes" title="Think it through. Then build it well."><p>Notes on the decisions behind useful software. Written for people planning a product, improving a workflow, or figuring out where AI fits.</p></PageIntro><section className="container insights-list">{articles.map((article, index) => <Link href={`/insights/${article.slug}`} key={article.slug}><span className="large-number">0{index + 1}</span><div><div className="article-meta"><span>{article.category}</span><span>{article.readTime}</span></div><h2>{article.title}</h2><p>{article.excerpt}</p></div><ArrowUpRight size={28}/></Link>)}</section><ContactBand /></>; }
