import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/blog";

export async function getCurrentOwner() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,full_name,role")
    .eq("id", user.id)
    .eq("role", "owner")
    .maybeSingle<Profile>();

  return { supabase, user, profile: profile ?? null };
}

export async function requireOwner(): Promise<{
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  user: User;
  profile: Profile;
}> {
  const { supabase, user, profile } = await getCurrentOwner();

  if (!user || !profile) {
    redirect("/admin/login");
  }

  return { supabase, user, profile };
}
