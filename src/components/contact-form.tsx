'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, CircleAlert } from 'lucide-react';
import { services, site } from '@/lib/site';
import { contactFields, emptyContact, validateContact, type ContactField, type ContactErrors, type ContactValues } from '@/lib/contact-validation';
import { SelectField } from './select-field';
const options = [...services.map(service => ({ value: service.title, label: service.title, description: service.short })), { value: 'Not sure yet — let’s discuss', label: 'Not sure yet — let’s discuss', description: 'Start with the problem. We can define the scope together.' }];
export function ContactForm() {
  const [values, setValues] = useState<ContactValues>({ ...emptyContact });
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [serverErrors, setServerErrors] = useState<ContactErrors>({});
  const validation = validateContact(values);
  const errors = { ...validation, ...serverErrors };
  const invalidFields = contactFields.filter(field => Boolean(errors[field]));
  function visible(field: ContactField) { return Boolean(errors[field] && (submitted || touched[field])); }
  function update(field: ContactField, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    setServerErrors(current => { const next = { ...current }; delete next[field]; return next; });
    if (error) setError('');
  }
  function blur(field: ContactField) { setTouched(current => ({ ...current, [field]: true })); }
  function focus(field: ContactField) { document.getElementById(`contact-${field}`)?.focus(); }
  function fieldError(field: ContactField) { return visible(field) ? <p className="field-error" id={`contact-${field}-error`}><CircleAlert size={13} aria-hidden="true" /><span>{errors[field]}</span></p> : null; }
  function describedBy(field: ContactField, hint?: string) { return [hint, visible(field) ? `contact-${field}-error` : ''].filter(Boolean).join(' ') || undefined; }
  function reset() { setValues({ ...emptyContact }); setTouched({}); setSubmitted(false); setServerErrors({}); setError(''); setStatus('idle'); }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    setSubmitted(true); setError('');
    const checked = validateContact(values);
    const firstInvalid = contactFields.find(field => checked[field]);
    if (firstInvalid) { focus(firstInvalid); return; }
    const data = new FormData(event.currentTarget);
    setStatus('sending');
    try {
      const response = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(data)) });
      const result = await response.json();
      if (!response.ok) {
        const fields: ContactErrors = {};
        for (const field of contactFields) if (typeof result.fields?.[field] === 'string') fields[field] = result.fields[field];
        if (Object.keys(fields).length) { setServerErrors(fields); setStatus('idle'); const first = contactFields.find(field => fields[field]); if (first) focus(first); return; }
        throw new Error(result.error || 'Your message could not be sent. Please try email instead.');
      }
      setStatus('success');
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to send. Please email directly.'); setStatus('error'); }
  }
  if (status === 'success') return <div className="form-success" role="status"><CheckCircle2 size={38} /><h2>Thank you for the introduction.</h2><p>Your enquiry has been sent. I’ll review the details and reply to the email address you provided.</p><button className="text-link" onClick={reset}>Send another enquiry <ArrowUpRight size={17} /></button></div>;
  return <form className="contact-form" onSubmit={submit} noValidate aria-label="Project enquiry" aria-busy={status === 'sending'}>
    <div className="form-heading"><span className="eyebrow">Project enquiry</span><span>Fields marked * are required</span></div>
    {submitted && invalidFields.length > 0 && <div className="validation-summary" role="alert"><CircleAlert size={19} aria-hidden="true" /><div><b>A few details need your attention.</b><p>Check the fields below so I can respond to your enquiry.</p><ul>{invalidFields.map(field => <li key={field}><button type="button" onClick={() => focus(field)}>{errors[field]}</button></li>)}</ul></div></div>}
    <fieldset className="enquiry-fields" disabled={status === 'sending'}>
      <div className="form-pair"><div className="field"><label htmlFor="contact-name">Your name *</label><input id="contact-name" name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100} value={values.name} onChange={event => update('name', event.target.value)} onBlur={() => blur('name')} aria-invalid={visible('name') || undefined} aria-describedby={describedBy('name')} />{fieldError('name')}</div><div className="field"><label htmlFor="contact-email">Email address *</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} value={values.email} onChange={event => update('email', event.target.value)} onBlur={() => blur('email')} aria-invalid={visible('email') || undefined} aria-describedby={describedBy('email')} />{fieldError('email')}</div></div>
      <div className="field"><label htmlFor="contact-company">Company or website <span className="optional">(optional)</span></label><input id="contact-company" name="company" autoComplete="organization" placeholder="A little context about your business" maxLength={200} value={values.company} onChange={event => update('company', event.target.value)} onBlur={() => blur('company')} aria-invalid={visible('company') || undefined} aria-describedby={describedBy('company')} />{fieldError('company')}</div>
      <div className="field"><label id="contact-subject-label" htmlFor="contact-subject">What can I help with? *</label><SelectField id="contact-subject" name="subject" labelledBy="contact-subject-label" value={values.subject} options={options} onChange={value => update('subject', value)} onBlur={() => blur('subject')} invalid={visible('subject')} describedBy={describedBy('subject')} disabled={status === 'sending'} />{fieldError('subject')}</div>
      <div className="field"><label htmlFor="contact-message">Tell me about your project *</label><textarea id="contact-message" name="message" required minLength={20} maxLength={5000} rows={5} placeholder="What are you trying to achieve? Include any existing systems, timing, or budget considerations." value={values.message} onChange={event => update('message', event.target.value)} onBlur={() => blur('message')} aria-invalid={visible('message') || undefined} aria-describedby={describedBy('message', 'contact-message-hint')} /><div className="field-hint" id="contact-message-hint"><span>A little context helps. At least 20 characters.</span><span>{values.message.length.toLocaleString()} / 5,000</span></div>{fieldError('message')}</div>
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="field consent-field"><label className="consent" htmlFor="contact-consent"><input id="contact-consent" name="consent" type="checkbox" required value="yes" checked={values.consent === 'yes'} onChange={event => update('consent', event.target.checked ? 'yes' : '')} onBlur={() => blur('consent')} aria-invalid={visible('consent') || undefined} aria-describedby={describedBy('consent')} /><span>I agree to be contacted about this enquiry. I have read the <Link href="/privacy">privacy notice</Link>.</span></label>{fieldError('consent')}</div>
    </fieldset>
    {error && <div className="form-error service-error" role="alert"><CircleAlert size={17} aria-hidden="true" /><div>{error} <a href={`mailto:${site.email}`}>Email Parth directly.</a></div></div>}
    <button className="button" disabled={status === 'sending'} type="submit">{status === 'sending' ? <>Sending enquiry <LoaderCircle className="spin" size={18} /></> : <>Send project enquiry <ArrowUpRight size={18} /></>}</button><p className="form-footnote">This starts a conversation. There’s no booking or commitment.</p>
  </form>;
}
