import Link from 'next/link';
export default function NotFound() { return <section className="container not-found"><span className="eyebrow">404 / A small detour</span><h1>This page isn’t here.</h1><p>The link may have changed. You can explore the work or head back to the homepage.</p><Link className="button" href="/">Back to the homepage ↗</Link></section>; }
