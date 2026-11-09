export const CONTACT_METHOD_VALUES = ["whatsapp", "email", "phone", "instagram"] as const;
export const DEGREE_VALUES = [
  "language",
  "foundation",
  "bachelor",
  "master",
  "phd",
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
export const EDUCATION_VALUES = ["high_school", "bachelor", "master", "other"] as const;
export const DESTINATION_VALUES = ["china", "russia", "malaysia", "undecided"] as const;
export const BUDGET_VALUES = [
  "under_5000",
  "5000_10000",
  "10000_20000",
  "20000_plus",
  "undecided",
] as const;
export const SCHOLARSHIP_VALUES = ["required", "preferred", "not_needed", "undecided"] as const;
export const INTAKE_VALUES = ["2027", "2028", "undecided"] as const;

export type ContactMethod = (typeof CONTACT_METHOD_VALUES)[number];
export type Degree = (typeof DEGREE_VALUES)[number];
export type Direction = (typeof DIRECTION_VALUES)[number];
export type Education = (typeof EDUCATION_VALUES)[number];
export type Destination = (typeof DESTINATION_VALUES)[number];
export type Budget = (typeof BUDGET_VALUES)[number];
export type Scholarship = (typeof SCHOLARSHIP_VALUES)[number];
export type Intake = (typeof INTAKE_VALUES)[number];
