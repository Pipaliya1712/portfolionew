import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// ─── DELETE /api/chat/conversations/[id] ──────────────────────────────────────
// Soft-deletes the conversation and all its messages by setting deleted_at.
// The frontend treats this as a session reset (clears UI + localStorage).
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Conversation id is required.' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const supabase = await createClient();

    // 1. Soft-delete all messages belonging to this conversation
    const { error: msgError } = await supabase
      .from('messages')
      .update({ deleted_at: now })
      .eq('conversation_id', id)
      .is('deleted_at', null);

    if (msgError) throw msgError;

    // 2. Soft-delete the conversation itself
    const { error: convError } = await supabase
      .from('conversations')
      .update({ deleted_at: now })
      .eq('id', id)
      .is('deleted_at', null);

    if (convError) throw convError;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error('[DELETE /api/chat/conversations/[id]]', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
