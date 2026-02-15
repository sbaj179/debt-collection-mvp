export type Role = 'ADMIN' | 'ADMIN_STAFF';

export function canManageSettings(role: Role): boolean {
  return role === 'ADMIN';
}
