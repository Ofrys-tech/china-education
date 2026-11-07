export const CONTACT_METHOD_VALUES = ["telegram", "whatsapp", "phone", "email"] as const;
export const DEGREE_VALUES = [
  "language",
  "bachelor",
  "master",
  "mba",
  "phd",
  "short",
  "undecided",
] as const;
export const DIRECTION_VALUES = [
  "business",
  "engineering",
  "it",
  "medicine",
  "humanities",
  "language",
  "other",
] as const;
export const INTAKE_VALUES = ["2027", "2028", "undecided"] as const;

export type ContactMethod = (typeof CONTACT_METHOD_VALUES)[number];
export type Degree = (typeof DEGREE_VALUES)[number];
export type Direction = (typeof DIRECTION_VALUES)[number];
export type Intake = (typeof INTAKE_VALUES)[number];
