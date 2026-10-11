import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const name = (body.name || "").toString().trim().slice(0, 100);
    const email = (body.email || "").toString().trim().slice(0, 200);
    const intent = (body.intent || "").toString().trim().slice(0, 50);
    const projectType = (body.projectType || "").toString().trim().slice(0, 100);
    const message = (body.message || "").toString().trim().slice(0, 4000);
    const website = (body.website || "").toString().trim(); // honeypot: humans leave this blank

    // Bot filled the hidden honeypot field — silently accept, do nothing.
    if (website) return Response.json({ ok: true });

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Please provide a valid name and email." }, { status: 400 });
    }

    const subject = `New project inquiry from ${name}`;
    const textBody = [
      "New inquiry submitted on novotechy.com",
      "",
      `I am looking to ${intent} ${projectType} with NovoTechy.`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Details:",
      message || "(no additional details provided)",
    ].join("\n");

    const htmlBody = [
      '<div style="font-family:Inter,Arial,sans-serif;color:#080809;max-width:560px">',
      '<h2 style="color:#00f0ff;margin:0 0 16px">New project inquiry</h2>',
      '<p style="font-size:15px;line-height:1.6">A new inquiry was submitted through novotechy.com.</p>',
      '<table style="font-size:14px;line-height:1.6;border-collapse:collapse">',
      `<tr><td style="padding:4px 12px 4px 0;color:#5d5fef">Request</td><td>I am looking to <strong>${intent}</strong> <strong>${projectType}</strong> with NovoTechy.</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;color:#5d5fef">Name</td><td>${name}</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;color:#5d5fef">Email</td><td>${email}</td></tr>`,
      "</table>",
      '<p style="font-size:14px;line-height:1.6;margin-top:16px;white-space:pre-wrap">',
      (message || "(no additional details provided)").replace(/</g, "<"),
      "</p>",
      "</div>",
    ].join("\n");

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: "info@novotechy.com",
      subject,
      text: textBody,
      html: htmlBody,
      from_name: "NovoTechy Website",
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}