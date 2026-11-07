import { describe, expect, it } from "vitest";
import { validateLead } from "@/lib/leads/schema";

const valid = {
  name: "Anna Lee",
  contactMethod: "telegram",
  contact: "@anna_lee",
  degree: "master",
  direction: "business",
  intake: "2027",
  message: "I'm interested in a finance master's. IELTS 7.0.",
  consent: true,
  website: "",
};

describe("validateLead", () => {
  it("accepts a complete lead and trims the name", () => {
    const result = validateLead({ ...valid, name: "  Anna Lee  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Anna Lee");
  });

  it("rejects a short name", () => {
    const result = validateLead({ ...valid, name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.name).toBe("name_short");
  });

  it("rejects a malformed email", () => {
    const result = validateLead({ ...valid, contactMethod: "email", contact: "anna@" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.contact).toBe("contact_email");
  });

  it("rejects a phone with too few digits", () => {
    const result = validateLead({ ...valid, contactMethod: "phone", contact: "+1 555" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.contact).toBe("contact_phone");
  });

  it("rejects an invalid Telegram handle", () => {
    const result = validateLead({ ...valid, contact: "@a!" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.contact).toBe("contact_telegram");
  });

  it("requires consent", () => {
    const result = validateLead({ ...valid, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.consent).toBe("consent");
  });

  it("caps the message at 1,000 characters", () => {
    const result = validateLead({ ...valid, message: "x".repeat(1001) });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.message).toBe("message_long");
  });

  it("requires a selected degree and direction", () => {
    const result = validateLead({ ...valid, degree: "", direction: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.degree).toBe("degree");
      expect(result.errors.direction).toBe("direction");
    }
  });
});
