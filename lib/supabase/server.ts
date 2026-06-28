import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getSupabasePublicKey, hasSupabaseEnv } from "@/lib/env";

export async function createSupabaseServerClient(): Promise<SupabaseClient> {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase environment variables are not configured.");
  }

  const cookieStore = await cookies();
  const publicKey = getSupabasePublicKey();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    publicKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot set cookies; middleware/actions handle refresh writes.
          }
        },
      },
    },
  );
}
