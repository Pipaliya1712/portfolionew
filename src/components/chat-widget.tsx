'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageSquare, Send, X, RotateCcw, Square, Braces, Layers3, Compass, ArrowRight } from 'lucide-react';
import { MessageText } from './message-text';
import { BrandMark } from './brand-mark';
import { usePathname } from 'next/navigation';
type Message = { role: 'user' | 'assistant'; content: string };
const topics = [
  { title: 'Find the right service', detail: 'AI, websites & integrations', question: 'What services could help my business?', Icon: Layers3 },
  { title: 'Explore the work', detail: 'Projects & technical experience', question: 'Which projects best show your experience?', Icon: Braces },
  { title: 'Plan a first conversation', detail: 'Scope, process & next steps', question: 'What should I prepare before discussing a project?', Icon: Compass },
];
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const pathname = usePathname();
  const followups = pathname.startsWith('/work') ? ['How would a similar project start?', 'What services are relevant?'] : pathname.startsWith('/services') ? ['What does an engagement include?', 'Show a relevant project'] : ['How do we start a project?', 'Show relevant experience'];
  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => { if (open && !busy) inputRef.current?.focus(); }, [open, busy]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [messages, busy]);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); launchRef.current?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);
  function close() { setOpen(false); launchRef.current?.focus(); }
  function reset() { if (busy) return; setMessages([]); setError(''); setInput(''); inputRef.current?.focus(); }
  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next: Message[] = [...messages, { role: 'user', content: text.trim() }];
    setMessages(next); setInput(''); setBusy(true); setError('');
    const controller = new AbortController(); controllerRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch('/api/chat/response', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ messages: next.slice(-10), page: pathname }) });
      if (!response.ok) { const result = await response.json(); throw new Error(result.error || 'The assistant is unavailable. Please contact Parth directly.'); }
      if (!response.body) throw new Error('No response received. Please try again.');
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let answer = '';
      setMessages([...next, { role: 'assistant', content: '' }]);
      while (true) { const { done, value } = await reader.read(); if (done) break; answer += decoder.decode(value, { stream: true }); setMessages([...next, { role: 'assistant', content: answer }]); }
      answer += decoder.decode();
      if (!answer.trim()) throw new Error('No answer received. Please try again or contact Parth.');
      setMessages([...next, { role: 'assistant', content: answer }]);
    } catch (err) {
      setMessages(next.slice(0, -1)); setInput(text);
      setError(err instanceof Error && err.name === 'AbortError' ? 'The response stopped. Your question is ready to edit or try again.' : err instanceof Error ? err.message : 'Unable to connect. Please try again.');
    } finally { clearTimeout(timeout); setBusy(false); controllerRef.current = null; }
  }
  return <>
    {open && <section id="website-assistant" className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="assistant-title">
      <div className="chat-header"><span className="assistant-avatar"><BrandMark /></span><div><span className="assistant-kicker">A useful starting point</span><h2 id="assistant-title">Parth’s portfolio guide</h2><p>AI assistant · not live chat</p></div><div className="chat-header-actions"><button onClick={reset} disabled={busy || messages.length === 0} aria-label="Start a new conversation" title="Start a new conversation"><RotateCcw size={15} /></button><button onClick={close} aria-label="Close assistant"><X size={18} /></button></div></div>
      <div className="chat-body" ref={bodyRef}>
        {messages.length === 0 ? <div className="assistant-introduction"><div className="assistant-welcome-art" aria-hidden="true"><span /><BrandMark /><span /></div><span className="assistant-section-label">An introduction, at your pace</span><h3 className="chat-welcome">What would you<br /><em>like to explore?</em></h3><p className="chat-intro">A question about the work, a technical challenge, or an idea you’d like to discuss.</p><div className="assistant-topics">{topics.map(({ title, detail, question, Icon }) => <button key={title} onClick={() => send(question)} disabled={busy}><span className="topic-icon"><Icon size={17} strokeWidth={1.5} /></span><span><b>{title}</b><small>{detail}</small></span><ArrowUpRight size={15} /></button>)}</div><div className="assistant-browse"><span>Or take a look around</span><Link href="/services" onClick={close}>Services <ArrowRight size={11} /></Link><Link href="/work" onClick={close}>Work <ArrowRight size={11} /></Link></div></div> : <><div className="conversation-caption"><span className="session-dot" />Your conversation <span>Kept in this session</span></div><div role="log" aria-live="polite" aria-busy={busy} aria-label="Assistant conversation">{messages.map((message, index) => <div className={`chat-message ${message.role}`} key={index}><span className="chat-role">{message.role === 'user' ? 'You' : <><BrandMark />Portfolio guide</>}</span><MessageText text={message.content} /></div>)}</div></>}
        {busy && <div className="chat-thinking" role="status"><span className="thinking-dots" aria-hidden="true"><i /><i /><i /></span>Considering your question</div>}
        {error && <div className="chat-error" role="alert">{error}</div>}
        {messages.length > 0 && !busy && !error && <div className="chat-suggestions followup-suggestions">{followups.map(text => <button key={text} onClick={() => send(text)}>{text} <ArrowUpRight size={11} /></button>)}</div>}
      </div>
      <Link href="/contact" onClick={close} className="assistant-contact"><span className="contact-icon"><MessageSquare size={15} /></span><span><b>Prefer to speak with Parth?</b><small>Start a project conversation</small></span><ArrowUpRight size={17} /></Link>
      <form className="chat-compose" onSubmit={event => { event.preventDefault(); send(input); }}><input ref={inputRef} aria-label="Your question" placeholder="What’s on your mind?" value={input} maxLength={2000} onChange={event => setInput(event.target.value)} disabled={busy} />{busy ? <button type="button" onClick={() => controllerRef.current?.abort()} aria-label="Stop response" title="Stop response"><Square size={12} /></button> : <button type="submit" aria-label="Send question" disabled={!input.trim()}><Send size={15} /></button>}</form>
      <div className="chat-footer"><span>AI can make mistakes. Keep sensitive details private.</span><Link href="/privacy">Privacy</Link></div>
    </section>}
    <button ref={launchRef} className={`chat-launcher ${open ? 'chat-is-open' : ''}`} onClick={() => open ? close() : setOpen(true)} aria-controls="website-assistant" aria-expanded={open} aria-label={open ? 'Close website assistant' : 'Open website assistant'}><span className="launcher-emblem">{open ? <X size={19} /> : <BrandMark />}</span><span><b>{open ? 'Close guide' : 'A question in mind?'}</b>{!open && <small>Explore with the portfolio guide</small>}</span>{!open && <ArrowUpRight className="launcher-arrow" size={16} />}</button>
  </>;
}
