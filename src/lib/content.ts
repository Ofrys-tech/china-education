export const degreeLabels = {
  language: "Языковой год",
  bachelor: "Бакалавриат",
  master: "Магистратура",
  mba: "MBA / бизнес-школа",
  phd: "Аспирантура",
  short: "Короткая программа",
} as const;

export const languageLabels = {
  zh: "китайский",
  en: "английский",
} as const;

export const faqCategoryLabels = {
  admission: "Поступление",
  money: "Стоимость и стипендии",
  language: "Язык",
  life: "Жизнь в Китае",
  documents: "Документы и диплом",
} as const;

export const degreeOrder = [
  "bachelor",
  "language",
  "master",
  "mba",
  "medicine",
  "engineering",
] as const;
