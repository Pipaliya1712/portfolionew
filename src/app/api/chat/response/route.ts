import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/lib/assistant';
type Message = {
    role: 'user' | 'assistant';
    content: string;
};
export async function POST(req: NextRequest) {
    try {
        const raw = await req.text();
        if (raw.length > 25000)
            return NextResponse.json({ error: 'Please send a shorter conversation.' }, { status: 413 });
        let body;
        try {
            body = JSON.parse(raw);
        }
        catch {
            return NextResponse.json({ error: 'Please send a valid request.' }, { status: 400 });
        }
        const { messages, page } = body ?? {};
        if (!Array.isArray(messages) || messages.length < 1 || messages.length > 10 || messages.some((m: Message) => !m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || !m.content.trim() || m.content.length > 4000) || messages.at(-1).role !== 'user')
            return NextResponse.json({ error: 'Please send a valid question.' }, { status: 400 });
        if (messages.at(-1).content.length > 2000)
            return NextResponse.json({ error: 'Please keep your question under 2,000 characters.' }, { status: 400 });
        if (!process.env.GROQ_API_KEY)
            return new Response('The AI assistant is not connected at the moment. You can explore [services](/services), read about [selected work](/work), or [contact Parth directly](/contact) to discuss your project.', { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
        const allowedPages = ['/', '/services', '/work', '/about', '/insights', '/contact', '/privacy'];
        const context = typeof page === 'string' && (allowedPages.includes(page) || /^\/(services|work|insights)\/[a-z0-9-]+$/.test(page)) ? `The visitor is currently viewing ${page}.` : '';
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST', headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile', messages: [{ role: 'system', content: SYSTEM_PROMPT + '\n' + context }, ...messages.map((m: Message) => ({ role: m.role, content: m.content }))], max_tokens: 650, temperature: 0.35 }),
            signal: AbortSignal.any([req.signal, AbortSignal.timeout(30000)]), cache: 'no-store',
        });
        if (!response.ok)
            throw new Error('Provider unavailable');
        const result = await response.json();
        const answer = result.choices?.[0]?.message?.content;
        if (typeof answer !== 'string' || !answer.trim())
            throw new Error('Empty response');
        return new Response(answer, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
    }
    catch {
        return NextResponse.json({ error: 'The assistant is temporarily unavailable. Please contact Parth directly or try again.' }, { status: 503 });
    }
}
