import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = async () => {
  const cookieStore = await cookies();
  
  return createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    },
  );
};

// ─── Type Definitions ─────────────────────────────────────────────────────────

export interface Conversation {
  id: string;            // uuid
  session_id: string;   // anonymous browser-generated UUID
  started_at: string;   // ISO timestamp
  updated_at: string;   // ISO timestamp
  deleted_at: string | null; // soft-delete
}

export interface ChatMessage {
  id: string;              // uuid
  conversation_id: string; // FK → conversations.id
  type: 'bot' | 'user';
  text: string;
  created_at: string;      // ISO timestamp
}
