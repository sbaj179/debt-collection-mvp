export type InvoiceStatus = 'SENT' | 'OVERDUE' | 'PARTIALLY_PAID' | 'PAID' | 'DISPUTED' | 'PAUSED';

export interface ReminderCandidate {
  id: string;
  orgId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  balanceCents: number;
  sentAt: string;
  dueDate: string;
  isPaused: boolean;
  isDisputed: boolean;
  optedOut: boolean;
}

export interface ReminderRule {
  trigger: 'days_after_sent' | 'days_before_due' | 'days_after_due';
  offsetDays: number;
  templateId: string;
  maxPerWeek: number;
}

export function filterEligibleInvoices(candidates: ReminderCandidate[]): ReminderCandidate[] {
  return candidates.filter(
    (invoice) =>
      (invoice.status === 'SENT' || invoice.status === 'OVERDUE' || invoice.status === 'PARTIALLY_PAID') &&
      invoice.balanceCents > 0 &&
      !invoice.isPaused &&
      !invoice.isDisputed &&
      !invoice.optedOut
  );
}

export function isHardStop(status: InvoiceStatus): boolean {
  return status === 'PAID' || status === 'DISPUTED' || status === 'PAUSED';
}
