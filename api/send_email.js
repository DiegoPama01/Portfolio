const { Resend } = require("resend");

module.exports = async (req, res) => {
  console.log("Incoming:", req.method, req.url);
  console.log("Headers content-type:", req.headers["content-type"]);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        console.log("Body string (not JSON):", body);
        return res.status(400).json({ error: "Body must be valid JSON" });
      }
    }

    console.log("Body received:", body);

    const { to, subject, html } = body || {};
    if (!to || !subject || !html) {
      return res.status(400).json({ error: "Missing fields: to, subject, html" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;

    console.log("Env check:", {
      hasApiKey: Boolean(apiKey),
      from,
    });

    if (!apiKey) return res.status(500).json({ error: "Missing RESEND_API_KEY" });
    if (!from) return res.status(500).json({ error: "Missing RESEND_FROM" });

    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    console.log("Resend response:", data);

    return res.status(200).json({ ok: true, data });
  } catch (e) {
    console.error("ERROR sending email:", e);
    return res.status(500).json({
      ok: false,
      error: e?.message || "Unknown error",
      details: e,
    });
  }
};
