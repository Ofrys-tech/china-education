export const CONTACT_METHODS = [
  { value: "telegram", label: "Telegram", placeholder: "@username", inputmode: "text" },
  { value: "whatsapp", label: "WhatsApp", placeholder: "+7 999 000-00-00", inputmode: "tel" },
  { value: "phone", label: "Телефон", placeholder: "+7 999 000-00-00", inputmode: "tel" },
  { value: "email", label: "E-mail", placeholder: "you@example.com", inputmode: "email" },
] as const;

export const DEGREE_OPTIONS = [
  { value: "language", label: "Языковой год" },
  { value: "bachelor", label: "Бакалавриат" },
  { value: "master", label: "Магистратура" },
  { value: "mba", label: "MBA / бизнес-школа" },
  { value: "phd", label: "Аспирантура" },
  { value: "short", label: "Короткая программа / лето" },
  { value: "undecided", label: "Пока не определился(ась)" },
] as const;

export const DIRECTION_OPTIONS = [
  { value: "business", label: "Бизнес, экономика, финансы" },
  { value: "engineering", label: "Инженерия" },
  { value: "it", label: "IT и data science" },
  { value: "medicine", label: "Медицина" },
  { value: "humanities", label: "Гуманитарные науки" },
  { value: "language", label: "Китайский язык" },
  { value: "other", label: "Другое / не выбрано" },
] as const;

export const INTAKE_OPTIONS = [
  { value: "2027", label: "Сентябрь 2027" },
  { value: "2028", label: "Сентябрь 2028" },
  { value: "undecided", label: "Ещё выбираю" },
] as const;

export type ContactMethod = (typeof CONTACT_METHODS)[number]["value"];
export type Degree = (typeof DEGREE_OPTIONS)[number]["value"];
export type Direction = (typeof DIRECTION_OPTIONS)[number]["value"];
export type Intake = (typeof INTAKE_OPTIONS)[number]["value"];

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
export type LeadErrors = Partial<Record<LeadField, string>>;
export type LeadValidation =
  | { success: true; data: LeadValues }
  | { success: false; errors: LeadErrors };

const asText = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

/**
 * Single source of truth for form validation. No runtime schema library on the
 * client: this keeps the island at a few KB while the content build still uses
 * Astro's Zod for collections.
 */
export function validateLead(raw: Record<string, unknown>): LeadValidation {
  const errors: LeadErrors = {};

  const name = asText(raw.name);
  if (name.length < 2) errors.name = "Укажите имя (минимум 2 символа)";
  else if (name.length > 80) errors.name = "Слишком длинное имя";

  const contactMethod = asText(raw.contactMethod);
  if (!CONTACT_METHODS.some((option) => option.value === contactMethod)) {
    errors.contactMethod = "Выберите способ связи";
  }

  const contact = asText(raw.contact);
  if (contact.length < 3) {
    errors.contact = "Укажите контакт для связи";
  } else if (contact.length > 120) {
    errors.contact = "Слишком длинный контакт";
  } else if (contactMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact)) {
    errors.contact = "Проверьте адрес e-mail";
  } else if (contactMethod === "phone" || contactMethod === "whatsapp") {
    const digits = contact.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) errors.contact = "Проверьте номер телефона";
  } else if (contactMethod === "telegram" && !/^@?[a-zA-Z0-9_]{4,64}$/.test(contact)) {
    errors.contact = "Telegram-ник: от 4 символов, латиница, цифры и _";
  }

  const degree = asText(raw.degree);
  if (!DEGREE_OPTIONS.some((option) => option.value === degree)) {
    errors.degree = "Выберите программу";
  }

  const direction = asText(raw.direction);
  if (!DIRECTION_OPTIONS.some((option) => option.value === direction)) {
    errors.direction = "Выберите направление";
  }

  const intake = asText(raw.intake);
  if (!INTAKE_OPTIONS.some((option) => option.value === intake)) {
    errors.intake = "Выберите год старта";
  }

  const message = asText(raw.message);
  if (message.length > 1000) errors.message = "Сократите сообщение до 1000 символов";

  if (raw.consent !== true && raw.consent !== "true") {
    errors.consent = "Нужно согласие на обработку данных";
  }

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
