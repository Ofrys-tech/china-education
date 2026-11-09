import type {
  Budget,
  ContactMethod,
  Degree,
  Destination,
  Direction,
  Education,
  Intake,
  Scholarship,
} from "@/lib/leads/options";

/** Small, client-safe label dictionary. No page copy, so the form stays lean. */
export const labels = {
  degrees: {
    language: "Chinese language year",
    foundation: "Foundation year",
    bachelor: "Bachelor's degree",
    master: "Master's degree",
    phd: "PhD / doctoral research",
    undecided: "Not sure yet",
  } satisfies Record<Degree, string>,
  languages: {
    zh: "Chinese",
    en: "English",
  } satisfies Record<"zh" | "en", string>,
  levels: {
    language: "Language year",
    foundation: "Foundation",
    bachelor: "Bachelor's",
    master: "Master's",
    phd: "PhD",
    vocational: "Vocational",
  },
  contactMethods: {
    whatsapp: { label: "WhatsApp", placeholder: "+212 600 000000", inputmode: "tel" },
    email: { label: "Email", placeholder: "you@example.com", inputmode: "email" },
    phone: { label: "Phone", placeholder: "+212 600 000000", inputmode: "tel" },
    instagram: { label: "Instagram", placeholder: "@yourusername", inputmode: "text" },
  } satisfies Record<ContactMethod, { label: string; placeholder: string; inputmode: string }>,
  directions: {
    business: "Business, economics, finance",
    engineering: "Engineering",
    it: "IT & data science",
    medicine: "Medicine & health",
    humanities: "Humanities & social sciences",
    language: "Chinese language",
    other: "Other / not sure",
  } satisfies Record<Direction, string>,
  education: {
    high_school: "High school",
    bachelor: "Bachelor's degree",
    master: "Master's degree",
    other: "Other qualification",
  } satisfies Record<Education, string>,
  destinations: {
    china: "China",
    russia: "Russia (upcoming)",
    malaysia: "Malaysia (upcoming)",
    undecided: "Still deciding",
  } satisfies Record<Destination, string>,
  budgets: {
    under_5000: "Under $5,000 / year",
    "5000_10000": "$5,000–10,000 / year",
    "10000_20000": "$10,000–20,000 / year",
    "20000_plus": "$20,000+ / year",
    undecided: "Not sure yet",
  } satisfies Record<Budget, string>,
  scholarships: {
    required: "I need a scholarship",
    preferred: "I would like one, but can study without it",
    not_needed: "I do not need a scholarship",
    undecided: "I want to understand my options",
  } satisfies Record<Scholarship, string>,
  intakes: {
    "2027": "September 2027",
    "2028": "September 2028",
    undecided: "Still deciding",
  } satisfies Record<Intake, string>,
  faqCategories: {
    admission: "Admissions",
    money: "Cost & scholarships",
    language: "Language",
    documents: "Documents & visa",
    life: "Life in China",
  },
} as const;

export type FaqCategory = keyof typeof labels.faqCategories;
