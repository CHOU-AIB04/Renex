/**
 * Partial-lead forwarding endpoint (step 1 of the 2-step form).
 *
 * The browser posts the step-1 fields here (nom, téléphone, consentement) plus
 * the full attribution block, and this route forwards them to n8n
 * server-side — same reasoning as
 * app/api/lead/route.js: no CORS, and the webhook URL stays out of the client
 * bundle.
 *
 * Production webhook (/webhook/ path — the n8n workflow must be activated).
 * Override with the LEAD_STEP1_WEBHOOK_URL env var if needed, e.g. to point at
 * the /webhook-test/ path while editing the workflow.
 */
const WEBHOOK_URL =
  process.env.LEAD_STEP1_WEBHOOK_URL ||
  "https://automate.wepushx.com/webhook/cc8e6eff-ed80-49a1-92f2-655ccb18f899";

// Always emitted, even when empty, so the n8n mapping never sees a missing key.
const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "ttclid",
  "msclkid",
  "landing_url",
  "referrer",
  "page_url",
];

export async function POST(request) {
  try {
    const payload = await request.json();

    const tracking = TRACKING_KEYS.reduce(
      (acc, k) => ({ ...acc, [k]: payload[k] ?? "" }),
      {}
    );

    const enriched = {
      ...payload,
      ...tracking,
      form_step: 1,
      partial: true,
      submitted_at: new Date().toISOString(),
      // Useful for spotting bot traffic / debugging in the CRM
      user_agent: request.headers.get("user-agent") ?? "",
    };

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Step-1 webhook rejected:", res.status, detail);
      return Response.json(
        { ok: false, error: `Webhook responded ${res.status}` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Step-1 webhook failed:", error);
    return Response.json(
      { ok: false, error: "Impossible de transmettre la demande." },
      { status: 500 }
    );
  }
}
