import { Fragment, type ReactNode } from 'react';

function safeLink(value: string): string | null {
  const href = value.trim().replace(/^<|>$/g, '');
  if (/[\s\\\u0000-\u001f]/.test(href)) return null;
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  if (/^mailto:[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(href)) return href;
  try {
    const url = new URL(href);
    if (url.protocol === 'https:' && !url.username && !url.password && ['www.linkedin.com', 'linkedin.com', 'github.com', 'parthpipaliya.com', 'www.parthpipaliya.com'].includes(url.hostname)) return href;
  } catch { /* Render untrusted destinations as text. */ }
  return null;
}

function inline(text: string, depth = 0): ReactNode {
  if (depth > 6) return text;
  const tokens = /(`[^`\n]+`|\[[^\]\n]+\]\([^\s)]+\)|\*\*[^\n]+?\*\*|__[^\n]+?__|\*[^*\n]+\*|_[^_\n]+_|[A-Z0-9.!#$%&'+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
  return text.split(tokens).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      const href = safeLink(match[2]);
      return href ? <a key={index} href={href} target={href.startsWith('https:') ? '_blank' : undefined} rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}>{inline(match[1], depth + 1)}</a> : <Fragment key={index}>{inline(match[1], depth + 1)}</Fragment>;
    }
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) return <strong key={index}>{inline(part.slice(2, -2), depth + 1)}</strong>;
    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) return <em key={index}>{inline(part.slice(1, -1), depth + 1)}</em>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(part)) {
      const href = safeLink(`mailto:${part}`);
      if (href) return <a key={index} href={href}>{part}</a>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

// Purposefully limited Markdown, rendered as React elements: no raw HTML or unsafe URLs.
export function MessageText({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim()) { index++; continue; }
    if (/^\s*(?:[-*•]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const pattern = ordered ? /^\s*\d+\.\s+/ : /^\s*[-*•]\s+/;
      const items: ReactNode[] = [];
      while (index < lines.length && pattern.test(lines[index])) { items.push(<li key={index}>{inline(lines[index].replace(pattern, ''))}</li>); index++; }
      blocks.push(ordered ? <ol key={`list-${index}`}>{items}</ol> : <ul key={`list-${index}`}>{items}</ul>);
      continue;
    }
    const heading = line.match(/^#{1,4}\s+(.*)$/);
    if (heading) { blocks.push(<h4 key={index}>{inline(heading[1])}</h4>); index++; continue; }
    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !/^\s*(?:[-*•]|\d+\.)\s+/.test(lines[index]) && !/^#{1,4}\s+/.test(lines[index])) { paragraph.push(lines[index]); index++; }
    blocks.push(<p key={`paragraph-${index}`}>{paragraph.map((value, i) => <Fragment key={i}>{i > 0 && <br />}{inline(value)}</Fragment>)}</p>);
  }
  return <>{blocks}</>;
}
