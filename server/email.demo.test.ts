import { describe, expect, it } from "vitest";
import { sendContactMessage } from "./email";

describe("demo contact delivery", () => {
  it("captures a valid message without requiring SMTP credentials", async () => {
    const previousMode = process.env.GMAIL_DEMO_MODE;
    const previousUser = process.env.GMAIL_SMTP_USER;
    const previousPassword = process.env.GMAIL_APP_PASSWORD;

    process.env.GMAIL_DEMO_MODE = "true";
    delete process.env.GMAIL_SMTP_USER;
    delete process.env.GMAIL_APP_PASSWORD;

    await expect(sendContactMessage({
      name: "Demo Visitor",
      email: "visitor@example.com",
      project: "A sufficiently long demo project enquiry for the mailer test.",
    })).resolves.toBeUndefined();

    process.env.GMAIL_DEMO_MODE = previousMode;
    process.env.GMAIL_SMTP_USER = previousUser;
    process.env.GMAIL_APP_PASSWORD = previousPassword;
  });
});
