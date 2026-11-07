import type { ContactMethod, Degree, Direction, Intake } from "@/lib/leads/options";

/** Small, client-safe label dictionary. No page copy, so the form island stays lean. */
export const labels = {
  degrees: {
    language: "Language year",
    bachelor: "Bachelor's",
    master: "Master's",
    mba: "MBA / business school",
    phd: "PhD",
    short: "Short course / summer",
    undecided: "Not sure yet",
  } satisfies Record<Degree, string>,
  languages: {
    zh: "Chinese",
    en: "English",
  } satisfies Record<"zh" | "en", string>,
  contactMethods: {
    telegram: { label: "Telegram", placeholder: "@username", inputmode: "text" },
    whatsapp: { label: "WhatsApp", placeholder: "+1 555 000 0000", inputmode: "tel" },
    phone: { label: "Phone", placeholder: "+1 555 000 0000", inputmode: "tel" },
    email: { label: "Email", placeholder: "you@example.com", inputmode: "email" },
  } satisfies Record<ContactMethod, { label: string; placeholder: string; inputmode: string }>,
  directions: {
    business: "Business, economics, finance",
    engineering: "Engineering",
    it: "IT & data science",
    medicine: "Medicine",
    humanities: "Humanities",
    language: "Chinese language",
    other: "Other / not sure",
  } satisfies Record<Direction, string>,
  intakes: {
    "2027": "September 2027",
    "2028": "September 2028",
    undecided: "Still deciding",
  } satisfies Record<Intake, string>,
  faqCategories: {
    admission: "Admissions",
    money: "Cost & scholarships",
    language: "Language",
    documents: "Documents & degree",
    life: "Life in China",
  },
} as const;

export type FaqCategory = keyof typeof labels.faqCategories;
