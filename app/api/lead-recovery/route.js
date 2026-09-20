/**
 * Recovery endpoint — step 2 completed from the 24h follow-up link.
 *
 * The CRM messages the leads who stopped after step 1 and sends them back to
 * the landing page with ?contact_id=…&name=…&phone=…&city=…. LeadForm detects
 * those params, opens step 2 directly, and posts here instead of /api/lead so
 * the n8n workflow can UPDATE the existing contact (contact_id) rather than
 * create a new one.
 *
 * Same reasoning as the other routes: server-side forward, so no CORS and the
 * webhook URL stays out of the client bundle.
 *
 * Production webhook (/webhook/ path — the n8n workflow must be activated).
 * Override with the LEAD_RECOVERY_WEBHOOK_URL env var if needed, e.g. to point
 * at the /webhook-test/ path while editing the workflow.
 */
const WEBHOOK_URL =
  process.env.LEAD_RECOVERY_WEBHOOK_URL ||
  "https://automate.wepushx.com/webhook/bae7736d-0d47-46e4-b0af-0a249910071d";

// Always emitted, even when empty, so the n8n mapping never sees a missing key.
const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  // Orthographe utilisée côté CRM — toujours envoyée en plus de utm_campaign
  "utm_compaign",
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
      // The CRM record to update — empty means the link was missing contact_id
      contact_id: payload.contact_id ?? "",
      form_stage: "recovered",
      recovered: true,
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
      console.error("Recovery webhook rejected:", res.status, detail);
      return Response.json(
        { ok: false, error: `Webhook responded ${res.status}` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Recovery webhook failed:", error);
    return Response.json(
      { ok: false, error: "Impossible de transmettre la demande." },
      { status: 500 }
    );
  }
}
