import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ContactBand } from '@/components/site-parts';
import { articles, pageMetadata, site } from '@/lib/site';
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const article = articles.find(item => item.slug === slug); return article ? pageMetadata(article.title, article.excerpt, `/insights/${slug}`) : {}; }
export default async function ArticlePage({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; const article = articles.find(item => item.slug === slug); if (!article)
    notFound(); return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.excerpt, author: { '@type': 'Person', name: site.name, url: `${site.url}/about` }, mainEntityOfPage: `${site.url}/insights/${slug}`, image: `${site.url}/opengraph-image` }) }}/><article className="article-page container"><Link className="back-link" href="/insights"><ArrowLeft size={15}/>All insights</Link><div className="eyebrow">{article.category} / {article.readTime}</div><h1>{article.title}</h1><p className="article-lede">{article.excerpt}</p><div className="article-byline">By Parth Pipaliya <span>Engineering notes</span></div><div className="article-prose">{article.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}</div><div className="article-closing">Working through a similar decision? <Link href="/contact">Let’s talk about your project.</Link></div></article><ContactBand /></>; }
