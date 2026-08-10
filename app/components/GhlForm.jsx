"use client";

import React from "react";
import Script from "next/script";

const FORM_ID = "a5I9LSG6fn8SGED6Nz0g";

/**
 * Embedded LeadConnector / wepushx form.
 *
 * `form_embed.js` listens for postMessage from the iframe and resizes it as the
 * form grows, so the height below is only the starting value.
 *
 * NOTE: submission is now handled entirely inside the embed. The redirect to
 * /merci and the Meta Pixel `Lead` event must be configured in the form's own
 * settings — they no longer fire from our code.
 */
export default function GhlForm() {
  return (
    <>
      <iframe
        src={`https://api.wepushx.com/widget/form/${FORM_ID}`}
        id={`inline-${FORM_ID}`}
        title="Renex — Demande d'étude gratuite"
        style={{
          width: "100%",
          height: "678px",
          border: "none",
          borderRadius: "12px",
          display: "block",
        }}
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Renex"
        data-height="678"
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
      />

      <Script
        src="https://api.wepushx.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
