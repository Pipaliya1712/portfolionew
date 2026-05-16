import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// ─── POST /api/chat/conversations ─────────────────────────────────────────────
// Creates a new conversation row for the given session_id.
// Body: { session_id: string }
export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();

    if (!session_id || typeof session_id !== 'string') {
      return NextResponse.json(
        { error: 'session_id is required and must be a string.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('conversations')
      .insert({ session_id })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ conversation: data }, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/chat/conversations]', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
