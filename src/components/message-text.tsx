import { Fragment } from 'react';
// A deliberately small renderer: text, emphasis, and safe links; never raw HTML.
export function MessageText({ text }: {
    text: string;
}) {
    function inline(line: string) {
        return line.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, index) => {
            const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (link) {
                const href = link[2];
                const safe = /^\/(?!\/)/.test(href) || /^https:\/\/(www\.linkedin\.com|github\.com|parthpipaliya\.com)(\/|$)/.test(href) || /^mailto:[^\s]+$/.test(href);
                return safe ? <a key={index} href={href} target={href.startsWith('https:') ? '_blank' : undefined} rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}>{link[1]}</a> : <Fragment key={index}>{link[1]}</Fragment>;
            }
            if (part.startsWith('**') && part.endsWith('**'))
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            return <Fragment key={index}>{part}</Fragment>;
        });
    }
    return <>{text.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph.split('\n').map((line, i) => <Fragment key={i}>{i > 0 && <br />}{inline(line.replace(/^[-*]\s+/, '• '))}</Fragment>)}</p>)}</>;
}
