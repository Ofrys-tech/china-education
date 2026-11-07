import type { LeadValues } from "./schema";

export type LeadProvider = "formspree" | "webhook";

export type LeadMeta = {
  pageUrl?: string;
  referrer?: string;
  startedAt?: number;
  idempotencyKey?: string;
  submittedAt?: string;
  source?: string;
  utm?: Partial<Record<"source" | "medium" | "campaign" | "content" | "term", string>>;
};

export type LeadPayload = Record<string, string | boolean>;

const singleLine = (value: string) => value.replace(/\p{Cc}+/gu, " ").trim();

/** Strip control characters and newlines from fields that must stay single-line. */
export function sanitizeText(value: string, multiline = false): string {
  const normalized = value.replace(/\r\n?/g, "\n");
  return multiline
    ? normalized.replace(/\p{Cc}/gu, (char) => (char === "\n" ? "\n" : " ")).trim()
    : singleLine(normalized);
}

const summaryLabels = {
  language: "Языковой год",
  bachelor: "Бакалавриат",
  master: "Магистратура",
  mba: "MBA / бизнес-школа",
  phd: "Аспирантура",
  short: "Короткая программа / лето",
  undecided: "Пока не определился(ась)",
} as const;

export function buildLeadPayload(values: LeadValues, meta: LeadMeta = {}): LeadPayload {
  const url = meta.pageUrl ?? "";
  const utm = meta.utm ?? {};
  const methodLabel =
    values.contactMethod === "telegram"
      ? "Telegram"
      : values.contactMethod === "whatsapp"
        ? "WhatsApp"
        : values.contactMethod === "phone"
          ? "Телефон"
          : "E-mail";

  const summary = [
    `${sanitizeText(values.name)} — ${methodLabel}: ${sanitizeText(values.contact)}`,
    `Программа: ${summaryLabels[values.degree]}`,
    `Направление: ${values.direction}`,
    `Старт: ${values.intake}`,
    values.message ? `О себе: ${sanitizeText(values.message, true)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const payload: LeadPayload = {
    _type: "chinapath_lead",
    name: sanitizeText(values.name),
    contactMethod: values.contactMethod,
    contact: sanitizeText(values.contact),
    degree: values.degree,
    direction: values.direction,
    intake: values.intake,
    message: sanitizeText(values.message, true),
    consent: values.consent === true,
    summary,
    _subject: `Заявка ChinaPath · ${sanitizeText(values.name)} · ${summaryLabels[values.degree]}`,
    page: url,
    source: sanitizeText(meta.source ?? ""),
    referrer: sanitizeText(meta.referrer ?? ""),
    submittedAt: meta.submittedAt ?? new Date().toISOString(),
    idempotencyKey: meta.idempotencyKey ?? "",
    startedAt: String(meta.startedAt ?? ""),
  };

  for (const key of ["source", "medium", "campaign", "content", "term"] as const) {
    payload[`utm_${key}`] = sanitizeText(utm[key] ?? "");
  }

  return payload;
}

export function endpointFor(provider: LeadProvider, configuredEndpoint: string): string {
  if (!configuredEndpoint) return "";
  if (provider === "formspree") {
    return configuredEndpoint.startsWith("http")
      ? configuredEndpoint
      : `https://formspree.io/f/${configuredEndpoint.replace(/^\/+/, "")}`;
  }
  return configuredEndpoint;
}
