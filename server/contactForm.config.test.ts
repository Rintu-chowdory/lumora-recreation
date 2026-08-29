import { describe, expect, it } from "vitest";
import { DEFAULT_GMAIL_CONTACT_TO, getEmailConfiguration } from "./email";

describe("contact form email configuration", () => {
  it("uses demo mode and the configured default destination without SMTP credentials", () => {
    expect(getEmailConfiguration({})).toEqual({
      demoMode: true,
      contactTo: DEFAULT_GMAIL_CONTACT_TO,
    });
  });

  it("allows deployment environment variables to override the delivery settings", () => {
    expect(
      getEmailConfiguration({
        GMAIL_DEMO_MODE: "false",
        GMAIL_CONTACT_TO: "owner@example.com",
      }),
    ).toEqual({
      demoMode: false,
      contactTo: "owner@example.com",
    });
  });
});
