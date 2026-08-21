import { describe, expect, it } from "vitest";

describe("contact form email configuration", () => {
  it("has the Yahoo SMTP credentials and destination configured", () => {
    expect(process.env.YAHOO_SMTP_USER).toBe("Rintuchowdory@yahoo.com");
    expect(process.env.YAHOO_CONTACT_TO).toBe("chowdorydevops@gmail.com");
    expect(process.env.YAHOO_APP_PASSWORD).toBeTruthy();
  });
});
