import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// ─── POST /api/chat/messages ───────────────────────────────────────────────────
// Saves a single message (user or bot) to the messages table.
// Body: { conversation_id: string, type: 'user' | 'bot', text: string }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversation_id, type, text } = body;

    if (!conversation_id || typeof conversation_id !== 'string') {
      return NextResponse.json({ error: 'conversation_id is required.' }, { status: 400 });
    }
    if (type !== 'user' && type !== 'bot') {
      return NextResponse.json({ error: 'type must be "user" or "bot".' }, { status: 400 });
    }
    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'text is required.' }, { status: 400 });
    }

    const supabase = await createClient();
    // Insert the message
    const { data: message, error: msgError } = await supabase
      .from('messages')
      .insert({ conversation_id, type, text: text.trim() })
      .select()
      .single();

    if (msgError) throw msgError;

    // Also bump the conversation's updated_at timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversation_id);

    return NextResponse.json({ message }, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/chat/messages]', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
