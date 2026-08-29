/* Lumora contact delivery — Gmail SMTP transport; credentials are read from managed environment variables and never sent to the browser. */
import nodemailer from "nodemailer";

export type ContactMessage = {
  name: string;
  email: string;
  project: string;
};

export const DEFAULT_GMAIL_CONTACT_TO = "chowdorydevops@gmail.com";

type EmailEnvironment = {
  GMAIL_DEMO_MODE?: string;
  GMAIL_CONTACT_TO?: string;
  GMAIL_SMTP_USER?: string;
  GMAIL_APP_PASSWORD?: string;
};

function getRuntimeEmailEnvironment(): EmailEnvironment {
  return {
    GMAIL_DEMO_MODE: process.env.GMAIL_DEMO_MODE,
    GMAIL_CONTACT_TO: process.env.GMAIL_CONTACT_TO,
    GMAIL_SMTP_USER: process.env.GMAIL_SMTP_USER,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
  };
}

export function getEmailConfiguration(env: EmailEnvironment = getRuntimeEmailEnvironment()) {
  return {
    demoMode: env.GMAIL_DEMO_MODE !== "false",
    contactTo: env.GMAIL_CONTACT_TO || env.GMAIL_SMTP_USER || DEFAULT_GMAIL_CONTACT_TO,
  };
}

function getTransport(env: EmailEnvironment = getRuntimeEmailEnvironment()) {
  const user = env.GMAIL_SMTP_USER;
  const pass = env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("Gmail SMTP is not configured");

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendContactMessage(message: ContactMessage) {
  const config = getEmailConfiguration();

  // Demo mode is intentional until the owner provides a valid Gmail App Password.
  // The submission is validated by the API but no outbound email is attempted.
  if (config.demoMode) return;

  await getTransport().sendMail({
    from: `Lumora website <${process.env.GMAIL_SMTP_USER}>`,
    to: config.contactTo,
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
