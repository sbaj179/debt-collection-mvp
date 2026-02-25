export function getActiveOrgId(): string {
  const orgId = typeof window !== "undefined" ? localStorage.getItem("active_org_id") : null;
  if (!orgId) throw new Error("No active_org_id found. Sign in again.");
  return orgId;
}