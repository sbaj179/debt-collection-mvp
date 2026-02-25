import type { SupabaseClient } from "@supabase/supabase-js";

const ACTIVE_ORG_STORAGE_KEY = "active_org_id";

export async function getActiveOrgId(supabase: SupabaseClient): Promise<string> {
  const stored = typeof window !== "undefined" ? localStorage.getItem(ACTIVE_ORG_STORAGE_KEY) : null;

  const memberships = await supabase
    .from("org_memberships")
    .select("org_id")
    .limit(200);

  if (memberships.error) throw memberships.error;

  const rows = (memberships.data ?? []) as Array<{ org_id: string }>;
  if (rows.length === 0) {
    throw new Error("No organization membership found for this user.");
  }

  const validOrgIds = new Set(rows.map((row) => String(row.org_id)));
  const selectedOrgId = stored && validOrgIds.has(stored) ? stored : String(rows[0].org_id);

  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, selectedOrgId);
  }

  return selectedOrgId;
}
