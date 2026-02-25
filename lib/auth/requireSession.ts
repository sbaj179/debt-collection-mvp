import type { Session, SupabaseClient } from "@supabase/supabase-js";

export async function requireSession(supabase: SupabaseClient): Promise<Session> {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  if (!data.session) throw new Error("No active session.");
  return data.session;
}
