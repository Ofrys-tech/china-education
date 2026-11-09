import { about } from "./about";
import { accommodation } from "./accommodation";
import { apply } from "./apply";
import { common } from "./common";
import { contact } from "./contact";
import { destinations } from "./destinations";
import { experience } from "./experience";
import { faq } from "./faq";
import { forms } from "./forms";
import { home } from "./home";
import { labels } from "./labels";
import { notFound, styleguide } from "./misc";
import { privacy } from "./privacy";
import { process } from "./process";
import { programs } from "./programs";
import { scholarships } from "./scholarships";
import { universities } from "./universities";

export const copy = {
  common,
  home,
  destinations,
  programs,
  universities,
  scholarships,
  accommodation,
  experience,
  process,
  about,
  contact,
  faq,
  apply,
  privacy,
  notFound,
  styleguide,
  labels,
  forms,
} as const;

export type Copy = typeof copy;
