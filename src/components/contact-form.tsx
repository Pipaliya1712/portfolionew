'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { services, site } from '@/lib/site';
export function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');
    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setStatus('sending');
        setError('');
        try {
            const response = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(data)) });
            const result = await response.json();
            if (!response.ok)
                throw new Error(result.error || 'Your message could not be sent. Please try email instead.');
            setStatus('success');
            form.reset();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to send. Please email directly.');
            setStatus('error');
        }
    }
    if (status === 'success')
        return <div className="form-success" role="status"><CheckCircle2 size={38}/><h2>Thank you for the introduction.</h2><p>Your enquiry has been sent. I’ll review the details and reply to the email address you provided.</p><button className="text-link" onClick={() => setStatus('idle')}>Send another enquiry <ArrowUpRight size={17}/></button></div>;
    return <form className="contact-form" onSubmit={submit}><div className="form-heading"><span className="eyebrow">Project enquiry</span><span>All fields marked * are required</span></div><div className="form-pair"><label>Your name *<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100}/></label><label>Email address *<input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254}/></label></div><label>Company or website <span className="optional">(optional)</span><input name="company" autoComplete="organization" placeholder="A little context about your business" maxLength={200}/></label><label>What can I help with? *<select name="subject" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option key={service.slug}>{service.title}</option>)}<option>Not sure yet — let’s discuss</option></select></label><label>Tell me about your project *<textarea name="message" required minLength={20} maxLength={5000} rows={5} placeholder="What are you trying to achieve? Include any existing systems, timing, or budget considerations."/></label><div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="consent"><input name="consent" type="checkbox" required value="yes"/><span>I agree to be contacted about this enquiry. I have read the <Link href="/privacy">privacy notice</Link>.</span></label><div className="form-error" role="alert">{error && <>{error} <a href={`mailto:${site.email}`}>Email Parth directly.</a></>}</div><button className="button" disabled={status === 'sending'} type="submit">{status === 'sending' ? <>Sending enquiry <LoaderCircle className="spin" size={18}/></> : <>Send project enquiry <ArrowUpRight size={18}/></>}</button><p className="form-footnote">This starts a conversation. There’s no booking or commitment.</p></form>;
}
