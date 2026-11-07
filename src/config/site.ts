/**
 * Single source of truth for brand, navigation, contact details and intake.
 * Site copy is English; internal docs remain Russian for the team.
 */
export const siteConfig = {
  name: "ChinaPath",
  nameZh: "华路",
  tagline: "Study in China",
  description:
    "University and program matching for China, document preparation, scholarships and support through enrolment. One advisor at every step.",
  locale: "en_US",
  lang: "en",
  intake: "2027",
  yearFounded: 2026,
  nav: [
    { label: "Programs", href: "/programs/" },
    { label: "Universities", href: "/universities/" },
    { label: "How it works", href: "/process/" },
    { label: "About", href: "/about/" },
    { label: "FAQ", href: "/faq/" },
  ],
  contacts: {
    email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
    telegram: import.meta.env.PUBLIC_TELEGRAM_URL ?? "",
  },
  analytics: {
    src: import.meta.env.PUBLIC_ANALYTICS_SRC ?? "",
    domain: import.meta.env.PUBLIC_ANALYTICS_DOMAIN ?? "",
  },
} as const;
