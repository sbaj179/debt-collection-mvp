import { filterEligibleInvoices } from './reminderEngine';

export async function runReminderSweep() {
  // TODO: pull invoices + rules from Supabase and enforce idempotency key per invoice/rule/day.
  return {
    checked: 0,
    eligible: filterEligibleInvoices([]).length,
    sent: 0
  };
}
