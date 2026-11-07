import {
  CONTACT_METHOD_VALUES,
  type ContactMethod,
  DEGREE_VALUES,
  type Degree,
  DIRECTION_VALUES,
  type Direction,
  INTAKE_VALUES,
  type Intake,
} from "@/lib/leads/options";

export type LeadErrorCode =
  | "name_short"
  | "name_long"
  | "contact_method"
  | "contact_short"
  | "contact_long"
  | "contact_email"
  | "contact_phone"
  | "contact_telegram"
  | "degree"
  | "direction"
  | "intake"
  | "message_long"
  | "consent";

export interface LeadValues {
  name: string;
  contactMethod: ContactMethod;
  contact: string;
  degree: Degree;
  direction: Direction;
  intake: Intake;
  message: string;
  consent: boolean;
  website?: string;
}

export type LeadField = keyof LeadValues;
export type LeadErrors = Partial<Record<LeadField, LeadErrorCode>>;
export type LeadValidation =
  | { success: true; data: LeadValues }
  | { success: false; errors: LeadErrors };

const asText = (value: unknown): string => (typeof value === "string" ? value.trim() : "");
const oneOf = (values: readonly string[]) => (value: string) => values.includes(value);

/**
 * Validation returns stable error codes, not English strings. The UI maps them
 * through the i18n dictionary, so adding a language never touches validation.
 */
export function validateLead(raw: Record<string, unknown>): LeadValidation {
  const errors: LeadErrors = {};

  const name = asText(raw.name);
  if (name.length < 2) errors.name = "name_short";
  else if (name.length > 80) errors.name = "name_long";

  const contactMethod = asText(raw.contactMethod);
  if (!oneOf(CONTACT_METHOD_VALUES)(contactMethod)) errors.contactMethod = "contact_method";

  const contact = asText(raw.contact);
  if (contact.length < 3) errors.contact = "contact_short";
  else if (contact.length > 120) errors.contact = "contact_long";
  else if (contactMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact)) {
    errors.contact = "contact_email";
  } else if (
    (contactMethod === "phone" || contactMethod === "whatsapp") &&
    (contact.replace(/\D/g, "").length < 10 || contact.replace(/\D/g, "").length > 15)
  ) {
    errors.contact = "contact_phone";
  } else if (contactMethod === "telegram" && !/^@?[a-zA-Z0-9_]{4,64}$/.test(contact)) {
    errors.contact = "contact_telegram";
  }

  const degree = asText(raw.degree);
  if (!oneOf(DEGREE_VALUES)(degree)) errors.degree = "degree";

  const direction = asText(raw.direction);
  if (!oneOf(DIRECTION_VALUES)(direction)) errors.direction = "direction";

  const intake = asText(raw.intake);
  if (!oneOf(INTAKE_VALUES)(intake)) errors.intake = "intake";

  const message = asText(raw.message);
  if (message.length > 1000) errors.message = "message_long";

  if (raw.consent !== true && raw.consent !== "true") errors.consent = "consent";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      contactMethod: contactMethod as ContactMethod,
      contact,
      degree: degree as Degree,
      direction: direction as Direction,
      intake: intake as Intake,
      message,
      consent: true,
      website: asText(raw.website),
    },
  };
}
