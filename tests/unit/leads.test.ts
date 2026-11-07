import { describe, expect, it } from "vitest";
import { validateLead } from "@/lib/leads/schema";

const valid = {
  name: "Анна Ли",
  contactMethod: "telegram",
  contact: "@anna_li",
  degree: "master",
  direction: "business",
  intake: "2027",
  message: "Хочу магистратуру по финансам, есть IELTS 7.0.",
  consent: true,
  website: "",
};

describe("validateLead", () => {
  it("accepts a complete lead and trims the name", () => {
    const result = validateLead({ ...valid, name: "  Анна Ли  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Анна Ли");
  });

  it("rejects a short name", () => {
    const result = validateLead({ ...valid, name: "А" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.name).toBeTruthy();
  });

  it("rejects a malformed e-mail", () => {
    const result = validateLead({ ...valid, contactMethod: "email", contact: "anna@" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.contact).toMatch(/e-mail/i);
  });

  it("rejects a phone with too few digits", () => {
    const result = validateLead({ ...valid, contactMethod: "phone", contact: "+7 999" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.contact).toMatch(/телефон/i);
  });

  it("rejects an invalid Telegram handle", () => {
    const result = validateLead({ ...valid, contact: "@a!" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.contact).toMatch(/Telegram/i);
  });

  it("requires consent", () => {
    const result = validateLead({ ...valid, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.consent).toMatch(/согласие/i);
  });

  it("caps the message at 1000 characters", () => {
    const result = validateLead({ ...valid, message: "x".repeat(1001) });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.message).toMatch(/1000/);
  });

  it("requires a selected degree and direction", () => {
    const result = validateLead({ ...valid, degree: "", direction: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.degree).toBeTruthy();
      expect(result.errors.direction).toBeTruthy();
    }
  });
});
