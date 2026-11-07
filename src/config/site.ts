/**
 * Single source of truth for brand, navigation, contact details and intake.
 * Everything user-visible that repeats across pages belongs here, not in templates.
 */
export const siteConfig = {
  name: "ChinaPath",
  nameZh: "华路",
  tagline: "Поступление в Китай",
  description:
    "Подбор вузов и программ в Китае, подготовка документов, стипендии и сопровождение до зачисления. Один куратор на всех этапах.",
  locale: "ru_RU",
  lang: "ru",
  intake: "2027",
  yearFounded: 2026,
  nav: [
    { label: "Направления", href: "/programs/" },
    { label: "Вузы", href: "/universities/" },
    { label: "Как поступить", href: "/process/" },
    { label: "О нас", href: "/about/" },
    { label: "FAQ", href: "/faq/" },
  ],
  contacts: {
    email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
    telegram: import.meta.env.PUBLIC_TELEGRAM_URL ?? "",
  },
  legal: {
    disclaimer:
      "ChinaPath — независимая консультационная практика. Мы не являемся университетом и не гарантируем зачисление или стипендию: решение принимает вуз.",
  },
  analytics: {
    src: import.meta.env.PUBLIC_ANALYTICS_SRC ?? "",
    domain: import.meta.env.PUBLIC_ANALYTICS_DOMAIN ?? "",
  },
} as const;
