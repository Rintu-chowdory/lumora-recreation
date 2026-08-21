import { describe, expect, it } from "vitest";

describe("contact form email configuration", () => {
  it("uses demo mode without requiring SMTP credentials", () => {
    expect(process.env.GMAIL_DEMO_MODE ?? "true").toBe("true");
    expect(process.env.GMAIL_CONTACT_TO).toBe("chowdorydevops@gmail.com");
  });
});
