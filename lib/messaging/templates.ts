export const defaultTemplates = {
  invoiceSent:
    'Hi {customer_name}, your invoice {invoice_number} for R{amount} is ready. Due {due_date}. Pay here: {pay_link}. Upload POP: {portal_link}.',
  friendlyReminder:
    'Hi {customer_name} 👋 quick reminder: invoice {invoice_number} (R{amount}) is still unpaid. Due {due_date}. Pay: {pay_link}.',
  dueToday: 'Hi {customer_name}, invoice {invoice_number} (R{amount}) is due today ({due_date}). Pay: {pay_link}.',
  overdue:
    'Hi {customer_name}, invoice {invoice_number} is overdue. Please settle today or reply to arrange a payment plan. Pay: {pay_link}.',
  popRejected:
    'Thanks {customer_name}. The POP is unclear or doesn’t match the invoice. Please re-upload here: {portal_link} or confirm the correct reference.'
};
