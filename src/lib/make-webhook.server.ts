// Server-only: forwards saved consultation bookings to a Make.com custom webhook.
// The webhook URL is a secret (MAKE_WEBHOOK_URL) and must never reach the browser or logs.

export type SavedConsultation = {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string;
  budget: string;
  preferred_date: string | null;
  message: string;
  created_at: string;
};

export type MakeWebhookResult =
  | { status: "sent" }
  | { status: "skipped"; reason: "not_configured" | "invalid_url" }
  | { status: "failed"; reason: string };

export const MAKE_WEBHOOK_TIMEOUT_MS = 8_000;

export function buildMakePayload(booking: SavedConsultation) {
  return {
    id: booking.id,
    full_name: booking.full_name,
    email: booking.email,
    company: booking.company,
    phone: booking.phone,
    service: booking.service,
    budget: booking.budget,
    preferred_date: booking.preferred_date,
    message: booking.message,
    created_at: booking.created_at,
  };
}

/**
 * Sends a saved booking to Make.com. Never throws: a webhook problem must not
 * undo or fail a booking that is already saved. Logs only the booking id and
 * the failure reason, never the webhook URL or the visitor's details.
 */
export async function sendBookingToMake(
  booking: SavedConsultation,
  options: { webhookUrl: string | undefined; fetchImpl?: typeof fetch; timeoutMs?: number },
): Promise<MakeWebhookResult> {
  const { webhookUrl, fetchImpl = fetch, timeoutMs = MAKE_WEBHOOK_TIMEOUT_MS } = options;

  if (!webhookUrl) {
    console.warn(`[make-webhook] MAKE_WEBHOOK_URL is not set; booking ${booking.id} was saved but not forwarded`);
    return { status: "skipped", reason: "not_configured" };
  }

  let url: URL;
  try {
    url = new URL(webhookUrl);
    if (url.protocol !== "https:") throw new Error("not https");
  } catch {
    console.error(`[make-webhook] MAKE_WEBHOOK_URL is not a valid https URL; booking ${booking.id} was not forwarded`);
    return { status: "skipped", reason: "invalid_url" };
  }

  try {
    const response = await fetchImpl(url.toString(), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildMakePayload(booking)),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) {
      const body = (await response.text().catch(() => "")).slice(0, 200);
      const reason = `HTTP ${response.status}${body ? `: ${body}` : ""}`;
      console.error(`[make-webhook] Make.com rejected booking ${booking.id} (${reason})`);
      return { status: "failed", reason };
    }
    return { status: "sent" };
  } catch (err) {
    const reason = err instanceof Error ? `${err.name}: ${err.message}` : "unknown error";
    console.error(`[make-webhook] Could not reach Make.com for booking ${booking.id} (${reason})`);
    return { status: "failed", reason };
  }
}
