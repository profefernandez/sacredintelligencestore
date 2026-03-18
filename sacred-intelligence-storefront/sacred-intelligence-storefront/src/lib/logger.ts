/**
 * Structured Error Logger — Sacred Intelligence Collection
 *
 * Standardized logging with tags, context, and timestamps.
 * Every error is traceable. No raw console.log in production code.
 */

type LogLevel = "error" | "warn" | "info";
type LogTag =
  | "API_ERROR"
  | "API_FATAL"
  | "UI_ERROR"
  | "STATE_ERROR"
  | "AUTH_ERROR"
  | "PAYMENT_ERROR"
  | "VALIDATION_ERROR"
  | "CMS_ERROR";

interface LogEntry {
  tag: LogTag;
  context: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

function formatEntry(entry: LogEntry): string {
  return `[${entry.tag}] ${entry.context} — ${entry.message}`;
}

function sanitizeData(data?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!data) return undefined;
  const sanitized = { ...data };
  const sensitiveKeys = ["password", "token", "secret", "apiKey", "api_key", "authorization"];
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
      sanitized[key] = "[REDACTED]";
    }
  }
  return sanitized;
}

function createEntry(tag: LogTag, context: string, message: string, data?: Record<string, unknown>): LogEntry {
  return {
    tag,
    context,
    message,
    data: sanitizeData(data),
    timestamp: new Date().toISOString(),
  };
}

function log(level: LogLevel, entry: LogEntry): void {
  const formatted = formatEntry(entry);
  const payload = entry.data ? { ...entry.data, timestamp: entry.timestamp } : { timestamp: entry.timestamp };

  switch (level) {
    case "error":
      console.error(formatted, payload);
      break;
    case "warn":
      console.warn(formatted, payload);
      break;
    case "info":
      console.info(formatted, payload);
      break;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Log an API error (non-fatal — returned fallback) */
export function logApiError(context: string, message: string, data?: Record<string, unknown>): void {
  log("error", createEntry("API_ERROR", context, message, data));
}

/** Log a fatal API error (threw — no fallback possible) */
export function logApiFatal(context: string, message: string, data?: Record<string, unknown>): void {
  log("error", createEntry("API_FATAL", context, message, data));
}

/** Log a UI/component error */
export function logUiError(context: string, message: string, data?: Record<string, unknown>): void {
  log("error", createEntry("UI_ERROR", context, message, data));
}

/** Log a state management error */
export function logStateError(context: string, message: string, data?: Record<string, unknown>): void {
  log("error", createEntry("STATE_ERROR", context, message, data));
}

/** Log an authentication error */
export function logAuthError(context: string, message: string, data?: Record<string, unknown>): void {
  log("error", createEntry("AUTH_ERROR", context, message, data));
}

/** Log a payment/Stripe error */
export function logPaymentError(context: string, message: string, data?: Record<string, unknown>): void {
  log("error", createEntry("PAYMENT_ERROR", context, message, data));
}

/** Log a validation error */
export function logValidationError(context: string, message: string, data?: Record<string, unknown>): void {
  log("warn", createEntry("VALIDATION_ERROR", context, message, data));
}

/** Log a CMS/Directus error */
export function logCmsError(context: string, message: string, data?: Record<string, unknown>): void {
  log("error", createEntry("CMS_ERROR", context, message, data));
}
