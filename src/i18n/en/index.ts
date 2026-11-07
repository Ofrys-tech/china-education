import { about } from "./about";
import { apply } from "./apply";
import { common } from "./common";
import { faq } from "./faq";
import { forms } from "./forms";
import { home } from "./home";
import { labels } from "./labels";
import { notFound, styleguide } from "./misc";
import { privacy } from "./privacy";
import { process } from "./process";
import { programs } from "./programs";
import { universities } from "./universities";

export const copy = {
  common,
  home,
  programs,
  universities,
  process,
  faq,
  apply,
  about,
  privacy,
  notFound,
  styleguide,
  labels,
  forms,
} as const;

export type Copy = typeof copy;
