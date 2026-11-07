import { describe, expect, it } from "vitest";
import { buildLeadPayload, endpointFor, sanitizeText } from "@/lib/leads/payload";
import type { LeadValues } from "@/lib/leads/schema";

const values: LeadValues = {
  name: "Anna Lee",
  contactMethod: "telegram",
  contact: "@anna_lee",
  degree: "master",
  direction: "business",
  intake: "2027",
  message: "Finance, IELTS 7.0",
  consent: true,
  website: "",
};

describe("sanitizeText", () => {
  it("collapses newlines in single-line fields", () => {
    expect(sanitizeText("Anna\r\nLee")).toBe("Anna Lee");
  });

  it("keeps newlines but strips control characters in messages", () => {
    expect(sanitizeText("Line 1\r\nLine 2\t!", true)).toBe("Line 1\nLine 2 !");
  });
});

describe("buildLeadPayload", () => {
  it("produces flat readable fields and UTM values", () => {
    const payload = buildLeadPayload(values, {
      pageUrl: "https://example.com/apply/",
      referrer: "https://t.me/channel",
      source: "apply",
      idempotencyKey: "abc-123",
      submittedAt: "2026-11-07T12:00:00.000Z",
      utm: { source: "telegram", campaign: "autumn" },
    });

    expect(payload.name).toBe("Anna Lee");
    expect(payload.consent).toBe(true);
    expect(payload.source).toBe("apply");
    expect(payload.utm_source).toBe("telegram");
    expect(payload.utm_campaign).toBe("autumn");
    expect(payload.utm_medium).toBe("");
    expect(String(payload.summary)).toContain("Anna Lee");
    expect(String(payload.summary)).toContain("Master's");
    expect(String(payload._subject)).toContain("ChinaPath application");
  });

  it("does not let header-breaking characters through the subject", () => {
    const payload = buildLeadPayload({ ...values, name: "Anna\r\nBcc: evil@example.com" });
    expect(String(payload._subject)).not.toMatch(/[\r\n]/);
  });
});

describe("endpointFor", () => {
  it("expands a Formspree short code", () => {
    expect(endpointFor("formspree", "mqkr1234")).toBe("https://formspree.io/f/mqkr1234");
  });

  it("keeps a full endpoint URL", () => {
    expect(endpointFor("formspree", "https://formspree.io/f/mqkr1234")).toBe(
      "https://formspree.io/f/mqkr1234",
    );
  });

  it("leaves webhook URLs untouched and returns empty when unconfigured", () => {
    expect(endpointFor("webhook", "https://hooks.example.com/lead")).toBe(
      "https://hooks.example.com/lead",
    );
    expect(endpointFor("webhook", "")).toBe("");
  });
});
