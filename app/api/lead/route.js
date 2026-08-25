/**
 * Lead forwarding endpoint.
 *
 * The browser posts here and this route forwards to n8n server-side. Doing it
 * this way avoids CORS entirely (a direct browser → n8n POST is blocked unless
 * the webhook explicitly allows the site's origin) and keeps the webhook URL
 * out of the client bundle.
 *
 * NOTE: /webhook-test/ only accepts calls while the n8n workflow is open in the
 * editor and listening. Switch WEBHOOK_URL to the /webhook/ path once the
 * workflow is activated, ideally via an env var.
 */
const WEBHOOK_URL =
  process.env.LEAD_WEBHOOK_URL ||
  "https://automate.wepushx.com/webhook/c8cd6a29-2095-4bd4-a596-374517645efe";

export async function POST(request) {
  try {
    const payload = await request.json();

    const enriched = {
      ...payload,
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
      console.error("Lead webhook rejected:", res.status, detail);
      return Response.json(
        { ok: false, error: `Webhook responded ${res.status}` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Lead webhook failed:", error);
    return Response.json(
      { ok: false, error: "Impossible de transmettre la demande." },
      { status: 500 }
    );
  }
}
