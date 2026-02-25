// jobs/reminderEngine.ts
// Pure scheduling/policy logic for reminders (no DB calls, no providers).
// Designed to be used by cronHandler (server-side) and any future test harnesses.

import { createHash } from "crypto";

export type InvoiceStatus =
  | "DRAFT"
  | "SENT"
  | "OVERDUE"
  | "PARTIALLY_PAID"
  | "PAID"
  | "DISPUTED"
  | "PAUSED"
  | "CANCELLED";

export type ReminderTrigger = "DAYS_AFTER_SENT" | "DAYS_BEFORE_DUE" | "DAYS_AFTER_DUE";

export interface ReminderCandidate {
  id: string;
  orgId: string;

  invoiceNumber: string;
  status: InvoiceStatus;

  // Use ZAR amount (matches DB numeric). If you want cents, convert outside this module.
  balance: number;

  // ISO timestamp for when invoice was sent (timestamptz). Can be null for drafts.
  sentAt: string | null;

  // YYYY-MM-DD (date). Can be null if no due date.
  dueDate: string | null;

  // hard stops
  isPaused: boolean;
  isDisputed: boolean;

  // customer comms gating (opt-out / do-not-contact / consent)
  optedOut: boolean;
  doNotContact?: boolean;
  consent?: boolean;
}

export interface ReminderRule {
  id: string;
  orgId: string;

  trigger: ReminderTrigger;
  offsetDays: number;

  // template in DB (message_templates.id)
  templateId: string;

  // weekly cap (per invoice). If null/undefined, caller should apply org default.
  weeklyCap?: number | null;
}

/**
 * Hard stops: invoice should not be reminded.
 */
export function isHardStop(status: InvoiceStatus): boolean {
  return status === "PAID" || status === "DISPUTED" || status === "PAUSED" || status === "CANCELLED";
}

/**
 * Eligibility gate: invoice must be collectible, non-zero, and not blocked.
 * NOTE: this does not check quiet-hours, weekly caps, channel reachability, or idempotency.
 */
export function filterEligibleInvoices(candidates: ReminderCandidate[]): ReminderCandidate[] {
  return candidates.filter((inv) => {
    const collectible =
      inv.status === "SENT" || inv.status === "OVERDUE" || inv.status === "PARTIALLY_PAID";

    const commsAllowed =
      !inv.optedOut && !inv.isPaused && !inv.isDisputed && !isHardStop(inv.status) && (inv.doNotContact !== true);

    const consentOk = inv.consent === undefined ? true : inv.consent === true;

    return collectible && inv.balance > 0 && commsAllowed && consentOk;
  });
}

/**
 * Compute today's YYYY-MM-DD in a specific timezone (default: Africa/Johannesburg).
 */
export function todayYmd(timeZone = "Africa/Johannesburg"): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const y = parts.find((p) => p.type === "year")?.value ?? "0000";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

/**
 * Convert an ISO timestamp into YYYY-MM-DD in a given timezone.
 */
export function ymdFromIso(iso: string, timeZone = "Africa/Johannesburg"): string {
  const dt = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(dt);

  const y = parts.find((p) => p.type === "year")?.value ?? "0000";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

/**
 * Date math helpers using UTC-midnight for stability.
 */
function parseYmdUtc(ymd: string): number {
  const [y, m, d] = ymd.split("-").map(Number);
  return Date.UTC(y, (m ?? 1) - 1, d ?? 1);
}

/**
 * Returns (a - b) in whole days where a and b are YYYY-MM-DD.
 * Example: daysDiff("2026-02-21","2026-02-20") -> 1
 */
export function daysDiff(aYmd: string, bYmd: string): number {
  return Math.floor((parseYmdUtc(aYmd) - parseYmdUtc(bYmd)) / (1000 * 60 * 60 * 24));
}

/**
 * Whether a rule should fire "today" for a given invoice.
 * Caller passes todayYmd (so cron can control date).
 */
export function ruleFiresToday(
  rule: ReminderRule,
  inv: ReminderCandidate,
  todayYmd: string,
  timeZone = "Africa/Johannesburg"
): boolean {
  if (isHardStop(inv.status) || inv.isPaused || inv.isDisputed) return false;

  if (rule.trigger === "DAYS_AFTER_SENT") {
    if (!inv.sentAt) return false;
    const sentYmd = ymdFromIso(inv.sentAt, timeZone);
    return daysDiff(todayYmd, sentYmd) === rule.offsetDays;
  }

  if (rule.trigger === "DAYS_BEFORE_DUE") {
    if (!inv.dueDate) return false;
    // fires when dueDate - today == offset
    return daysDiff(inv.dueDate, todayYmd) === rule.offsetDays;
  }

  if (rule.trigger === "DAYS_AFTER_DUE") {
    if (!inv.dueDate) return false;
    return daysDiff(todayYmd, inv.dueDate) === rule.offsetDays;
  }

  return false;
}

/**
 * Deterministic idempotency key for message_log.message_key
 * Unique per org + invoice + rule + "slot day".
 */
export function buildMessageKey(orgId: string, invoiceId: string, ruleId: string, slotYmd: string): string {
  return createHash("sha256").update(`${orgId}:${invoiceId}:${ruleId}:${slotYmd}`).digest("hex");
}

/**
 * Utility: compute which rules fire today for an invoice (usually 0 or 1).
 */
export function getFiringRules(
  rules: ReminderRule[],
  inv: ReminderCandidate,
  todayYmd: string,
  timeZone = "Africa/Johannesburg"
): ReminderRule[] {
  return rules.filter((r) => ruleFiresToday(r, inv, todayYmd, timeZone));
}