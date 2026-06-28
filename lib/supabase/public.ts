import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicKey, hasSupabaseEnv } from "@/lib/env";

export function createSupabasePublicClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, getSupabasePublicKey()!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
