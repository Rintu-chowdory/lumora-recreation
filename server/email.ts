/* Lumora contact delivery — server-only Yahoo SMTP transport; credentials are read from managed environment variables and never sent to the browser. */
import nodemailer from "nodemailer";

export type ContactMessage = {
  name: string;
  email: string;
  project: string;
};

function getTransport() {
  const user = process.env.YAHOO_SMTP_USER;
  const pass = process.env.YAHOO_APP_PASSWORD;
  if (!user || !pass) throw new Error("Yahoo SMTP is not configured");

  return nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendContactMessage(message: ContactMessage) {
  const to = process.env.YAHOO_CONTACT_TO || process.env.YAHOO_SMTP_USER;
  if (!to) throw new Error("Yahoo contact destination is not configured");

  await getTransport().sendMail({
    from: `Lumora website <${process.env.YAHOO_SMTP_USER}>`,
    to,
    replyTo: message.email,
    subject: `New project enquiry from ${message.name}`,
    text: `Name: ${message.name}\nEmail: ${message.email}\n\nProject:\n${message.project}`,
    html: `<h2>New project enquiry</h2><p><strong>Name:</strong> ${escapeHtml(message.name)}</p><p><strong>Email:</strong> ${escapeHtml(message.email)}</p><h3>Project</h3><p>${escapeHtml(message.project).replaceAll("\n", "<br />")}</p>`,
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}
