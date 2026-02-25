type MaybeError = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  error_description?: string;
};

function rawErrorMessage(error: unknown): string {
  if (!error) return "Unexpected error.";
  if (typeof error === "string") return error;

  const e = error as MaybeError;
  return e.message || e.error_description || e.details || e.hint || "Unexpected error.";
}

export function toUserError(error: unknown, fallback = "Something went wrong."): string {
  const message = rawErrorMessage(error);
  const lower = message.toLowerCase();

  if (lower.includes("no active session") || lower.includes("auth session missing")) {
    return "Your session expired. Please sign in again.";
  }

  if (lower.includes("row-level security") || lower.includes("permission denied")) {
    return "You do not have access to this organization data.";
  }

  if (lower.includes("customers") && lower.includes("not null")) {
    return "Please select a valid customer before saving.";
  }

  if (lower.includes("invoice_number") && lower.includes("not null")) {
    return "Invoice number is required. Please retry and contact support if this continues.";
  }

  if (lower.includes("invoice_items") && lower.includes("invoices") && lower.includes("row-level security")) {
    return "Unable to save invoice items because invoice total recalculation is blocked by current access rules.";
  }

  return message || fallback;
}

export function toDeveloperError(error: unknown, fallback = "Unexpected error."): Error {
  if (error instanceof Error) return error;
  return new Error(rawErrorMessage(error) || fallback);
}
